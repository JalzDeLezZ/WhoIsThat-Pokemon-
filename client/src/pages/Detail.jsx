import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getPokemonById } from '../redux/action';

const Detail = () => {

  const {identifier} = useParams();
  const xDispatch = useDispatch();
  useEffect(() => {
    xDispatch(getPokemonById(identifier));
  }, [xDispatch, identifier])

  const {rdcr_oPkm}= useSelector(state => state);

  return (

    <div>
      <h1>Detail</h1>
      <p>
        {identifier}
        <br/>
        {
          JSON.stringify(rdcr_oPkm)
        }
      </p>

    </div>
  )
}

export default Detail