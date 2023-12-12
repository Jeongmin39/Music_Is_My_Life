import Nav from "../components/Nav"
import Logo from '../components/Logo'
import styled from "styled-components";
import DropButton from "../components/playlist/DropButton.jsx";
import 'bootstrap/dist/css/bootstrap.css';
import SpotifyPlay from "../components/SpotifyPlay.jsx";
import React, {useEffect, useState} from "react";
import axios from "axios";
import {atom, useRecoilState} from "recoil";
import MusicBox from "../components/playlist/MusicBox.jsx";

const BtnContainer = styled.div`
  position: relative;
  height: 75px;
  display: flex;
  justify-content: center;
  align-items: center;


  z-index: 1;
`

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-left: 5px;
  margin-right: 5px;
`

const MusicList = styled.div`
  display: flex;
  width: 320px;
  flex-direction: column;
  align-items: center;
  position: relative;
  bottom: 70px;
  margin-top: 70px;
  margin-bottom: 30px;


`

const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  margin-left: 5px;
  margin-right: 5px;
  padding-top: 80px;
`
export const selectedYear = atom({
    key: 'selectedYear',
    default: 2021
})

export const selectedMonth = atom({
    key: 'selectedMonth',
    default: 2
})

export const playStateRecoil = atom({
    key: 'playState',
    default: '1'
})
export const pre = atom({
    key: 'pre',
    default: '1'
})
const Btn = styled.button`
  border: none;
  background-color: white;
  padding: 0px;
  margin-right: 15px
`
export const MusicURLRecoil = atom(
    {
        key: 'MusicURLRecoil',
        default: new Audio('')
    }
)

const PlaylistPage = () => {
    const today = new Date();
    const [playList, setPlayList] = useState([''])
    const [_selectedMonth, setSelectedMonth] = useRecoilState(selectedMonth)
    const [_selectedYear, setSelectedYear] = useRecoilState(selectedYear)
    const [_playState, _setPlayState] = useRecoilState(playStateRecoil)
    const [_playMusicURL, setPlayMusicURL] = useRecoilState(MusicURLRecoil);
    const [years, setYears] = useState(['']);
    const [months, setMonths] = useState(['']);


    useEffect(() => {
        callData();
    }, [_selectedMonth, _selectedYear])
    useEffect(() => {
            setSelectedYear(today.getFullYear())
            setSelectedMonth(today.getMonth() + 1)
            setPlayMusicURL(new Audio(''))
            axios({
                method: "GET",
                url: "/api/playlists/year",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": localStorage.getItem("accessToken"),
                }
            }).then((r) => {
                setYears(r.data)

            }).catch((e) => {
            });

            axios({
                method: "GET",
                url: "/api/playlists/month",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": localStorage.getItem("accessToken"),
                }
            }).then((r) => {
                setMonths(r.data)

            }).catch((e) => {

            });
        },
        [])

    const callData = () => {
        axios({
            method: "GET",
            url: `/api/playlists/${_selectedYear}/${_selectedMonth}`,
            headers: {
                "Content-Type": "application/json",
                "Authorization": localStorage.getItem("accessToken"),
            },
        }).then((r) => {
            let reverseArray=r.data
            reverseArray.reverse()
            setPlayList(reverseArray)
        })
    }


    return (
        <Wrapper>
            <Logo/>
            <PageWrapper>
                <BtnContainer>

                    <DropButton titleText={"월"} years={years}
                                months={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]}></DropButton>
                    <SpotifyPlay/>
                </BtnContainer>

                <MusicList>
                    {
                        playList.length === 0
                            ?
                            <></> : (
                                playList.map((song) => (
                                    <MusicBox title={song.selectedSongName} imgSrc={song.albumImageUrl}
                                              Artist={song.selectedArtistName}
                                              musicURL={song.songUri}></MusicBox>

                                )))

                    }

                </MusicList>
            </PageWrapper>

            <Nav/>

        </Wrapper>
    );
}

export default PlaylistPage;