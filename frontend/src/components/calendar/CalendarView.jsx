import React, {useEffect, useState} from 'react';
import Calendar from 'react-calendar';
import './CalendarStyle.css';
import moment from 'moment';
import 'moment/locale/ko';
import styled from "styled-components";
import WriteDiaryButton from '../diary/WriteDiaryButton';
import {Link, useNavigate} from 'react-router-dom';
import axios from "axios";
import {PiPlaylistBold} from "react-icons/pi";
import {atom, useRecoilState} from "recoil";
import {monthNow, yearNow} from "../../mainPage/CalendarPage.jsx";


const Wrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-top: 3%;
`
const ButtonWrap = styled.div`
  margin-top: 5%;
  margin-left: 5%;
`
const MusicList = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 5%;

`
const PlayListTittle = styled.div`
  display: flex;
  align-items: center;
  margin-left: 5%;
  margin-top: 10%;
  color: #609440;
  font-family: Cafe24Supermagic-Bold
`

const CalendarView = () => {
    const [_yearNow, setYearNow] = useRecoilState(yearNow);
    const [_monthNow, setMonthNow] = useRecoilState(monthNow);
    const [day, setDay] = useState(new Date()); //초기화 값은 현재 날짜
    const navigate = useNavigate();
    const [mark, setMark] = useState([]);// 달력 특정 날짜에 사진 추가 기능 테스트 데이터

    const onClickDayEvent = async (e) => {
        await axios({
            method: "GET",
            url: "api/diaries/" + moment(e).format("YYYY-MM-DD"),
            headers: {
                "Content-Type": "application/json",
                "Authorization": localStorage.getItem("accessToken"),
            },
        })
            .then((response) => {
                console.log(response.data)
                if (response.data == "작성된 일기가 없음") {
                    navigate("/writeDiary", {
                        state: {
                            dateInfo: `${e}`,
                            title: "",
                            content: "",
                            imageUrl: "",
                            imageObject: "",
                            isUpdate: false,
                        }
                    })
                } else {
                    navigate("/showDiary", {
                        state: {
                            dateInfo: `${e}`,
                            title: response.data.title,
                            image: response.data.image,
                            content: response.data.content,
                            songName: response.data.recommendation.selectedSongName,
                            songArtist: response.data.recommendation.selectedArtistName,
                        }
                    })
                }
            })
            .catch((error) => {
                console.log(error)
            })
    };

    useEffect(() => {
        axios({
            method: "GET",
            url: "api/calendar",
            headers: {
                "Content-Type": "application/json",
                "Authorization": localStorage.getItem("accessToken"),
            },
        })
            .then((response) => {
                let dates = [];
                for (let i = 0; i < response.data.length; i++) {
                    dates[i] = response.data[i];
                }
                setMark(dates);
            })
            .catch((error) => {
                console.log(error)
            })


    }, [])



    return (
        <Wrapper>
            <Calendar
                onClickDay={onClickDayEvent}
                onChange={setDay}
                onActiveStartDateChange={({activeStartDate}) => {
                    setYearNow(moment(activeStartDate).format('yyyy'))
                    setMonthNow(moment(activeStartDate).format('MM'))
                    console.log("달 바뀜: ", moment(activeStartDate).format('MM'))
                    console.log("년도 바뀜: ", moment(activeStartDate).format('yyyy'))
                }}
                calendarType={"US"}
                locale="en-EN"
                value={day}
                formatDay={(locale, date) => moment(date).format('DD')}
                next2Label={null}
                prev2Label={null}
                minDetail='month' // 상단 네비게이션에서 '월'단위만 보이게 설정
                maxDetail='month' // 상단 네비게이션에서 '월'단위만 보이게 설정
                navigationLabel={null}
                showNeighboringMonth={false}
                tileClassName={({date, view}) => {
                    if (mark.find((x) => x === moment(date).format("YYYY-MM-DD"))) {
                        return "highlight";
                    }
                }} // 날짜 칸에 보여질 콘텐츠
            />
            <ButtonWrap>
                <WriteDiaryButton value={day}/>
            </ButtonWrap>
            <Link to='/playlist'>
                <PlayListTittle>
                    <PiPlaylistBold size={20} style={{"margin-right": "10px", 'color': '#609440'}}/>
                    이달의 플레이리스트
                </PlayListTittle>
            </Link>
        </Wrapper>


    )
}

export default CalendarView;