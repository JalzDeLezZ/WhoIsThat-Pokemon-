import React from 'react'
import styled, { css } from 'styled-components';

const GroupInput = (props) => {
  const {pType,pLabel,pPlaceHolder,pClassName,pOValues,pOSetOvalues, pRegExp,pErrorLegend, pOValidation, pOSetOValidation, pMax, pMin} = props;

  const mOnChange = (event) => {
    const {name ,value} = event.target;
    // console.log("ZZZZZZZZZZZ",name,value);
    pOSetOvalues(
      {...pOValues,
        [name]: value}
    );
  }
  const mValitation = (event) => {
    const {value,name} = event.target;
    if(pRegExp.test(value)){
      console.log('INN Correct')
      pOSetOValidation(
        {...pOValidation,
          [name]: true}
      );
    } else {
      console.log('INN Incorrect')
      pOSetOValidation(
        {...pOValidation,
          [name]: false}
      );
    }
  }
  return (
    <MyDiv>
        <label htmlFor="">{pLabel}</label>
        <input 
          type={pType}
          placeholder={pPlaceHolder}
          name={pClassName}
          value={pOValues[pClassName]}
          onChange={mOnChange}
          onKeyUp={mValitation}
          onBlur={mValitation}
          min={pMin}
          max={pMax}
        />
        {
          pOValidation[pClassName] === '' ? null
          :pOValidation[pClassName] === true ? <span>✅</span>
          :<span>❌</span>
        }
        <ErrorLegend 
            pIsValid={pOValidation[pClassName]}
        >{pErrorLegend}</ErrorLegend>
    </MyDiv>
  )
}

export default GroupInput

const ErrorLegend = styled.p`
    font-size: 12px;
    margin-bottom: 0;
    color: red;
    display: none;
    
    ${props => props.pIsValid === true && css`
        display: none;
    `}
    ${props => props.pIsValid === false && css`
        display: block;
    `}
`

const MyDiv = styled.div`
  position: relative;
  span{
    position: absolute;
    right: 0px;
    top: 33px;
    margin-right: 32px;
  }
`