import React from 'react';
import logoImg from '../img/newLogo.png';
import styled from "styled-components";
import {FiMoon, FiSettings} from "react-icons/fi";
import {Link, NavLink} from "react-router-dom";

const ImgContainer = styled(NavLink)`

  height: 60px;
  margin-top: 15px;
  margin-bottom: 10px;

`

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  position:fixed;
  top:0; left:0;
  width: 100%;
  height: 80px;
  z-index: 2;
  background-color: white;
  padding-top: 20px;
`
const ImgWrapper=styled.img`
width: 240px;
`

const Logo = ({isSetting=true}) => {

    return (
        <Wrapper>
            <FiMoon size={25} style={{"align-item": "center", 'justify-content': 'flex-end','color': 'white'}}></FiMoon>
            <ImgContainer to='/'>
                <ImgWrapper src={logoImg} style={{ "display": "block"}}/>
            </ImgContainer>
            {isSetting ? (
                <Link to="/setting">
                    <FiSettings size={25} style={{"align-item": "center", 'justify-content': 'flex-end', 'margin-left': '10px','color': '#609440','margin-top':'10px', 'marginTop':'21px'}}/>
                </Link>
            ) : (
                <Link to="/setting">
                    <FiSettings size={25} style={{"align-item": "center", 'justify-content': 'flex-end', 'margin-left': '10px','color': 'white'}}/>
                </Link>
            )}
        </Wrapper>
    )
};

export default Logo;
