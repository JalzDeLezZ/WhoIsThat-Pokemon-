import React from 'react'
import { Link } from 'react-router-dom'
import Styles from './Navigator.module.scss'

const Navigator = () => {
  return (
    <nav className={Styles.navigator}>
        <ol>
            <li><Link to='/'>Landing Page</Link> </li>
            <li><Link to='/home'>Home</Link> </li>
            <li><Link to='/create'>Create Pokemon</Link> </li>
        </ol>
    </nav>
  )
}

export default Navigator