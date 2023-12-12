import React, {useEffect, useState} from "react";
import {Carousel} from 'antd';

import axios from "axios";
import styled from "styled-components";
import MusicCard from "./MusicCard.jsx";
import {atom, useRecoilState} from "recoil";
import {monthNow, yearNow} from "../../mainPage/CalendarPage.jsx";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`

const PlayCarousel = () => {

    const today = new Date();
    const [playList, setPlayList] = useState([''])
    const [_yearNow, setYearNow] = useRecoilState(yearNow);
    const [_monthNow, setMonthNow] = useRecoilState(monthNow);

    useEffect(() => {

        console.log(_monthNow + "carousel")
        console.log(_yearNow + "carousel")
        axios({
            method: "GET",
            url: `/api/playlists/${Number(_yearNow)}/${Number(_monthNow)}`,
            headers: {
                "Content-Type": "application/json",
                "Authorization": localStorage.getItem("accessToken"),
            },
        }).then((r) => {
            setPlayList(r.data)
            console.log(r.data)
        }).catch((e) => {
            console.log(e.toString() + "carousel")
        })
    }, [_yearNow, _monthNow])

    return (

        <Carousel autoplay autoplaySpeed={2000} dots={false}>

            {playList.map((song) =>
                (
                    <MusicCard title={song.selectedSongName} artist={song.selectedArtistName}
                               imgSrc={song.albumImageUrl}/>
                )
            )}


        </Carousel>

    )
}

export default PlayCarousel;