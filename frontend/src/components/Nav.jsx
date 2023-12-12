import React from "react";
import {NavLink, Link} from 'react-router-dom';
import styled from 'styled-components';
import {CiViewTimeline} from 'react-icons/ci';
import {BsCalendar4Week} from 'react-icons/bs';
import {BsMusicNoteList} from 'react-icons/bs';

const NavLinkContainer = styled.div`
  display: flex;
  padding-right: 10%;
  padding-left:10%;
  position: fixed;
  height: 75px;
  text-align: center;
  justify-content: space-between;
  align-items: center;
  bottom:0;
  left:0;
  width: 100%;
  box-shadow: 4px 0px 3px rgba(0, 0, 0, 0.25);
  z-index: 0;
  background-color: white;
`;

const NavLinkTab = styled(NavLink)`
  
  text-decoration: none;
  height: 30px;
  color: #b7b7b7;
  padding-left: 20px;
  padding-right: 20px;
 
  align-items: flex-start;
  

  transition: all 0.3s ease;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;

  &:hover {
    color: #ddd;
  }

  .timelineIcon {
    padding-top: 0px;
    margin-top: 0px;
  }
`;




const Nav = () => {
    const activeStyle = {
        'color': '#609440',
    };

    return (

            <NavLinkContainer>

                <NavLinkTab style={({isActive}) => (isActive ? activeStyle : {})} to='/timeline'><CiViewTimeline
                    size={35} className="timelineIcon"/></NavLinkTab>
                <NavLinkTab style={({isActive}) => (isActive ? activeStyle : {})} to='/calendar'><BsCalendar4Week
                    size={25}/></NavLinkTab>
                <NavLinkTab style={({isActive}) => (isActive ? activeStyle : {})} to='/playlist'><BsMusicNoteList
                    size={25}/>
                </NavLinkTab>
            </NavLinkContainer>

    )
}

export default Nav;