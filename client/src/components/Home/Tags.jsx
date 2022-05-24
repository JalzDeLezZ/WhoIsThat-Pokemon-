import React from 'react'
import styled from 'styled-components'
import {useNavigate} from 'react-router-dom'

const Tags = (props) => {
  const { name, image, pTypes, pId } = props
  const xNavigation = useNavigate()
  const mShowDetails = () => {
    // console.log('Show Details', pId)
    xNavigation(`/detail/${pId}`)
  }

  return (
    <MyArticle>
      <h3>{name}</h3>
      <figure>
        <img src={image} alt="dog" />
      </figure>
      <ol>
        {
          pTypes?.map((pI, i) => {
            return <li key={i}>{(pI.typ_name) ? pI.typ_name : pI}</li>
          })
        }
      </ol>
      <button 
        className='btn-show-details'
        onClick={mShowDetails}
      >Details</button>
    </MyArticle>
  )
}

export default Tags

const MyArticle = styled.article`
  width: 100%;
  height: 30vh;
  border-radius: 10px;
  border: 2px solid white;
  padding: 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  backdrop-filter: blur(3px);
  h3{
    font-size: 1.5rem;
  }
  figure {
    width: 160px;
    height: 160px;
    /* display: grid;
    place-items: center; */
    overflow: hidden;
    display: flex;
    align-content: center;
    justify-content: center;
    margin: 9px 0;
    img{
      height: 100%;
      filter: drop-shadow(0 3px 19px rgba(0, 0, 0, 0.7));
    }
  }
  ol{
    display: flex;
    flex-flow: row wrap;
    list-style: none;
    justify-content: center;
    li{
      margin: 3px 6px;
      border: 1px solid white;
      padding: 3px 9px;
      border-radius: 7px;
      font-weight: bolder;
    }
  }
  .btn-show-details{
    background-color: transparent;
    color: white;
    font-weight: bold;
    cursor: pointer;
    margin-top: 10px;
    border: none;
    font-size: 1.4rem;
    border-bottom: 2px solid white;
  }
`