import React from "react";
import Nav from "../components/Nav"
import styled from "styled-components";
import Logo from "../components/Logo";
import TimelineView from "../components/timeline/TimelineView";

const Wrapper = styled.div`
    justify-content: center;
    display: block;
    margin-left: 5%;
    margin-right: 5%;
`

const PageWrapper = styled.div`
    position: relative;
    margin-left: 5%;
    padding-top: 100px;
`

const TimelinePage=()=>{
    return(
        <Wrapper>
            <Logo />
                <PageWrapper>
                    <TimelineView />
                </PageWrapper>
            <Nav/>
        </Wrapper>
    );
}

export default TimelinePage;