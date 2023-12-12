import React, { useEffect } from "react";
import { useNavigate } from 'react-router-dom';

export default function (SpecificComponent, option) {

    // options...
    // null => 아무나 출입이 가능한 페이지
    // true => 로그인한 유저만 출입이 가능한 페이지: login, join을 제외한 나머지 페이지
    // false => 로그인한 유저는 출입 불가능한 페이지: login, join
    
    function AuthenticationCheck() {
        let navigate = useNavigate();
        let token = (localStorage.getItem('accessToken')) ? localStorage.getItem('accessToken') : "";

        useEffect(() => {
            
                // 로그인 하지 않은 상태
                if(token == "") {
                    if(option) {
                        navigate('/')
                    }
                } else {
                    // 로그인 한 상태
                    if(token != "") {
                        if(option === false) {
                            navigate('/calendar')
                        }
                    } 
                }
        }, [])

        return (
            <SpecificComponent/>
        )
    }
    
    return AuthenticationCheck
}