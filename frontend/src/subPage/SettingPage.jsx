import React from "react";
import {FiSettings} from "react-icons/fi";
import styled from "styled-components";
import {MdKeyboardArrowLeft} from "react-icons/md";
import {CiViewTimeline} from "react-icons/ci";
import {NavLink, useNavigate} from "react-router-dom";
import ListLinkBlock from "../components/setting/ListLinkBlock.jsx";


const SetBtn = styled.div`
  
  display: flex;
  margin-top: 10%;
  margin-left: 2%;
  margin-right: 10%;
  margin-bottom: 10px;
  align-items: center;
  justify-content: start;
  height: 40px;
  font-size: 20px;
  color:#606060;
  font-family: Cafe24Supermagic-Bold;
  
`
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 10%;
  margin-right: 10%;
  justify-content: flex-start;
  align-items: flex-start;
  top: 5%;
  margin-top: 15px;
`
const NavLinkTab = styled(NavLink)`
  text-decoration: none;
  align-items: flex-start;
  transition: all 0.3s ease;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;

`;

const BlockWrapper = styled.div`
  display: flex;
  border: 1px solid #c0c0c0;
  border-width: 0px 0px 1px 0px;
  padding-left: 5px;
  height: 45px;
  align-items: center;
  color: #606060;
  width: 100%;
  font-size: 18px;
  font-family: Cafe24Supermagic-Bold;
`


const SettingPage = () => {
    const navigate = useNavigate();
    const logout = () => {
      localStorage.removeItem('accessToken')
      navigate("/")
    }

    return (
        <>
            <SetBtn>
                <NavLinkTab to="/">
                <MdKeyboardArrowLeft size={40} style={{textDecoration:'none',color:'#606060'}}/>
                </NavLinkTab>
                <FiSettings size={25} style={{color: '#606060', marginRight: '10px'}}/>
                설정
            </SetBtn>

            <Wrapper>
                <ListLinkBlock listName={'선호 아티스트 설정'} linkAddress={'/setting/preferCondition'} />
                <BlockWrapper onClick={logout}>로그아웃</BlockWrapper>

            </Wrapper>
        </>
    )
}


export default SettingPage;