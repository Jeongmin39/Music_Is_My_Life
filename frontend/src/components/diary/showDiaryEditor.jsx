import React, { useEffect, useState } from "react";
import styled from "styled-components";
import {MdKeyboardArrowLeft} from "react-icons/md";
import { FiEdit, FiTrash } from "react-icons/fi";
import { BsThreeDots } from "react-icons/bs";
import { Card, Dropdown } from 'antd';
import moment from "moment";
import 'moment/locale/ko';
import { useNavigate } from "react-router-dom";
import { SiSpotify } from "react-icons/si";
import axios from "axios";

const { Meta } = Card;

const TextWrap = styled.div`
    width: 100%;
    padding: 3%;
    display: inline-block;
`
const TitleWrap = styled.div`
    width: 100%;
    display: inline-block;
`

const ButtonWrap = styled.div`
    width: 100%;
    margin: 0% 1%;
    display: inline-block;
`
const TimeWrap = styled.div`
    display: inline-block;
    justify-content: center;
    align-content: center;
    margin-left: 28%;
    margin-top: 10px;
    font-weight: 1000;
`

const ImgWrap = styled.img`
    width: 85%;
    height: 300px;
    object-fit: cover;
    overflow: hidden;
`

const SongWrap = styled.div`
    padding: 5px;
    color: grey;
    font-family: Cafe24Supermagic-Bold;
`

const ShowDiaryEditor = ({dateInfo, title, content, image, songName, songArtist}) => {
    moment.locale('ko', {
        weekdays : '일요일_월요일_화요일_수요일_목요일_금요일_토요일'.split('_'),
        weekdaysShort : '일_월_화_수_목_금_토'.split('_'),
    });

    const navigate = useNavigate();
    const [imageFinal, setImageFinal] = useState("");
    const date = new Date(dateInfo);
    const items = [
        {
          label: '수정하기',
          key: '1',
          icon: <FiEdit />,
        },
        {
          label: '삭제하기',
          key: '2',
          icon: <FiTrash />,
        },
    ];

    const convertURLtoFile = async(url) => {
        const response = await fetch('/imageTest'+url);
        const data = await response.blob();
        const ext = url.split(".").pop();
        const filename = url.split("/").pop();
        const metadata = {type:`image/${ext}`};
        return new File([data], filename, metadata);
    }

    const handleMenuClick = (e) => {
        console.log('click', e);

        if (e.key == 1) { // 수정하기
            navigate("/writeDiary", {
                state: {
                    dateInfo : `${date}`,
                    title : title,
                    content : content,
                    imageUrl : "",
                    imageObject : "",
                    isUpdate : true,
                }
                }) 
        } else if ( e.key == 2) { // 삭제하기
            deleteDiary();
        }
    };

    /*useEffect(() => {
        if (imageFinal != "") {
            navigate("/writeDiary", {
                state: {
                    dateInfo : `${date}`,
                    title : title,
                    content : content,
                    imageUrl : image,
                    imageObject : imageFinal,
                    isUpdate : true,
                }
                }) 
        }
    }, [imageFinal])*/

    const deleteDiary = () => {
        axios({
            method: "POST",
            url: 'api/diaries/' + moment(date).format("YYYY-MM-DD") + '/delete',
            headers: {
                "Content-Type": "application/json",
                "Authorization": localStorage.getItem("accessToken"), 
            },
        })
        .then((response) => {
            console.log(response.data)
            navigate('/calendar')

        })
        .catch((error) => {
            console.log("일기 삭제 오류: ", error)
        })   
    }

    const menuProps = {
        items,
        onClick: handleMenuClick,
    };

    const goCalendar = () => {
        navigate("/calendar");
    };

    return(
    <>
        <ButtonWrap>
            <button style={{'font-family': 'Cafe24Supermagic-Bold','padding-bottom':'0px','float':'left','color':'black','border':'none','background-color':'transparent', 'font-weight': '1000'}} onClick={goCalendar}>
                <MdKeyboardArrowLeft/> BACK
            </button>
        </ButtonWrap>
        <TimeWrap style={{'font-family': 'Cafe24Supermagic-Bold'}}>
            {moment(date).format("YYYY년 MM월 DD일 dddd")}
            <Dropdown menu={menuProps} > 
                <button style={{'color':'black','border':'none','background-color':'transparent', 'font-weight': '1000'}} >
                    <BsThreeDots/>
                </button>
            </Dropdown>
        </TimeWrap>
        <TitleWrap style={{'textAlign':'center'}}>
        <span ><strong style={{'font-family': 'Cafe24Supermagic-Bold'}}>제목: {title}</strong></span>
        </TitleWrap>
        <TextWrap>
            <Card
            hoverable
            style={{ 'width': '100%'}}
            cover={<ImgWrap alt="example" src={image} style={{'borderBlockColor': 'black'}} />}>
        <Meta style={{'font-family': 'Cafe24Supermagic-Bold'}} description={content} />
        </Card>
        <SongWrap style={{'color':'grey','whiteSpace':'nowrap','overflow':'hidden', 'textOverflow':'ellipsis'}}><SiSpotify style={{'color':'#18d660', 'marginBottom':'4px'}}/>&nbsp;&nbsp;{songArtist} - {songName}</SongWrap>
        </TextWrap>
    </>
    )
}

export default ShowDiaryEditor;