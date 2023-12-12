import React from 'react';
import SpotifyImg from "../img/Spotify.png";
import styled from "styled-components";
import {Link} from "react-router-dom";

const Wrapper= styled.div`
  display: flex;
  justify-content: end;
  width: auto;
  border-radius: 14px;
  align-items: center;
  border: 0.1em solid #18d660;
  font-size: 15px;
  padding-left: 5px;
  padding-right: 5px;
  margin-top: 5px;
  margin-left:10px;
  padding-bottom: 2px;

`



const SpotifyPlay =()=>{
    return(
        <Wrapper >
            <a href="https://open.spotify.com/"
               style={{textDecoration: 'none',color:'black'}}>
            <div><img src={SpotifyImg}
                      style={{height:'15px',marginLeft:'5px',marginRight:'5px'}}/>
              </div>
            </a>
        </Wrapper>
    )
}

export default SpotifyPlay;