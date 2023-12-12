import React from 'react';
import styled from "styled-components";
import LogoImg from '/src/img/newLogo.png'
import {useNavigate} from "react-router-dom";
const LogoWrapper=styled.img`
  display: flex;
  margin-top:150px;
    width: 300px;
  
    
`
const Wrapper=styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

`
const LoginBtn=styled.button`
  display: flex;
  justify-content: center;
  margin-top: 80px;
  font-family: Cafe24Supermagic-Bold;
  background-color: #609440;
  border: none;
  color: white;
  font-size: 20px;
  width: 50%;
  height: 54px;
  
`
const JoinBtn=styled.button`
  display: flex;
  justify-content: center;
  font-family: Cafe24Supermagic-Bold;
  background-color: white;
  color: #606060;
  font-size: 20px;
  width: 50%;
`

const StartPage=()=>{
    const navigate = useNavigate();
    const goJoin = () => {
        navigate('/join')
    };
    const goLogin=()=>{
        navigate('/login')
    }
    return(
        <Wrapper>
            <LogoWrapper src={LogoImg}/>
            <LoginBtn onClick={goLogin} type="submit">
                Login
            </LoginBtn>
            <JoinBtn onClick={goJoin}>
                Join
            </JoinBtn>
        </Wrapper>

    )
}

export default StartPage;