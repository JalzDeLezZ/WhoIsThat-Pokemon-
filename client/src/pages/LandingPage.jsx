import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import  './styles/LandingPage.scss'
const LandingPage = () => {

  const xNagigate = useNavigate()
  
  const [bLoading, setBLoading] = useState(false)

  const mRedirect = () => {
    setBLoading(true)
    setTimeout(() => {
      setBLoading(false)
      xNagigate('/home')
    }, 2000)
  }

  return (
    <div className='landingPAge'>
        <button
          className='btn_primary'
          onClick={mRedirect}
        />
        {
          bLoading ? <h1>Loading...</h1> : null
        } 
    </div>
  )
}

export default LandingPage





/* 

  let bLoading = "Loading..."
  const mRedirect = () => {
    bLoading = ""
  }

    <button onClick={() => {console.log(bLoading)}}> x </button> 

*/