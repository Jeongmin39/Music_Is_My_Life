import React from 'react';
import styled from "styled-components";
import {MdKeyboardArrowLeft} from "react-icons/md";
import {NavLink} from "react-router-dom";

const Wrapper = styled.div`
  display: flex;
  margin-top: 20px;
  margin-left: 2%;
  margin-right: 10%;
  
  align-items: center;
  justify-content: start;
  height: 40px;

  color: #606060;
`
const NavLinkTab = styled(NavLink)`
  text-decoration: none;
  color: #606060;
  display: flex;
  margin-top:30px;
  align-items: center;
  font-size: 18px;
  text-decoration: none;
  transition: all 0.3s ease;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  width: 100%;
  font-family: Cafe24Supermagic-Bold;
`;


const BackBtnTitle = ({title = '',linkTo='/'}) => {
    return (
        <Wrapper>
            <NavLinkTab to={linkTo}>
                <MdKeyboardArrowLeft size={40} style={{"textDecoration": 'none'}}/>
                {title}
            </NavLinkTab>
        </Wrapper>
    )
}


export default BackBtnTitle;

