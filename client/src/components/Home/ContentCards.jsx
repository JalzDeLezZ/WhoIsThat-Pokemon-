import React, { useState } from 'react'
import Tags from './Tags'
import './ComponentHome.scss'
import { useSelector } from 'react-redux'
import styled from 'styled-components'

const ContentCards = () => {

  const {
    rdcr_aCustomPokemons, 
    rdcr_bLoading
  } = useSelector(state => state)
  
  const vCardsPerPage = 3;
  const [crntPage, setPage] = useState(1);

  const vFinalPage = crntPage * vCardsPerPage;
  const vInitialPage = vFinalPage - vCardsPerPage;

  const vPieceOfCards = 
    (rdcr_aCustomPokemons.length > 3) ? 
    rdcr_aCustomPokemons.slice(vInitialPage, vFinalPage) 
    : rdcr_aCustomPokemons ;

  const mIterantPage = (pNumberClick) => {
    setPage(pNumberClick);
  }

  const aNumbersPerPage = [];
  const vAllData = rdcr_aCustomPokemons.length;
  const pageCount = Math.ceil(vAllData / vCardsPerPage)
  for (let i = 1; i <= pageCount; i++) {
    aNumbersPerPage.push(i);    
  }

  
  const mPrevious = () => {
    crntPage > 1 ? setPage(crntPage - 1) : setPage(pageCount);
  }
  const mChangeNext = () => {
    crntPage < pageCount ? setPage(crntPage + 1) : setPage(1);
  }


  return (
    <section>

      {
        rdcr_bLoading ? 
        <h3> Loading... </h3> : null
      }
      {
        !rdcr_bLoading &&
        <div>
          <section className='Home-cBodyTag'>
          {
            (vPieceOfCards.length > 0) ?
            vPieceOfCards.map((pI,i) => {
              return (
                <Tags
                  key={`${pI.pok_id}`+i} 
                  pId= {pI.pok_id}
                  name = {pI.pok_name}
                  image = { pI.pok_image }
                  pTypes = {pI.Types}
                />
              )
            }) : <h1>There isn't data</h1>
          }
          </section>

          <MyOl>
            <li onClick={mPrevious}>{"<"}</li>
            {
              aNumbersPerPage.map(pI => (
              <li
                key={pI} 
                onClick={() => {mIterantPage(pI)}} 
                className={(crntPage === pI) ? 'active' : ''}
                >{pI}</li>
              ))
            }
            <li onClick={mChangeNext}>{">"}</li>
          </MyOl>
        </div>
     }
    </section>
  )
}

export default ContentCards

const MyOl = styled.ol`
  display: inline-flex;
  flex-flow: row wrap;
  list-style: none;
  justify-content: center;
  border: 2px solid white;
  padding: 10px;
  border-radius: 30px;
  align-items: center;
  justify-content: center;
  li{
    margin: 3px 6px;
    cursor: pointer;
    font-weight: bolder;
    font-size: 1.6rem;
    height: 30px;
    width: 30px;
    &.active{
      color: #fff;
      background-color: black;
      border-radius: 50%;
      padding: 5px;
      font-weight: bold;
    }
  }
`


/* 


  const xDispatch_action = useDispatch();

  const mReloadLoading = () => {
    xDispatch_action(ReloadLoading());
  }

      <button onClick={mReloadLoading}>RELOAD LOADING</button>

*/


 