import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { getImage, updateImage  } from '../../redux/action';


const Images = () => {
    const xDispatch = useDispatch();

    const [crntFile, setFile] = useState();
    
    const mUpdateImage = (e) => {
        e.preventDefault(); 
        const xFormData = new FormData();
        xFormData.append('myFile', crntFile);
        xDispatch(updateImage(xFormData))
    }
    const mFileSelected = (e) => {
        setFile(e.target.files[0]);
    }

  return (
    <div style={{margin: "30px"}}>
        <input
            onChange={mFileSelected}
            type="file"/>
        <button 
            type='button' 
            onClick={mUpdateImage}
            >Upload Image</button>
       
    </div>
  )
}

export default Images






















/* 
 <button 
    type='button' 
    onClick={() => {xDispatch(getImage(1))}}
    >Get Image</button>
    
        
    <img src="https://aws-s3-jalz.s3.sa-east-1.amazonaws.com/uploads/ab768f54-7493-4c8b-b9fd-aaaf7ba71c07-1.png" alt="" />  */