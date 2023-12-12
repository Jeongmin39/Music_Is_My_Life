import React, {useEffect, useState} from 'react';
import styled, {css, keyframes} from "styled-components";

import "../../Fonts/Font.css";
import axios from 'axios';
import {AiOutlineClose, AiOutlinePlus} from "react-icons/ai";
import {useRecoilState} from "recoil";
import {userPreferArtistList} from "../../subPage/PreferConditionPage.jsx";
import AlbumImg from "../../img/album.png";
import AlertModal from "./AlertModal.jsx";


const Wrapper = styled.div`

  display: flex;
  flex-direction: row;
  align-items: center;
  height: 50px;
  padding-top: 10px;
  padding-bottom: 5px;
  padding-left: 5px;
  border: solid #c0c0c0;
  border-width: 0px 0px 1px 0px;
  width: 100%;
`

const MusicArtist = styled.div`
  font-size: 15px;
  color: #606060;
  display: flex;
  width: 73%;
  font-family: Pretendard-light;
  align-items: center;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-left: 9px;


`


const Btn = styled.button`
  border: none;
  background-color: white;
  padding: 0px;
  margin-right: 15px

`
const ArtistImg = styled.img`
  border-radius: 5px;
  width: 35px;
  height: 35px;
  object-fit: cover;
  overflow: hidden;
`
const ArtistBox = ({artist = '', exist = false, artistId = '', artistImg = AlbumImg}) => {
    const [_userPreferArtistList, setUserPreferArtistList] = useRecoilState(userPreferArtistList);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const btnStyle = {
        'color': '#606060',
        'display': 'flex',
        'align-items': 'center',
        'justify-content': 'center'

    }
    const [artistPlusError,setArtistPlusError]=useState('');
    const handleDelete = () => {
        axios.delete(`/api/prefer/delete?id=${Number(artistId)}`, {
            headers: {

                'Content-type': 'application/json',
                'Authorization': localStorage.getItem("accessToken")
            }
        }).then((response) => {
            // 삭제 요청이 성공한 경우의 처리
            let artistFindIndex = _userPreferArtistList.indexOf(artist + ',' + artistImg + ',' + artistId);
            if (artistFindIndex !== -1) {
                let tempArray = [..._userPreferArtistList]
                tempArray.splice(artistFindIndex, 1);
                setUserPreferArtistList(tempArray);

            }
        })
            .catch((e) => {
                // 삭제 요청이 실패한 경우의 처리
                setIsError(true);
            });


    };

    const handlePlus = () => {
        let artist_data = {
            artistName: artist.toString(),
            artistImageUrl: artistImg.toString()
        }
        const userToken = localStorage.getItem("accessToken")

        axios.post("/api/users/preference", artist_data, {
            headers: {
                'Content-type': 'application/json',
                'Authorization': userToken
            }
        }).then((response) => {

            //추가되면 +버튼에서 x버튼으로 바꾸기 위함
            let tempArray = [..._userPreferArtistList]
            tempArray.push(artist + ',' + artistImg + ',')
            setUserPreferArtistList(tempArray)


        }).catch((response) => {
            setArtistPlusError('선호 아티스트는 5개까지만 설정할 수 있습니다.')
            setIsModalOpen(true)
        });
    }


    const closeError = () => {
        setIsError(false)
    }
    const [isError, setIsError] = useState(false);
    return (

        <Wrapper>
            <ArtistImg src={artistImg}></ArtistImg>
            <MusicArtist>{artist}</MusicArtist>
            <AlertModal isOpen={isModalOpen} click={setIsModalOpen} content={artistPlusError}></AlertModal>
            <AlertModal isOpen={isError} click={setIsError} content={"ERROR"}></AlertModal>

            {exist ?
                (
                    <Btn onClick={handleDelete}>
                        <AiOutlineClose size={20} style={{'display': 'flex', 'align-items': 'center', 'justify-content': 'center', "color": "#d76c7f", "margin-right": "2px"}}/>
                    </Btn>
                ) : (
                    <Btn onClick={handlePlus} type='submit'>
                        <AiOutlinePlus size={25} style={{'display': 'flex', 'align-items': 'center', 'justify-content': 'center', "color": "#69d254", "background": "none"}}/>
                    </Btn>
                )
            }
        </Wrapper>
    )

}

export default ArtistBox;