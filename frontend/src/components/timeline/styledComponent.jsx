import styled, { keyframes } from "styled-components";

export const Wrapper = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-top: 15px;
    margin-bottom: 75px;
    z-index: 0;
`

export const DateDiv = styled.div`
  padding: 2px 13px;
  width: 162px;
  background: white;
  border-radius: 16px;
  border: 1.5px solid #606060;
  margin-bottom: 2%;
  color: #606060;
  font-family: Cafe24Supermagic-Bold;
`

export const Picture = styled.img`
    border-radius: 5px;
    width: 85%;
    height: 300px;
    object-fit: cover;
    overflow: hidden;
    border : 1px solid #E6E6E6;
`

export const Title = styled.div`
  color: #606060;
  font-weight: 1000;
  margin-bottom: 2%;
  padding: 1px 3px;
  font-family: Cafe24Supermagic-Bold;
`

export const Music = styled.div`
    color: grey;
    padding: 5px;
    font-family: Cafe24Supermagic-Bold;
`