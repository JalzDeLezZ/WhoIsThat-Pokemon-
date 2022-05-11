import React from 'react'
import styled from "styled-components";

const SelectGroup = (props) => {
  
  const {pName,pLabel,pAOptions,pAState,pASetState} = props;

  const mAddSlc = (e) => {
    const {value} = e.target;
    let vMatch = pAState[pName].find(e => e.typ_name === value);
    // if (!vMatch) { pASetState([...pAState, value]) }
    if (!vMatch) {
      const oSearch = pAOptions.find(e => e.typ_name === value);
      pASetState({
        ...pAState, 
        [pName]:[
            ...pAState[pName],
            {
              typ_id:oSearch.id, 
              typ_name:oSearch.typ_name
            }
          ]
      })
    }
    else{ alert("Type already added") }
  }
  return (
    <section>
        <label htmlFor={'i'+pName}>{pLabel}</label>
        <select
          id={'i'+pName}
          name={pName}
          onChange={ mAddSlc }
          onBlur={() => {console.log(pAState)}}
        >
            {
                pAOptions.map( pI => {
                  return (
                    <option 
                      key={pI.id} 
                      value={pI.typ_name}
                    >{pI.typ_name}</option>
                  )
                })
            }
        </select>
    </section>
  )
}

const SelectByGenres = (props) => {
  const {pName,pLabel,pAOptions,pAState,pASetState} = props;
  const mAddSlc = (e) => {
    const {value} = e.target;
    let vMatch = pAState[pName].find(e => e.typ_name === value);
    if (!vMatch) {
      const oSearch = pAOptions.find(e => e.typ_name === value);
      pASetState({
        ...pAState, 
        [pName]:[...pAState[pName], {id:oSearch.id, name:oSearch.name}]
      })
    }
    else{ alert("Platform already added") }
  }

  return (
    <section>
        <label htmlFor={'i'+pName}>{pLabel}</label>
        <select
          id={'i'+pName}
          name={pName}
          onChange={ mAddSlc }
        >
            {
                pAOptions.map( (pI) => {
                  return (
                    <option 
                      key={pI.id} 
                      value={pI.value}
                    >{pI.name}</option>
                  )
                })
            }
        </select>
    </section>
  )
}

export {
  SelectGroup,
  SelectByGenres
}