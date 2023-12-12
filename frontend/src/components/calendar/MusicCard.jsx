import React from "react";
import styled from "styled-components";

const HallWrapper = styled.div`
  display: flex;
  justify-content: center;
 margin-top:10px;
  width: 350px;
  margin-left:5px;
`
const ImgWrapper = styled.img`
  width:80px;
  height: 80px;
`
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;

`
const SongTittle = styled.div`
  width: 160px;
  min-width: 130px;
  margin-top:10px;
  margin-left:10px;
  font-size: 18px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-family: Cafe24Supermagic-Bold;
`
const ArtistWrapper = styled.div`
  margin-left:10px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-family: Cafe24Supermagic-Bold;
`
const MusicCard = ({title, artist, imgSrc}) => {

    return (
        <>

            <HallWrapper>
                <ImgWrapper src={imgSrc}/>
                <Wrapper>
                    <SongTittle>{title}</SongTittle>
                    <ArtistWrapper>{artist}</ArtistWrapper>
                </Wrapper>
            </HallWrapper>
        </>

    )
}

export default MusicCard;