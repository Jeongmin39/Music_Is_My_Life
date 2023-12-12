import React, {useEffect, useState} from "react";
import styled from "styled-components";
import AlbumImg from "/src/img/album.png";
import "../../Fonts/Font.css";
import {MdPauseCircleOutline, MdPlayCircleOutline} from "react-icons/md";

const Wrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  height: 70px;
  width: 100%;
  align-items: center;
  border: solid #bdb0b0;
  border-width: 0px 0px 1px 0px;
`

const InformWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding-left: 10px;
  width: 100%;

`
const MusicTitle = styled.div`
  font-size: 17px;
  width: 100%;
  font-family: Pretendard-Regular;
  margin-bottom: 1px;
  margin-top: 1px;
  height: 22px;
  display: block;
  max-width: 225px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`


const MusicArtist = styled.div`
  font-size: 13px;
  color: #9b9b9b;
  font-family: Pretendard-light;
  height: 20px;
  display: block;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`
const Btn = styled.button`
  border: none;
  background-color: white;
  padding: 0px;
  margin-right: 15px
`
const MusicBox = ({title = '', Artist = '', imgSrc = AlbumImg, musicURL = ''}) => {

    const [onPlay, setOnPlay] = useState(false);
    const [playMusicURL, setPlayMusicURL] = useState(new Audio());
    const PlayMusic = () => {
        setOnPlay(true);
        setPlayMusicURL(new Audio(musicURL))
        console.log(playMusicURL)
    }

    useEffect(()=>{
        if (onPlay===true){
        playMusicURL.play().then((r)=>{console.log("노래재생")})}
        else{
            playMusicURL.pause()
        }
    },[onPlay])

    const PauseMusic = () => {
        setOnPlay(false);
    }

    return (
        <Wrapper>
            <img src={imgSrc} style={{"borderRadius": "5px", 'minWidth': '45px', 'height': '45px'}}></img>
            <InformWrapper>
                <MusicTitle>{title}</MusicTitle>
                <MusicArtist>{Artist}</MusicArtist>
            </InformWrapper>

            {
                onPlay
                    ? (<Btn onClick={PauseMusic}>
                        <MdPauseCircleOutline size={25} style={{"color": '#18d660'}}/>
                    </Btn>) :

                    (<Btn onClick={PlayMusic}>
                        <MdPlayCircleOutline size={25} style={{"color": '#18d660'}}/>
                    </Btn>)
            }
        </Wrapper>
    )
}

export default MusicBox;