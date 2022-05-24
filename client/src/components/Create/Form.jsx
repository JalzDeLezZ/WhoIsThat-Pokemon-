import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getAllTypes, createPokemon, uploadImage } from '../../redux/action';
import GroupInput from './GroupInput';
import { SelectGroup } from './SelectGroup';
import Image from './Image';
import './Form.scss';
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
        aIdTypes: [],
    }
    const [oImage, setOImage] = useState(null);

    const [crntOValues, setOvalues] = useState(oInialValues);
      
    const [oValidation, setOValidation] = useState(oInialValues);

    // ================= submit form =================
    const mUpload = async () => { // verify if image is selected
        
        if (oImage){
            const xFormData = new FormData();
            xFormData.append('myFile', oImage);
            return await xDispatch(uploadImage(xFormData)); 
        } else {
            alert('Please select an image');
        }
    }
    
    const mSubmit = async (e) =>{
        e.preventDefault();

        const vUrl = await mUpload();

        let oTemp = crntOValues;
        oTemp.aIdTypes = oTemp.aIdTypes.map(pI => pI.typ_id)
        oTemp = { ...oTemp, pok_image: vUrl };
        console.log(oTemp, "OOOOOOOOOOO");
        const rst = await xDispatch(createPokemon(oTemp));
        console.log(rst,"RESOULT TO CREATE");
        setOvalues(oInialValues);
    }

    const mDeleteTypes = (pInn) => {
            const newTypes = crntOValues.aIdTypes.filter(pI => pI.typ_id !== pInn);
            setOvalues({...crntOValues, aIdTypes: newTypes});
        }
// --------------↑↑↑BLACK BOX↑↑↑-----------------
// ----------------------------------------------
// ---------------↓↓↓RENDER↓↓↓-------------------
  return (
    <form 
        className='component-form'
        onSubmit={mSubmit}>
        <section className='cForm-content'>
            <div className='fSection-One'>

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

                <GroupInput 
                    pType = "number"
                    pLabel= "Life Points"
                    pPlaceHolder = "Enter Life Points 1 - 100"
                    pClassName= "pok_life"
                    pOValues= {crntOValues}
                    pOSetOvalues= {setOvalues}

                    pErrorLegend = "Only numbers (1-100) are accepted"
                    pRegExp = {/^([1-9][0-9]?|100)$/m}
                    pOValidation ={oValidation}
                    pOSetOValidation ={setOValidation}
                    pMax = "100"
                    pMin = "1"
                />

                <GroupInput 
                    pType = "number"
                    pLabel= "Attack Points"
                    pPlaceHolder = "Enter Attack Points 1 - 100"
                    pClassName= "pok_attack"
                    pOValues= {crntOValues}
                    pOSetOvalues= {setOvalues}

                    pErrorLegend = "Only numbers (1-100) are accepted"
                    pRegExp = {/^([1-9][0-9]?|100)$/m}
                    pOValidation ={oValidation}
                    pOSetOValidation ={setOValidation}
                    pMax = "100"
                    pMin = "1"
                />

                <GroupInput 
                    pType = "number"
                    pLabel= "Speed Points"
                    pPlaceHolder = "Enter Speed Points 1 - 100"
                    pClassName= "pok_speed"
                    pOValues= {crntOValues}
                    pOSetOvalues= {setOvalues}

                    pErrorLegend = "Only numbers (1-100) are accepted"
                    pRegExp = {/^([1-9][0-9]?|100)$/m}
                    pOValidation ={oValidation}
                    pOSetOValidation ={setOValidation}
                    pMax = "100"
                    pMin = "1"
                />
                
                <GroupInput 
                    pType = "number"
                    pLabel= "Height Points"
                    pPlaceHolder = "Enter Height Points 1 - 100"
                    pClassName= "pok_height"
                    pOValues= {crntOValues}
                    pOSetOvalues= {setOvalues}

                    pErrorLegend = "Only numbers (1-100) are accepted"
                    pRegExp = {/^([1-9][0-9]?|100)$/m}
                    pOValidation ={oValidation}
                    pOSetOValidation ={setOValidation}
                    pMax = "100"
                    pMin = "1"
                />


                <GroupInput 
                    pType = "number"
                    pLabel= "Weight Points"
                    pPlaceHolder = "Enter Weight Points 1 - 100"
                    pClassName= "pok_weight"
                    pOValues= {crntOValues}
                    pOSetOvalues= {setOvalues}

                    pErrorLegend = "Only numbers (1-100) are accepted"
                    pRegExp = {/^([1-9][0-9]?|100)$/m}
                    pOValidation ={oValidation}
                    pOSetOValidation ={setOValidation}
                    pMax = "100"
                    pMin = "1"
                />


                <GroupInput 
                    pType = "number"
                    pLabel= "Defense Points"
                    pPlaceHolder = "Enter Defense Points 1 - 100"
                    pClassName= "pok_defense"
                    pOValues= {crntOValues}
                    pOSetOvalues= {setOvalues}

                    pErrorLegend = "Only numbers (1-100) are accepted"
                    pRegExp = {/^([1-9][0-9]?|100)$/m}
                    pOValidation ={oValidation}
                    pOSetOValidation ={setOValidation}
                    pMax = "100"
                    pMin = "1"
                />
                
                <SelectGroup
                    pName = 'aIdTypes'
                    pLabel = 'Type of Pokemon'
                    pAOptions = {rdcr_aTypes}
                    pAState = {crntOValues}
                    pASetState = {setOvalues}
                />

                <ol className='sOne-list_types'>
                    {
                        crntOValues.aIdTypes.map((pI,index) => {
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


            <Image 
                pState = {oImage}
                pSetState = {setOImage}
        
            />
            </div>

        <button className='btn-submit' type='submit'>Create</button>
      </section>

    </form>
  )
}

export default Form

// pRegExp = {/(?:\b|-)([1-9]{1,2}[0]?|100)\b/m}
