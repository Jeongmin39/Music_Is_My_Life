import React, {useCallback, useEffect, useLayoutEffect, useState} from "react";
import BackBtnTitle from "../components/setting/BackBtnTitle.jsx";
import {BiSearch} from "react-icons/bi";
import ArtistBox from "../components/preferCondition/ArtistBox.jsx";
import {atom, useRecoilState} from "recoil";
import styled from "styled-components";
import axios from "axios";

const Wrapper = styled.div`
  display: block;
  flex-direction: column;
  margin-left: 10%;
  margin-right: 10%;
  justify-content: flex-start;
  align-items: flex-start;
  margin-top:10%;
  

`
const SubTitle = styled.div`
  margin-top: 10px;
  display: flex;
  align-items: center;
  color: #606060;
  margin-bottom: 10px;
  font-size: 17px;
  font-family: Cafe24Supermagic-Bold;
`

const SearchBox = styled.label`
  display: flex;
  align-items: center;
  width: 100%;
  border-radius: 20px;
  border: 1px solid #606060;
  height: 40px;
  margin-bottom: 10px;
`

const MusicList = styled.div`
  bottom: 70px;
  margin-bottom: 30px;
`
const SearchBtn = styled.button`

  background: none;
  border: none;
`
export const userPreferArtistList = atom({
    key: 'userPreferArtistList',
    default: [""]
})
const PreferConditionPage = () => {

    const [searchValue, setSearchValue] = useState('');
    const inputStyle = {"border": '0', 'outline': 'none', 'underline': 'false',}
    const [searchArtistList, setSearchArtistList] = useState([]);

    const [_userPreferArtistList, setUserPreferArtistList] = useRecoilState(userPreferArtistList);


    let artistInfo;
    let artistNames = []


    const setArtistNames = (data) => {
        artistNames = [];
        data.map((artist) => {
            let temp = artist.split(',')
            artistNames.push(temp[0])
            artistNames.push(temp[1])
            artistNames.push(temp[2])
        })
        console.log(artistNames)
        console.log(artistNames.indexOf("아이유"))
    }

    useEffect(() => {
        axios({
            method: "GET",
            url: `/api/users/preference`,
            headers: {
                "Authorization": localStorage.getItem("accessToken"),
            },
        }).then((response) => {
            console.log(response.data)
            setUserPreferArtistList(response.data)
            setArtistNames(_userPreferArtistList)
        }).catch((e) => {
            console.log(e.toString() + "에러남")
        })
    }, [searchValue])

    _userPreferArtistList.map((artist) => {
        let temp = artist.split(',')
        artistNames.push(temp[0])
        artistNames.push(temp[1])
        artistNames.push(temp[2])
    })
    const handleInputChange = (e) => {
        setSearchValue(e.target.value)
        console.log(searchValue)
        const assignID = {
            grant_type: "client_credentials",
            client_id: "client_id",
            client_secret: "client_secret",
        }
        axios({
            method: "POST",
            url: "https://accounts.spotify.com/api/token",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            data: assignID
        }).then((token) => {
            if (searchValue !== "") {
                console.log("prefercondition에서 검색요청 날림")
                axios({
                    method: "GET",
                    url: `https://api.spotify.com/v1/search?q=${searchValue}&type=artist&limit=5&offset=0`,
                    headers: {
                        "Authorization": "Bearer " + token.data.access_token,
                    },
                }).then((response) => {
                    setSearchArtistList(response.data.artists.items)
                    console.log(response)
                }).catch((e) => {
                    setSearchArtistList([])
                    console.log(e.toString() + "검색요청에서 에러남")
                })
            }
        }).catch((e) => {
            console.log("토큰 요청 오류")
        })

        console.log(searchArtistList)
    }
    return (
        <>
            <BackBtnTitle title={"선호 조건 재설정"} linkTo={'/setting'}/>
            <Wrapper>
                <SubTitle>아티스트 검색</SubTitle>
                <SearchBox>
                    <BiSearch style={{'color': '#606060', 'margin-left': '10px'}}/>
                    <input type="text" defaultValue={searchValue} underline={{'border': '0'}}
                           style={inputStyle} onChange={handleInputChange}>
                    </input>
                </SearchBox> {
                searchValue === '' ?
                    (
                        <MusicList>
                            {
                                _userPreferArtistList.map((artist) => (
                                    artistInfo = artist.split(','),
                                        <ArtistBox artist={artistInfo[0]} artistImg={artistInfo[1]}
                                                   artistId={artistInfo[2]} exist={true}/>
                                ))}

                        </MusicList>
                    ) : (<MusicList>
                            {
                                searchArtistList.map((artist) => (
                                        artist.images.length === 0 ?
                                            <></> : (
                                                artistNames.indexOf(artist.name) === -1 || artistNames.indexOf(artist.images[0].url) === -1
                                                    ?
                                                    <ArtistBox artist={artist.name} artistImg={artist.images[0].url} exist={false}/>
                                                    :
                                                    <ArtistBox artist={artist.name} artistImg={artist.images[0].url}
                                                               exist={true}
                                                               artistId={artistNames[(artistNames.indexOf(artist.images[0].url)) + 1]}
                                                    />
                                            )
                                    )
                                )
                            }
                        </MusicList>
                    )


            }


            </Wrapper>
        </>
    )
}

export default PreferConditionPage;