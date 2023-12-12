import React from 'react';
import { useLocation } from 'react-router';
import styled from 'styled-components';
import Logo from '../components/Logo.jsx';
import ShowDiaryEditor from '../components/diary/showDiaryEditor.jsx';
import Nav from '../components/Nav.jsx';

const Wrapper = styled.div`
    justify-content: center;
    display: block;
    margin-left: 2%;
    margin-right: 3%;
`
const PageWrapper = styled.div`
    position: relative;
    margin-left: 1%;
    padding-top: 80px;
`
const ShowDiaryPage = () => {
    const location = useLocation();
    const dateInfo = location.state.dateInfo;
    const title = location.state.title;
    const content = location.state.content;
    const image = location.state.image;
    const songName = location.state.songName;
    const songArtist = location.state.songArtist;

    return(
        <Wrapper>
            <Logo/>
            <PageWrapper>
                <ShowDiaryEditor dateInfo={dateInfo} title={title} content={content} image={image} songName={songName} songArtist={songArtist}/>
            </PageWrapper>
            <Nav/>
        </Wrapper>
    )
}

export default ShowDiaryPage;