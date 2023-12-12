import React from "react";
import { useNavigate } from "react-router-dom";
import { HiPlus } from "react-icons/hi";
import styled from "styled-components";

const ButtonWrap = styled.div`
    background: white;
    margin-bottom: 2%;
    color: #000000;
    font-weight: 600;

`

const AddButton = ({value}) => {
    const navigate = useNavigate();

    const toWriteDiary = () => {
        navigate("/writeDiary", {
            state: {
                dateInfo : `${value}`
            }
        }) 
    }
    return(
        <ButtonWrap onClick={toWriteDiary} style={{'color':'#606060', 'font-family': 'Cafe24Supermagic-Bold', 'marginTop':'2px', 'fontSize':'15px'}}>
            <HiPlus style={{'marginBottom': '4px'}}/>&nbsp;추가
        </ButtonWrap>
    )
}

export default AddButton;