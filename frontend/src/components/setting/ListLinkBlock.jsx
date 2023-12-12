import React from "react";
import styled from "styled-components";
import {NavLink} from "react-router-dom";


const BlockWrapper = styled.div`
  display: flex;
  border: 1px solid #c0c0c0;
  border-width: 0px 0px 1px 0px;
  padding-left: 5px;
  height: 45px;
  align-items: center;
  color: #606060;
  width: 100%;
  font-size: 18px;
  font-family: Cafe24Supermagic-Bold;


`

const NavLinkTab = styled(NavLink)`
  text-decoration: none;
  width: 100%;
  color: #888888;
  align-items: flex-start;
  transition: all 0.3s ease;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;

`;


const ListLinkBlock = ({listName = '', linkAddress = '/'}) => {
    return (
        <>
            <NavLinkTab to={linkAddress}>
                <BlockWrapper>
                    {listName}
                </BlockWrapper>
            </NavLinkTab>
        </>
    )
}

export default ListLinkBlock;