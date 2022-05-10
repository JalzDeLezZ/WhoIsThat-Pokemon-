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
      <figure>
        <img src={image} alt="dog" />
      </figure>
      <h3>{name}</h3>
      <ol>
        {
          pTypes?.map((pI, i) => {
            return <li key={i}>{(pI.typ_name) ? pI.typ_name : pI}</li>
          })
        }
      </ol>
      <button onClick={mShowDetails}>Details</button>
    </MyArticle>
  )
}

export default Tags

const MyArticle = styled.article`
  width: 100%;
  height: 30vh;
  background-color: #413737;
  border-radius: 10px;
  padding: 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  figure {
    width: 70%;
    height: 60%;
    border: 1px solid white;
    img{
      width: 100%;
    }
  }
  ol{
    display: flex;
    flex-flow: row wrap;
    list-style: none;
    justify-content: center;
    li{
      margin: 3px 6px;
    }
  }
`