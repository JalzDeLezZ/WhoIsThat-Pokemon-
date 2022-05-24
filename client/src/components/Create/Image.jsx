import axios from 'axios';
import React, { useRef, useState } from 'react'
import { useDispatch } from 'react-redux';
import { uploadImage } from '../../redux/action';

async function DisplayImage(oImage) {
    const {data} = await axios.post(`http://localhost:3001/images/display`, oImage, { headers: {'Content-Type': 'multipart/form-data'}});
    return data;
}

const Image = ({ pSetState}) => {

    const xDispatch = useDispatch();
    const InputValue = useRef();

    const [dirImg, setdirImg] = useState('');

    const mFileSelected = async (e) => {

        const oImg = e.target.files[0];
        pSetState(oImg);
        const res = await DisplayImage({myFile: oImg});
        setdirImg(res.routeImage);
        InputValue.current.value = '';

    }


  return (
    <div className='component-image'>
        <input //multiple
            ref={InputValue}
            accept= "image/*"
            onChange={mFileSelected}
            type="file"/>
        <figure>
            <img src={`http://localhost:3001/${dirImg}`} alt=""/>
        </figure>
    </div>
  )
}

export default Image





/*  THIS CODE IS SERVED = upload image


    const mUpload = async () => {
        
        if (pState){
            const xFormData = new FormData();
            xFormData.append('myFile', pState);
            pSetUrlImg = await xDispatch(uploadImage(xFormData));
        } else {
            alert('Please select an image');
        }
    }

    <button
        type='button' 
        onClick={mUpload}
    >Upload</button>
*/






/* 
    const mDisplayImages = () => {
        const xFormData = new FormData();
        xFormData.append('myFile', crntFile);
        console.log("DISPLAY IMAGE");
        // xDispatch(displayImage(xFormData))
    }

           <button 
            type='button' 
            onClick={mDisplayImages}
            >Upload Image</button>
*/













/* 
 <button 
    type='button' 
    onClick={() => {xDispatch(getImage(1))}}
    >Get Image</button>
    
        
    <img src="https://aws-s3-jalz.s3.sa-east-1.amazonaws.com/uploads/ab768f54-7493-4c8b-b9fd-aaaf7ba71c07-1.png" alt="" />  */



    /*  COSAS RARAS DE GITHUB COPILOT
     console.log(crntFile);
        const oReader = new FileReader();
        oReader.readAsDataURL(crntFile);
        oReader.onload = (e) => {
            console.log(e.target.result);
            xDispatch(displayImage(e.target.result));
        }

        // xDispatch(displayImage(crntFile));
        // if(crntFile){
        //     return <img src={URL.createObjectURL(crntFile)} alt=""/>
        // }
    */