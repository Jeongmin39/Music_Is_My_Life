import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { HiPlus, HiMusicNote } from "react-icons/hi";
import {MdKeyboardArrowLeft, MdKeyboardArrowRight} from "react-icons/md";
import {BsExclamationLg } from "react-icons/bs";
import {SiSpotify} from "react-icons/si";
import Loading from '../../img/loading.gif';
import { Card, Modal } from 'antd';
import { useNavigate } from "react-router";
import moment from "moment";
import 'moment/locale/ko';
import axios from "axios";
import RecommendSong from "./RecommendSong";
import AlertModal from "../modal/AlertModal";

const { Meta } = Card;

const TextWrap = styled.div`
    width: 100%;
    padding: 3%;
    display: inline-block;
`

const ContentWrap = styled.div`
    padding: 2%;
    min-height: 300px;
    margin-top: 3%;
    margin-bottom: 6%;
    border: 1px solid #dee2e6;
    border-radius: 5px;
`

const ButtonWrap = styled.div`
    width: 100%;
    margin: 0% 1%;
    display: inline-block;
`
const TimeWrap = styled.div`
    display: flex;
    justify-content: center;
    align-content: center;
    margin-top: 10px;
    font-weight: 1000;
`

const SongWrap = styled.div`
    display: flex;
    flex-direction: column;
`

const ImgWrap = styled.img`
    width: 85%;
    height: 300px;
    object-fit: cover;
    overflow: hidden;
`

const CntWrap = styled.div`
    display: flex;
    width: 100%;
    margin: 0% 1%;
    flex-direction: row;
    justify-content: space-between
`

const EmojiWrap = styled.button`
    font-family: Cafe24Supermagic-Bold;
    background-color: #E6E6E6;
    border-radius: 15px;
    color: black;
    font-size: 15px;
    width: 80px;
    height: 35px;
    padding: 0%;

    &:hover {
        border: 2px solid #609440;
    }

    &:active {
        border: 2px solid #609440;
    }
`

const SelectWrap = styled.div`
    display: flex;
    width: 100%;
    margin-top: 5%;
    padding-left: 11%;
    padding-right: 11%;
    flex-direction: row;
    justify-content: space-between

`

