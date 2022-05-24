import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import {getPokemonByName, reloadPokemons} from '../../redux/action';

const Search = () => {

  const xDispatch = useDispatch();

  const [crntSarch, setSearch] = useState('');

  const mSearch = (e) => {
      e.preventDefault();
      
      xDispatch(getPokemonByName(crntSarch))
      .then(()=> {setSearch('')});

      console.log('Search')
  }

  const mReload = (e) => {
    e.preventDefault();
    xDispatch(reloadPokemons());
  }
  return (
    <MyForm onSubmit={mSearch}>
        <label htmlFor="">Search Pokemon</label>
        <input 
          type="text"
          placeholder='Search by ID or Name'
          value={crntSarch}
          onChange={(e) => setSearch(e.target.value)}
          onKeyUp = {(e) => {e.key === 'Enter' && mSearch(e)}}/>
        <button type='submit'>Search</button>

        <button type= 'button' onClick = {mReload}>Reload</button>
    </MyForm>
  )
}

export default Search

const MyForm = styled.form`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
  width: 90vw;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-shadow: 0 0 5px #ccc;
  label{
    margin-right: 10px;
    font-size: 1.2rem;
  }
  input {
    width: 100%;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    box-shadow: 0 0 5px #ccc;
    margin: 5px 0;
  }
  button {
    width: 30%;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    box-shadow: 0 0 5px #ccc;
    margin: 5px 0;
    &:hover {
      background: black;
      color: white;
    }
  }
`