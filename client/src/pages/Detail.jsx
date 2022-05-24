import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { getPokemonById } from '../redux/action';

const Detail = () => {

  const {identifier} = useParams();
  const xDispatch = useDispatch();
  useEffect(() => {
    xDispatch(getPokemonById(identifier));
  }, [xDispatch, identifier])

  const {rdcr_oPkm : aTemp }= useSelector(state => state);

  let rdcr_oPkm = aTemp;

  if(rdcr_oPkm.hasOwnProperty('stats')){
    if (rdcr_oPkm.Types?.length > 0) {
      let aTypes = rdcr_oPkm.Types.map(pI =>  {return {typ_name: pI}} )
      rdcr_oPkm = {...rdcr_oPkm, Types: aTypes}
      rdcr_oPkm = {
        ...rdcr_oPkm,
        pok_attack: rdcr_oPkm.stats[0].base,
        pok_defense: rdcr_oPkm.stats[1].base,
        pok_speed: rdcr_oPkm.stats[2].base,
        pok_life: rdcr_oPkm.stats[3].base
      }
      delete rdcr_oPkm.stats;
    }
  }
  
  //upercase the first letter of the name
  rdcr_oPkm.pok_name = (rdcr_oPkm.pok_name) && rdcr_oPkm.pok_name.charAt(0).toUpperCase() + rdcr_oPkm.pok_name.slice(1);
  return (

    <MySection>
      <div> 
        <h3>Detail</h3>
        <article>
          <h1>{(rdcr_oPkm.pok_name)}</h1>
          <ol>
            <h3>Types: </h3>
            {
              rdcr_oPkm.Types?.map((element, index) => <li key={index}>{element.typ_name}</li>)
            }
          </ol>
          <figure>
            <img src={rdcr_oPkm.pok_image} alt=""/>
          </figure>
          <ul>
            <li><h4>Attack:</h4><b>{rdcr_oPkm.pok_attack}</b></li>
            <li><h4>Defense:</h4><b>{rdcr_oPkm.pok_defense}</b></li>
            <li><h4>Height:</h4><b>{rdcr_oPkm.pok_height}</b></li>
            <li><h4>Life:</h4><b>{rdcr_oPkm.pok_life}</b></li>
            <li><h4>Speed:</h4><b>{rdcr_oPkm.pok_speed}</b></li>
            <li><h4>Weight:</h4><b>{rdcr_oPkm.pok_weight}</b></li>
          </ul>
        </article>  
      </div>
    </MySection>
  )
}

export default Detail

const MySection = styled.section`
  height: 90vh;
  display: flex;
  align-items: center;
  justify-content: center;
  div{
    flex-direction: column;
    border: 2px solid white;
    padding: 30px;
    border-radius: 20px;
  }
  h1{
    font-size: 2.5rem;
  }
  article{
    display: grid;
    figure{
      display: flex;
      align-items: center;
      justify-content: center;
      overflow: hidden;
      height: 30vh;        
      img{
        height: 100%;
        filter: drop-shadow(0 3px 9px rgba(0, 0, 0, 0.7));
      }
    }
    ul, ol{
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      li{
        display: flex;
        align-items: center;
        justify-content: center;
        h4{
          font-size: 1.5rem;
          font-style: oblique;
          margin-right: 6px;
        }
        b{
          font-size: 1.5rem;
        }
      }
    }
    ol{
      margin-top: 10px;
      background-color: #000000b9;
      flex-direction: row;
      li{
        margin: 10px;
      }
    }
  }
`