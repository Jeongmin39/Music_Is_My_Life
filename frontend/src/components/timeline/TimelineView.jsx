import React, { useEffect, useState } from 'react';
import {Timeline} from 'antd';
import {SiSpotify} from "react-icons/si";
import {FaRegCircleCheck } from 'react-icons/fa6';
import * as S from './styledComponent';
import axios from "axios";
import moment from 'moment';
import 'moment/locale/ko';
import sampleImg from '../../img/cute.jpg'

const TimelineView = () => {
    moment.locale('ko', {
        weekdays : '일요일_월요일_화요일_수요일_목요일_금요일_토요일'.split('_'),
        weekdaysShort : '일_월_화_수_목_금_토'.split('_'),
    });

    const today = new Date();
    const [diaryData, setDiaryData] = useState([])
    const [hasNext, setHasNext] = useState(false);
    const [lastSize, setLastSize] = useState(0);
    const [lastDate, setLastDate] = useState("");

    useEffect(() => {
        axios({
            method: "GET",
            url: "api/timeline",
            headers: {
                "Content-Type": "application/json",
                "Authorization": localStorage.getItem("accessToken"), 
            },
        })
        .then((response) => {
            let tmpDiary = [];
            for (var i=0; i < response.data.values.length; i++) {
                tmpDiary[i] = {
                    dot: <FaRegCircleCheck />,
                    color: '#1DB954', //하늘색: ade9f7
                    children: (
                    <>
                        <S.DateDiv>{moment(response.data.values[i].date).format("YYYY년 MM월 DD일 dddd")}</S.DateDiv>
                        <S.Title>제목 : {response.data.values[i].title}</S.Title>
                        <S.Picture src={response.data.values[i].image} />
                        <S.Music><SiSpotify style={{'color':'#1DB954', 'marginBottom':'4px'}}/>&nbsp;{response.data.values[i].recommendation.selectedArtistName} - {response.data.values[i].recommendation.selectedSongName}</S.Music>
                    </>
                    ),
                }
                if (i == response.data.values.length - 1) {
                    setLastDate(response.data.values[i].date)
                }
            }
            setLastSize(response.data.values.length)
            setDiaryData(tmpDiary)
            setHasNext(response.data.hasNext)
        })
        .catch((error) => {
            let tmpDiary = diaryData;
            tmpDiary[0] = {
                dot: <FaRegCircleCheck />,
                color: '#1DB954', //하늘색: ade9f7
                children: (
                <>
                    <S.DateDiv>{moment(today).format("YYYY년 MM월 DD일 dddd")}</S.DateDiv>
                    <S.Title>제목 : </S.Title>
                    <S.Picture src={sampleImg} />
                    <S.Music><SiSpotify style={{'color':'#1DB954', 'marginBottom':'4px'}}/>&nbsp;가수명 - 노래 제목</S.Music>
                </>
                ),
            }
            setDiaryData(tmpDiary)
            console.log(error)
        })   
    }, [])

    useEffect(() => {
        function onScroll() {
            if (window.scrollY + document.documentElement.clientHeight > document.documentElement.scrollHeight - 60) {
                if (hasNext == true) {
                    setHasNext(false)
                    axios({
                        method: "GET",
                        url: "api/timeline?date=" + lastDate,
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": localStorage.getItem("accessToken"), 
                        },
                    })
                    .then((response) => {
                        let tmpDiary = diaryData;
                        for (var i=0; i < response.data.values.length; i++) {
                            tmpDiary[i+lastSize] = {
                                dot: <FaRegCircleCheck />,
                                color: '#1DB954', //하늘색: ade9f7
                                children: (
                                <>
                                    <S.DateDiv>{moment(response.data.values[i].date).format("YYYY년 MM월 DD일 dddd")}</S.DateDiv>
                                    <S.Title>제목 : {response.data.values[i].title}</S.Title>
                                    <S.Picture src={response.data.values[i].image} />
                                    <S.Music><SiSpotify style={{'color':'#1DB954', 'marginBottom':'4px'}}/>&nbsp;{response.data.values[i].recommendation.selectedArtistName} - {response.data.values[i].recommendation.selectedSongName}</S.Music>
                                </>
                                ),
                            }
                            if (i == response.data.values.length - 1) {
                                setLastDate(response.data.values[i].date)
                            }
                        }
                        setDiaryData(tmpDiary)
                        setLastSize(lastSize+response.data.values.length)
                        setHasNext(response.data.hasNext)
                    })
                    .catch((error) => {
                        let tmpDiary = diaryData;
                        tmpDiary[0] = {
                            dot: <FaRegCircleCheck />,
                            color: '#1DB954', //하늘색: ade9f7
                            children: (
                            <>
                                <S.DateDiv>{moment(today).format("YYYY년 MM월 DD일 dddd")}</S.DateDiv>
                                <S.Title>제목 : </S.Title>
                                <S.Picture src={sampleImg} />
                                <S.Music><SiSpotify style={{'color':'#1DB954', 'marginBottom':'4px'}}/>&nbsp;가수명 - 노래 제목</S.Music>
                            </>
                            ),
                        }
                        setDiaryData(tmpDiary)
                        console.log(error)
                    })   
                }
            }
        }

        window.addEventListener('scroll', onScroll);
        
    }, [hasNext])

    return (
        <S.Wrapper>
            <Timeline
                items={diaryData}
            />
        </S.Wrapper>
    );
}

export default TimelineView;