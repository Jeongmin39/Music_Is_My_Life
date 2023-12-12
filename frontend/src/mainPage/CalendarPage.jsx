import React, {useEffect, useState} from "react";
import Nav from "../components/Nav"
import styled from "styled-components";
import Logo from "../components/Logo";
import CalendarView from "../components/calendar/CalendarView";
import {Carousel} from "antd";
import axios from "axios";
import PlayCarousel from "../components/calendar/PlayCarousel.jsx";
import {atom, useRecoilState} from "recoil";

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
`

const PageWrapper = styled.div`
  display: flex;
  justify-content: center;
  padding-top: 80px;

  color: #606060;
`
const today = new Date();
export const monthNow=atom({
    key:'monthNow',
    default:today.getMonth()
})
export const yearNow=atom({
    key:'yearNow',
    default:today.getFullYear()
})

const CalendarPage = () => {

    const [_yearNow, setYearNow] = useRecoilState(yearNow);
    const [_monthNow, setMonthNow] = useRecoilState(monthNow);
    useEffect(()=>{
        setYearNow(today.getFullYear())
        setMonthNow(today.getMonth()+1)
    },[])

    return (
        <>
            <Logo/>
            <Wrapper>
                <PageWrapper>
                    <CalendarView/>
                </PageWrapper>

            </Wrapper>
            <PlayCarousel/>
            <div style={{paddingBottom: "100px"}}/>
            <Nav/>
        </>
    );
}

export default CalendarPage;