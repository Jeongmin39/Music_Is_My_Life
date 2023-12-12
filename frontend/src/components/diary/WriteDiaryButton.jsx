import axios from 'axios';
import React, { useEffect, useState } from 'react';
import {HiOutlinePencil} from 'react-icons/hi'
import { useNavigate } from 'react-router';
import moment from "moment";
import 'moment/locale/ko';

const WriteDiaryPage = ({value}) => {
    const today = new Date();
    const navigate = useNavigate();
    const [userMsg, setUserMsg] = useState(localStorage.getItem('loginUser') + ' 님, 오늘의 일기를 작성해주세요 :)')

    const toWriteDiary = async() => {
        await axios({
            method: "GET",
            url: "api/diaries/" + moment(value).format("YYYY-MM-DD"),
            headers: {
                "Content-Type": "application/json",
                "Authorization": localStorage.getItem("accessToken"), 
            },
        })
        .then((response) => {
            if (response.data == "작성된 일기가 없음") {
                navigate("/writeDiary", {
                state: {
                    dateInfo : `${value}`,
                    title : "",
                    content : "",
                    imageUrl : "",
                    imageObject : "",
                    isUpdate : false,
                }
                }) 
            }
            else {
                navigate("/showDiary", {
                    state: {
                        dateInfo : `${value}`,
                        title : response.data.title,
                        image : response.data.image,
                        content : response.data.content,
                        songName: response.data.recommendation.selectedSongName,
                        songArtist: response.data.recommendation.selectedArtistName,
                    }
                }) 
            }
        })
        .catch((error) => {
            console.log(error)
        })   
    }

    useEffect(() => {
        axios({
            method: "GET",
            url: "api/diaries/" + moment(today).format("YYYY-MM-DD"),
            headers: {
                "Content-Type": "application/json",
                "Authorization": localStorage.getItem("accessToken"), 
            },
        })
        .then((response) => {
            if (response.data != "작성된 일기가 없음") {
                setUserMsg(localStorage.getItem('loginUser') + " 님의 오늘의 일기")
            }
        })
        .catch((error) => {
            console.log(error)
        })   
    })

    return(
        <div onClick={toWriteDiary} style={{'font-family': 'Cafe24Supermagic-Bold', 'fontWeight':'1000', 'color':'#606060'}}>
            <HiOutlinePencil style={{'marginBottom':'4px','marginRight':'10px'}}/>{userMsg}
        </div>
    )
}

export default WriteDiaryPage;