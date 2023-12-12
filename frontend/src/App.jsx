import React from "react";
import {Routes, Route} from 'react-router-dom';
import './App.css';
import Auth from './hoc/auth';

//Pages
import StartPage from "./subPage/StartPage";
import Login from "./subPage/Login.jsx";
import Join from "./subPage/Join.jsx";
import CalendarPage from './mainPage/CalendarPage.jsx'
import PlaylistPage from './mainPage/PlaylistPage.jsx'
import TimelinePage from "./mainPage/TimelinePage.jsx";

import WriteDiaryPage from "./subPage/WriteDiaryPage.jsx";
import SettingPage from "./subPage/SettingPage.jsx";
import PreferConditionPage from "./subPage/PreferConditionPage.jsx";
import ShowDiaryPage from "./subPage/ShowDiaryPage.jsx";

function App() {

    const AuthStartPage=Auth(StartPage,false);
    const AuthLogin = Auth(Login, false);
    const AuthJoin = Auth(Join, false);
    const AuthCalendarPage = Auth(CalendarPage, true);
    const AuthPlaylistPage = Auth(PlaylistPage, true);
    const AuthTimelinePage = Auth(TimelinePage, true);

    const AuthWriteDiaryPage = Auth(WriteDiaryPage, true);
    const AuthShowDiaryPage = Auth(ShowDiaryPage, true);
    const AuthSettingPage = Auth(SettingPage, true);
    const AuthPreferConditionPage = Auth(PreferConditionPage, true);

    return (
        <Routes>
            <Route path='/' element={<AuthStartPage/>}/>
            <Route path='/login' element={<AuthLogin/>}/>
            <Route path='/join' element={<AuthJoin/>}/>
            <Route path='/calendar' element={<AuthCalendarPage/>}/>
            <Route path='/playlist' element={<AuthPlaylistPage/>}/>
            <Route path='/timeline' element={<AuthTimelinePage/>}/>

            <Route path='/writeDiary' element={<AuthWriteDiaryPage/>}/>
            <Route path='/showDiary' element={<AuthShowDiaryPage/>}/>
            <Route path='/setting' element={<AuthSettingPage/>}/>
            <Route path='/setting/preferCondition' element={<AuthPreferConditionPage/>}/>
        </Routes>
    )
}

export default App