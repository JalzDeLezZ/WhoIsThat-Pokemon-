import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getAllTypes } from '../../redux/action';
import GroupInput from './GroupInput';
import { SelectGroup } from './SelectGroup';

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
        typ_name: [],
    }

    const [crntOValues, setOvalues] = useState(oInialValues);
      
    const [oValidation, setOValidation] = useState(oInialValues);

    const mSubmit = (e) =>{
        e.preventDefault();
        // xDispatch(createPokemon(crntOValues));
        setOvalues(oInialValues);
    }

    const mDeleteTypes = (pInn) => {
            const newTypes = crntOValues.typ_name.filter(pI => pI.typ_id !== pInn);
            setOvalues({...crntOValues, typ_name: newTypes});
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

        <SelectGroup
            pName = 'typ_name'
            pLabel = 'Type of Pokemon'
            pAOptions = {rdcr_aTypes}
            pAState = {crntOValues}
            pASetState = {setOvalues}
        />

        <ol>
            {
                crntOValues.typ_name.map((pI,index) => {
                    return( 
                        <li key={index}>
                            {pI.typ_name} 
                            <button 
                                type='button' 
                                onClick={() => mDeleteTypes(pI.typ_id)}>X</button>
                        </li>)
                })
            }
        </ol>

      <button type='submit'>Create</button>
    </form>
  )
}

export default Form