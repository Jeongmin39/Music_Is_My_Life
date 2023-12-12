import React from "react";
import styled from "styled-components";
import AlbumImg from "../../img/album.png";
import "../../Fonts/Font.css";

const Wrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  height: 70px;
  align-items: center;
  border: solid #bdb0b0;
  border-width: 0px 0px 1px 0px;
  &:hover {
    color: #1DB954;
  }  
`

const InformWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding-left: 10px;
  width: 85%;
`
const MusicTitle = styled.div`
  font-size: 17px;
  font-family: Cafe24Supermagic-Bold;
  margin-bottom: 1px;
  margin-top: 1px;
  height: 20px;
  display: block;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`

const MusicArtist = styled.div`
  font-size: 13px;
  color: #9b9b9b;
  font-family: Cafe24Supermagic-Bold;
  height: 20px;
  display: block;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`
const RecommendSong = ({title = '곡 제목', Artist = '아티스트 명',imgSrc=AlbumImg, onClick=null, border=false}) => {
    let isBorder = border;
    
    return (
        {...isBorder === false ? (
            <>
            <Wrapper onClick = {onClick}>
                <img src={imgSrc} style={{"borderRadius":"5px",'width':'45px','height':'45px'}}></img>
                <InformWrapper>
                    <MusicTitle>{title}</MusicTitle>
                    <MusicArtist>{Artist}</MusicArtist>
                </InformWrapper>
            </Wrapper>
            </>
        ) : (
            <>
            <Wrapper onClick = {onClick} style={{'border':'white'}}>
                <img src={imgSrc} style={{"border-radius":"5px",'width':'45px','height':'45px'}}></img>
                <InformWrapper>
                    <MusicTitle>{title}</MusicTitle>
                    <MusicArtist>{Artist}</MusicArtist>
                </InformWrapper>
            </Wrapper>
            </>
        )}
    )
}

export default RecommendSong;