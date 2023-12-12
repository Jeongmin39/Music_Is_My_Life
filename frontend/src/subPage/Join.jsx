import Logo from "../components/Logo.jsx";
import styled from "styled-components";
import React, { useState } from "react";
import axios from "axios";
import SuccessModal from "../components/modal/SuccessModal.jsx";
import FailModal from "../components/modal/FailModal.jsx";
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
  margin-bottom: 20px;
  padding-top: 90px;
  color: #606060;
`
const JoinBtn=styled.button`
  margin-top: 20px;
  font-family: Cafe24Supermagic-Bold;
  background-color: #609440;
  border: none;
  color: white;
  font-size: 20px;
  width: 70%;
  
`

const Subject = styled.div`
  font-family: 'Cafe24Supermagic-Bold';
  display: flex;
  justify-content: center;
  font-size: 15px;
  padding-left:5px;
  margin-right:5px;
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

const Join = () => {
    const [isSuccessModal, setIsSuccessModal] = useState(false);
    const [isFailModal, setIsFailModal] = useState(false);
    const [isAlertModal, setIsAlertModal] = useState(false);
    const [alertMsg, setAlertMsg] = useState("");
    const [values, setValues] = useState({
      userName: "",
      userId: "",
      userPassword: "",
      userPasswordCheck: ""
    });

    const handleChange = async(e) => {
        setValues({...values,
            [e.target.id]: e.target.value,
        });
    }

    const handleSubmit = async(e) => {
        e.preventDefault();

        if(!values.userName || !values.userId || !values.userPassword || !values.userPasswordCheck) {
            setAlertMsg("값을 입력해주세요")
            setIsAlertModal(true)
        } else if(values.userPassword !== values.userPasswordCheck) {
            setAlertMsg("비밀번호와 비밀번호 확인은 같아야 합니다.")
            setIsAlertModal(true)
        } else {
            let body = {
                userName: values.userName,
                loginId: values.userId,
                userPassword: values.userPassword,
                userPasswordCheck: values.userPasswordCheck,
            }
    
            await axios.post('api/jwt/join', body)
            .then((response) => {
                setIsSuccessModal(true)
                console.log(response.data)
            })
            .catch((error) => {
                setIsFailModal(true);
                setValues({
                    userName: "",
                    userId: "",
                    userPassword: "",
                    userPasswordCheck: ""
                  })
                console.log(error)
            })   
        }
    }

    return (
        <>
            <Logo isSetting={false}/>
            <Wrapper onSubmit={handleSubmit}>
            <Title>Join</Title>
                <Block>
                    <Subject>Name</Subject>
                    <input type='text' id="userName" style={{'width':'170px','margin-right':'20px'}} underline={{'border': '0'}}
                        value={values.userName} onChange={handleChange}></input>
                </Block>
                <Block>
                    <Subject>ID</Subject>
                    <input type='text'id="userId"  style={{'width':'170px','margin-right':'20px'}} underline={{'border': '0'}}
                        value={values.userId} onChange={handleChange}></input>
                </Block>
                <Block>
                    <Subject>PW</Subject>
                    <input type='password' id="userPassword" style={{'width':'170px','margin-right':'20px'}} underline={{'border': '0'}}
                        value={values.userPassword} onChange={handleChange}></input>
                </Block>
                <Block>
                    <Subject>Confirm PW</Subject>
                    <input type='password' id="userPasswordCheck" style={{'width':'170px','margin-right':'20px'}} underline={{'border': '0'}}
                        value={values.userPasswordCheck} onChange={handleChange}></input>
                </Block>
                <JoinBtn type="submit">
                        Join
                </JoinBtn>
                <SuccessModal title={"회원가입 성공"} isSuccessModal={isSuccessModal} setSuccess={setIsSuccessModal}/>
                <FailModal title={"회원가입 실패"} isSuccessModal={isFailModal} setSuccess={setIsFailModal} toNavigate="/join"/>
                <AlertModal title={alertMsg} isAlertModal={isAlertModal} setAlert={setIsAlertModal} />
            </Wrapper>
        </>
    )
}

export default Join;