const WriteDiaryEditor = ({dateInfo, title="", content="", imageUrl="", imageObject="", isUpdate=false}) => {
    moment.locale('ko', {
        weekdays : '일요일_월요일_화요일_수요일_목요일_금요일_토요일'.split('_'),
        weekdaysShort : '일_월_화_수_목_금_토'.split('_'),
    });

    const navigate = useNavigate();
    const [isBackBtn, setIsBackBtn] = useState(false);
    const [isAlertModal, setIsAlertModal] = useState(false);
    const [alertMsg, setAlertMsg] = useState("");

    //일기 관련 변수
    let formData = new FormData();
    const [contentCnt, setContentCnt] = useState(0);
    const [myEmoji, setMyEmoji] = useState("");
    const [state, setState] = useState({
        dateInfo: dateInfo,
        title: title,
        content: content,
    });
    const date = new Date(state.dateInfo);
    const [image, setImage] = useState({
        image: imageObject
    });
    const [placeholder, setPlaceholder] = imageObject === "" ? useState("이미지 추가하기") : useState("이미지 재업로드하기");
    const [imageBadge, setImageBadge] = useState(imageUrl);

    //노래 관련 변수
    let songList = [];
    const [finalSongs, setFinalSongs] = useState(["", "", "", "", ""])
    const [finalArtists, setFinalArtists] = useState(["", "", "", "", ""])
    const [finalUris, setFinalUris] = useState(["", "", "", "", ""])
    const [songImages, setSongImages] = useState(["", "", "", "", ""])

    const [resultSongInfo, setResultSongInfo] = useState(["", ""])
    const [spinning, setSpinning] = useState(false);
    const [showRecommends, setShowRecommends] = useState(false);
    const [showResultSong, setShowResultSong] = useState(false);
    const [open, setOpen] = useState(false);
    
    const handleChangeState = (e) => {
        const { value, name } = e.target;
        if (e.target.name == "content") {
            setContentCnt(e.target.value.length);
        }
        setState({
            ...state,
            [name] : value,
        });
    };

    const changeURL = (event) => {
        setImage({...image, image: event.target.files[0]});
        const reader = new FileReader();
        reader.readAsDataURL(event.target.files[0]);
        reader.onloadend = () => {
            setImageBadge(reader.result);
        };
    };

    useEffect(() => {
        if (image.image != "") {
            setPlaceholder("이미지 재업로드하기");
        }
    }, [image])

    const goCalendar = () => {
        navigate("/calendar");
    };

    const toNext = async(e) => {
        e.preventDefault();

        if (state.title == '' ) {
            setAlertMsg("제목을 넣어주세요")
            setIsAlertModal(true)
        } else if (state.content == '') {
            setAlertMsg("내용을 넣어주세요")
            setIsAlertModal(true)
        } else if (image.image == '') {
            setAlertMsg("이미지를 넣어주세요")
            setIsAlertModal(true)
        } else if (myEmoji == "") {
            setAlertMsg("감정을 선택해주세요")
            setIsAlertModal(true)
        }else {
            formData = {
                date: moment(date).format("YYYY-MM-DD"),
                title: state.title,
                content: state.content.replace('\n', '\\n'),
                image: image.image,
                emotion: myEmoji
            }

            let url = "api/diaries/save";

            if(isUpdate == true) {
                url = "api/diaries/update"
            } 

            setIsBackBtn(true);
            setShowRecommends(true);
            setSpinning(true);
            await axios({
                method: "POST",
                url: url,
                headers: {
                    "Content-Type": "multipart/form-data; boundary=<calculated when request is sent>",
                    "Authorization": localStorage.getItem("accessToken"), 
                },
                data: formData,
            })
            .then((response) => {
                console.log("일기 저장 성공")
                console.log("추천 내용:", response.data)
                songList = response.data.split("\n");
                searchSongs()
            })
            .catch((error) => {
                alert("일기 작성 오류");
                console.log(error)
                setSpinning(false);
            })   
        }
    };

    const searchSongs = async() => {

        let data = {
            grant_type: "client_credentials",
            client_id: "client_id",
            client_secret: "clien_secret",
        }

        const token = await axios({
            method: "POST",
            url: "https://accounts.spotify.com/api/token",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            data: data
        })

        console.log("spotify 로그인 토큰: ", token.data.access_token)
        let tmpSongs = []
        let tmpImages = []
        let tmpUris = []
        let tmpArtists = []
        for(let i=0; i<5; i++) {
            // songList 형식 -- 번호. 가수명-제목
            console.log("노래: ", songList[i])
            let track = songList[i].split(".")
            let songAndArtist = track[1]
            let songArtist = songAndArtist.split("-")
            const artist = songArtist[0]
            const song = songArtist[1]
            let searchSong = artist + " " + song
            await axios({
                method: "GET",
                url: "https://api.spotify.com/v1/search?query="+ searchSong +"&type=track&locale=ko-KR%2Cko%3Bq%3D0.9%2Cen-US%3Bq%3D0.8%2Cen%3Bq%3D0.7&offset=0&limit=3",
                headers: {
                    "Authorization": "Bearer " + token.data.access_token,
                },
            })
            .then((response) => {
                let finalSong = response.data.tracks.items[0].name
                let finalImage = response.data.tracks.items[0].album.images[0].url
                let finalArtist = response.data.tracks.items[0].artists[0].name
                let finalUri = response.data.tracks.items[0].preview_url
                tmpSongs[i] = finalSong
                tmpImages[i] = finalImage
                tmpArtists[i] = finalArtist
                tmpUris[i] = finalUri
            })
            .catch((error) => {
                alert("노래 검색 오류");
                console.log(error)
                setSpinning(false);
                setOpen(false);
            })   
        }
        setFinalSongs(tmpSongs);
        setSongImages(tmpImages);
        setFinalArtists(tmpArtists);
        setFinalUris(tmpUris)
        setSpinning(false);
        setOpen(true);
    }

    const saveEmoji = (emoji, e) => {
        console.log(emoji)
        setMyEmoji(emoji)
    }

    const saveSong = async(index, e) => {
        setOpen(false)
        let body = {
            date: moment(date).format("YYYY-MM-DD"),
            selectedArtistName: finalArtists[index],
            selectedSongName: finalSongs[index],
            albumImageUrl: songImages[index],
            songUri: finalUris[index],
        }

        console.log(body)

        await axios({
            method: "POST",
            url: "api/diaries/recommend",
            headers: {
                "Content-Type": "application/json",
                "Authorization": localStorage.getItem("accessToken"), 
            },
            data: body,
        })
        .then((response) => {
            let song = finalSongs[index]
            let artist = finalArtists[index]
            let result = []
            result[0] = artist
            result[1] = song
            console.log("추천 노래 저장 성공")
            console.log("결과: ", response.data)
            setResultSongInfo(result)
            setShowResultSong(true)
        })
        .catch((error) => {
            alert("추천 노래 저장 오류");
            console.log(error)
        })   
    }

    return(
        <>
        {showResultSong === false ? (
            <>
            <AlertModal title={alertMsg} isAlertModal={isAlertModal} setAlert={setIsAlertModal} />
            <ButtonWrap>
            <button disabled={isBackBtn} style={{'font-family': 'Cafe24Supermagic-Bold','padding-bottom':'0px','float':'left','color':'black','border':'none','background-color':'transparent', 'font-weight': '1000'}} onClick={goCalendar}>
                <MdKeyboardArrowLeft/> BACK
            </button>
            <button disabled={isBackBtn} style={{'font-family': 'Cafe24Supermagic-Bold','padding-bottom':'0px','float':'right','color':'black','border':'none','background-color':'transparent', 'font-weight': '1000'}} onClick={toNext}>
                NEXT <MdKeyboardArrowRight/>
            </button>
            </ButtonWrap>
            </>
        ) : (
            <>
            <ButtonWrap>
            <button disabled={true} style={{'font-family': 'Cafe24Supermagic-Bold','padding-bottom':'0px','float':'left','color':'black','border':'none','background-color':'transparent', 'font-weight': '1000', 'display':'none'}}>
            <MdKeyboardArrowLeft/> BACK
            </button>
            <button style={{'font-family': 'Cafe24Supermagic-Bold','padding-bottom':'0px','float':'right','color':'black','border':'none','background-color':'transparent', 'font-weight': '1000'}} onClick={goCalendar}>
                DONE <BsExclamationLg />
            </button>
            </ButtonWrap>
            </>
        )}
        <TimeWrap style={{'font-family': 'Cafe24Supermagic-Bold'}}>
            {moment(date).format("YYYY년")}&nbsp;&nbsp;{moment(date).format("MM월")}&nbsp;&nbsp;{moment(date).format("DD일")}&nbsp;&nbsp;{moment(date).format("dddd")}
        </TimeWrap>
        
        <Modal style={{'textAlign': 'center'}}
            open={spinning}
            title={<><h2 style={{'font-family': 'Cafe24Supermagic-Bold', 'textAlign':'center'}}>일기 분석 중...</h2></>}
            centered
            closable={false}
            maskClosable={false}
            footer={null}>
            <img src={Loading} style={{'width':'150px', 'height':'150px', 'paddingRight':'18px'}}/>
        </Modal>   
        {showRecommends === false ? (
            <TextWrap>
            <span><strong style={{'font-family': 'Cafe24Supermagic-Bold',}}>제목: </strong></span>
            <input 
                type="text" 
                placeholder="제목 작성하기"
                name="title" 
                value={state.title} 
                onChange={handleChangeState}
                style={{'font-family': 'Cafe24Supermagic-Bold','border':'0'}}
            />
            <ContentWrap>
            <textarea
                placeholder="일기를 작성해주세요"
                name="content"
                maxLength={249}
                value={state.content}
                onChange={handleChangeState}
                style={{'font-family': 'Cafe24Supermagic-Bold','width':'100%', 'border':'0', 'minHeight': '280px'}}
            ></textarea>
            <CntWrap>
            <label htmlFor="imageUpload" style={{'font-family': 'Cafe24Supermagic-Bold','wordBreak':'break-all', 'font-weight': '1000'}}>
                <HiPlus style={{'marginBottom':'3px'}}/>&nbsp;{placeholder}
                <input type="file" style={{display: "none"}} id="imageUpload" onChange={changeURL}/>
            </label>
            <p style={{'color':'#BDBDBD', 'fontWeight':'1000', 'font-family': 'Cafe24Supermagic-Bold', 'marginRight':'15px'}}>
                <span>{contentCnt}/250 자</span>
            </p>
            </CntWrap>
            </ContentWrap>
        
            <p style={{'color':'#BDBDBD', 'fontWeight':'1000', 'font-family': 'Cafe24Supermagic-Bold', 'marginRight':'15px','textAlign':'center'}}>오늘의 감정을 선택해 보세요!</p>

            <SelectWrap>
            <EmojiWrap onClick={(e) => {saveEmoji("기쁨", e)}}>😀 기쁨</EmojiWrap>
            <EmojiWrap onClick={(e) => {saveEmoji("기대", e)}}>😏 기대</EmojiWrap>
            <EmojiWrap onClick={(e) => {saveEmoji("설렘", e)}}>🥰 설렘</EmojiWrap>
            </SelectWrap>

            <SelectWrap>
            <EmojiWrap onClick={(e) => {saveEmoji("화남", e)}}>😡 화남</EmojiWrap>
            <EmojiWrap onClick={(e) => {saveEmoji("슬픔", e)}}>😢 슬픔</EmojiWrap>
            <EmojiWrap onClick={(e) => {saveEmoji("불안", e)}}>😨 불안</EmojiWrap>
            </SelectWrap>

            </TextWrap>
        ) : (
            <>
            <TextWrap style={{'textAlign':'center'}}>
            <span ><strong style={{'font-family': 'Cafe24Supermagic-Bold'}}>제목: {state.title}</strong></span>
                <Card
                    hoverable
                    style={{ 'width': '100%'}}
                    cover={<ImgWrap alt="example" src={imageBadge} style={{'borderBlockColor': 'black'}} />}>
                <Meta style={{'font-family': 'Cafe24Supermagic-Bold'}} description={state.content} />
                </Card>
            </TextWrap>
            {showResultSong === true ? <p style={{'font-family': 'Cafe24Supermagic-Bold', 'color':'grey','whiteSpace':'nowrap','overflow':'hidden', 'textOverflow':'ellipsis'}}>&nbsp;&nbsp;&nbsp;&nbsp;<SiSpotify style={{'color':'#18d660', 'marginBottom':'4px'}}/>&nbsp;[추천 노래]&nbsp;{resultSongInfo[0]} - {resultSongInfo[1]}</p> : <></>}
            <Modal
            open={open}
            title={<><h2 style={{'font-family': 'Cafe24Supermagic-Bold', 'textAlign':'center'}}><HiMusicNote style={{'marginBottom':'4px', 'color':'#18d660'}}/>&nbsp; 노래 추천 목록&nbsp;<HiMusicNote style={{'marginBottom':'4px', 'color':'#18d660'}}/></h2></>}
            centered
            closable={false}
            maskClosable={false}
            footer={null}>
            <p style={{'font-family': 'Cafe24Supermagic-Bold', 'textAlign':'center'}}>노래를 선택해 주세요.</p>
            <SongWrap>
                <RecommendSong onClick={(e)=>{saveSong(0, e)}} title={finalSongs[0]} Artist={finalArtists[0]} imgSrc={songImages[0]}></RecommendSong>
                <RecommendSong onClick={(e)=>{saveSong(1, e)}} title={finalSongs[1]} Artist={finalArtists[1]} imgSrc={songImages[1]}></RecommendSong>
                <RecommendSong onClick={(e)=>{saveSong(2, e)}} title={finalSongs[2]} Artist={finalArtists[2]} imgSrc={songImages[2]}></RecommendSong>
                <RecommendSong onClick={(e)=>{saveSong(3, e)}} title={finalSongs[3]} Artist={finalArtists[3]} imgSrc={songImages[3]}></RecommendSong>
                <RecommendSong border={true} onClick={(e)=>{saveSong(4, e)}} title={finalSongs[4]} Artist={finalArtists[4]} imgSrc={songImages[4]}></RecommendSong>
            </SongWrap>
          </Modal>
            </>
        )}
        </>
    )
}
export default WriteDiaryEditor;