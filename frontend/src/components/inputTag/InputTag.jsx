import styled from "styled-components";
import React, {useState} from "react";


const Block = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin: 10px;
  font-family: Pretendard-light;
`
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`
const Subject = styled.div`
  font-family: 'Cafe24Supermagic-Bold';
  display: flex;
  justify-content: end;
  font-size: 15px;
  padding-right: 10px;
  margin-right:10px;
  margin-top:2px;
  margin-bottom: 2px;
 width: 100px;
`
const InputTag = ({tag = "",type='text'}) => {
    const [value, setValue] = useState('');

    const handleInputChange = (e) => {
        setValue(e.target.value);
    }
    return (
        <Wrapper>
            <Block>
                <Subject>{tag}</Subject>

                <input type={type} defaultValue={value}  style={{'width':'170px','margin-right':'20px'}} underline={{'border': '0'}}
                       onChange={handleInputChange}></input>
            </Block>
        </Wrapper>
    )
}


export default InputTag;
