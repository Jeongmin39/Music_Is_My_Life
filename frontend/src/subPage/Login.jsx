import Logo from "../components/Logo.jsx";
import styled from "styled-components";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import FailModal from "../components/modal/FailModal.jsx";
import SuccessModal from "../components/modal/SuccessModal.jsx";
import AlertModal from "../components/modal/AlertModal.jsx";

const Wrapper = styled.form`
  margin-top: 15%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const Title = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  font-size: 30px;
  font-family: Cafe24Supermagic-Bold;
  margin-bottom: 27px;
  padding-top: 70px;
  color: #606060;
`
const LoginBtn=styled.button`
  margin-top: 20px;
  font-family: Cafe24Supermagic-Bold;
  background-color: #609440;
  border: none;
  color: white;
  font-size: 20px;
  width: 70%;
  height: 54px;
  
`

const JoinBtn=styled.button`
  font-family: Cafe24Supermagic-Bold;
  background-color: white;
  color: #606060;
  font-size: 20px;
  width: 70%;
`

const Subject = styled.div`
  font-family: 'Cafe24Supermagic-Bold';
  display: flex;
  justify-content: center;
  font-size: 15px;
  padding-right: 10px;
  margin-right:10px;
  margin-top:2px;
  margin-bottom: 2px;
  width: 100px;
`
const Block = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin: 10px;
  font-family: Pretendard-light;
`

const Login = () => {
  const navigate = useNavigate();
  const [isSuccessModal, setIsSuccessModal] = useState(false);
  const [isFailModal, setIsFailModal] = useState(false);
  const [isAlertModal, setIsAlertModal] = useState(false);
  const [alertMsg, setAlertMsg] = useState("");
  const [values, setValues] = useState({
    userId: "",
    userPassword: "",
  });

  const goJoin = () => {
    navigate('/join')
  };

  const handleChange = async(e) => {
    setValues({...values,
        [e.target.id]: e.target.value,
    });
  }

  const handleSubmit = async(e) => {
  e.preventDefault();
  let body = {
      loginId: values.userId,
      userPassword: values.userPassword,
  }

  if(!body.loginId || !body.userPassword) {
    setAlertMsg("값을 입력해주세요")
    setIsAlertModal(true)
  } else {
    await axios.post('api/jwt/login', body)
    .then((response) => {
        console.log(response.data[0])
        console.log(response.data[1])
        setIsSuccessModal(true)
        localStorage.clear();
        localStorage.setItem('loginUser', response.data[0]);
        localStorage.setItem('accessToken', response.data[1]);
    })
    .catch((error) => {
        setIsFailModal(true);
        setValues({
          userId: "",
          userPassword: "",
        })
        console.log(error)
    })   
  }
}

    return (
        <>
           <Logo isSetting={false}/>
            <Wrapper onSubmit={handleSubmit}>
              <Title>login</Title>
              <Block>
                <Subject>ID</Subject>
                <input type='text' id="userId" style={{'width':'170px','margin-right':'20px'}} underline={{'border': '0'}}
                  value={values.userId} onChange={handleChange}>
                </input>
              </Block>
              <Block>
                <Subject>PW</Subject>
                <input type='password' id="userPassword" style={{'width':'170px','margin-right':'20px'}} underline={{'border': '0'}}
                  value={values.userPassword} onChange={handleChange}>
                </input>
              </Block>
              <LoginBtn type="submit">
                Login
              </LoginBtn>
              <JoinBtn onClick={goJoin}>
                Join
              </JoinBtn>
              <SuccessModal title={"로그인 성공"} isSuccessModal={isSuccessModal} setSuccess={setIsSuccessModal}/>
              <FailModal title={"로그인 실패"} isFailModal={isFailModal} setFail={setIsFailModal} toNavigate="/login"/>
              <AlertModal title={alertMsg} isAlertModal={isAlertModal} setAlert={setIsAlertModal} />
            </Wrapper>
        </>
    )
}

export default Login;