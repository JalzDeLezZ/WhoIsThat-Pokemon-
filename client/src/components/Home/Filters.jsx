import React, { useState } from 'react'
import styled from 'styled-components'
import { useDispatch, useSelector } from 'react-redux'
import {FilterPokemons, OrderPokemons} from '../../redux/action'

const Filters = () => {
 
  const xDispatch = useDispatch();
  const {rdcr_aTypes} = useSelector(state => state);

/**
 * @description: THIS IS THE FILTER BY SOURCE OF POKEMON UNION OF TYPES
 */
  const [types, setTypes] = useState('OP_NULL');
  const [dbOrApi, setDbOrApi] = useState('OP_NULL');

  const mFilter_DBorApi = (e) =>{
    const {value} = e.target;
    setDbOrApi(value);
    xDispatch(FilterPokemons(value, types));
  }
  const mFilter_Type = (e) =>{
    const {value} = e.target;
    setTypes(value);
    xDispatch(FilterPokemons(dbOrApi,value));
  }

  /**
    * @description: THIS IS THE ORDER BY POKEMON NAME AND ATTACK TO ASC OR DESC
  */
  const [order, setOrder] = useState('ORD_NULL');
  const [ascOrDesc, setAscOrDesc] = useState('OP_NULL');
  const mOrder = (e) =>{
    const {value} = e.target;
    xDispatch(OrderPokemons(value, ascOrDesc));
    setOrder(value);
  }
  const mAscOrDesc = (e) =>{
    const {value} = e.target;
    xDispatch(OrderPokemons(order, value));
    setAscOrDesc(value);
  }
  //================================================================
  
  return (
    <MyDiv>
      <h3>FILTERS BY:</h3>

      <select 
        onChange={mFilter_Type}
        >
        <option key='nullOne' value="OP_NULL">Show By Types</option>
        {
          rdcr_aTypes.map(pI => {
            return <option key={pI.id} value={pI.typ_name}>{pI.typ_name}</option>
          })
        }
      </select>

      <select 
        onChange={mFilter_DBorApi}
        >
        <option value="OP_NULL">Filter by DB or Api</option>
        <option value="OP_DB">Show By DB</option>
        <option value="OP_API">Show By Api</option>
      </select>
      <div className='filter-alph-attck'>
        <select
          onChange={mOrder}
          >
          <option value="ORD_NULL">Filter By</option>
          <option value="ORD_ALPH">Alphabet</option>
          <option value="ORD_ATCK">Attack</option>
        </select>
        
        <div>
          <label htmlFor="iasc">ASC</label>
          <input
            name='order'
            type="radio"
            id='iasc'
            value="ORD_ASC"
            onClick={mAscOrDesc}
            />
        </div>

        <div>
          <label htmlFor="idsc">DSC</label>
          <input
            name='order'
            type="radio"
            id='idsc'
            value="ORD_DSC"
            onClick={mAscOrDesc}
            />
        </div>
      </div>
      
    </MyDiv>
  )
}

export default Filters


const MyDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  h3{
    font-size: 1.5rem;
    font-style: oblique;
  }
  select{
    background-color: transparent;
    outline: none;
    border: none;
    border-bottom: 2px solid white;
    color: aliceblue;
    font-weight: bold;
    option{
      color: aliceblue;
      background-color: black;
    }
    ::-webkit-scrollbar-thumb{  
      border-radius: 10px;
      background-color: rgba(0, 217, 255, 0.443);
    }
    ::-webkit-scrollbar-track {
      border-radius: 10px;
      background-color: rgba(255, 255, 255, 0.83);
    }
    ::-webkit-scrollbar {
        width: 9px;
    }
  }
`