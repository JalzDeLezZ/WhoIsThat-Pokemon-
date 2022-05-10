import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Styles from './styles/LandingPage.module.scss'
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
    <div className={Styles.landingPAge}>
        <h1>WELCOME TO MY LANDING PAGE</h1>
        <button
          onClick={mRedirect}
        > HOME</button>
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