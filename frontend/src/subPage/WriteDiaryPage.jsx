import React from 'react';
import { useLocation } from 'react-router';
import styled from 'styled-components';
import Logo from '../components/Logo.jsx';
import WriteDiaryEditor from '../components/diary/WriteDiaryEditor.jsx';

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

const WriteDiaryPage = () => {
    const location = useLocation();
    const dateInfo = location.state.dateInfo;
    const title = location.state.title;
    const content = location.state.content;
    const imageUrl = location.state.imageUrl;
    const image = location.state.imageObject;
    const isUpdate = location.state.isUpdate;

    return(
        <Wrapper>
            <Logo/>
            <PageWrapper>
                <WriteDiaryEditor dateInfo={dateInfo} title={title} content={content} imageUrl={imageUrl} imageObject={image} isUpdate={isUpdate}/>
            </PageWrapper>
        </Wrapper>
    )
}

export default WriteDiaryPage;