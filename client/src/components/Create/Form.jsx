import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getAllTypes } from '../../redux/action';
import GroupInput from './GroupInput';

const Form = () => {
    const xDispatch = useDispatch();

    useEffect(() => {
        xDispatch(getAllTypes());
    }, [xDispatch])

    const {rdcr_aTypes} = useSelector(state => state);

    const oInialValues = {
        pok_name: '',
        pok_life: '',
        pok_attack: '',
        pok_defense: '',
        pok_speed: '',
        pok_height: '',
        pok_weight: '',
        typ_name: '',
    }

    const [crntOValues, setOvalues] = useState(oInialValues);
      
    const [oValidation, setOValidation] = useState(oInialValues);

    const mSubmit = (e) =>{
        e.preventDefault();
        console.log(crntOValues);
        // xDispatch(createPokemon(crntOValues));
        setOvalues(oInialValues);
    }
// --------------↑↑↑BLACK BOX↑↑↑-----------------
// ----------------------------------------------
// ---------------↓↓↓RENDER↓↓↓-------------------
  return (
    <form onSubmit={mSubmit}>
        <GroupInput 
        pType = "text"
        pLabel= "Pokemon Name"
        pPlaceHolder = "Enter Pokemon Name"
        pClassName= "pok_name"
        pOValues= {crntOValues}
        pOSetOvalues= {setOvalues}

        pRegExp = {/^[a-zA-Z0-9 ]{3,}$/m}
        pOValidation ={oValidation}
        pOSetOValidation ={setOValidation}
        pErrorLegend = "Only letters (aA-zZ) and numbers (0-9) are accepted"
      />

      <button type='submit'>Create</button>
    </form>
  )
}

export default Form