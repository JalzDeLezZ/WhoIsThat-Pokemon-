import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
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
    <form onSubmit={mSearch}>
        <label htmlFor="">Search Dog</label>
        <input 
          type="text"
          placeholder='Search'
          value={crntSarch}
          onChange={(e) => setSearch(e.target.value)}
          onKeyUp = {(e) => {e.key === 'Enter' && mSearch(e)}}/>
        <button type='submit'>S</button>

        <button type= 'button' onClick = {mReload}>Reload</button>
    </form>
  )
}

export default Search