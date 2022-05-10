import React, { useEffect }  from 'react'
import './styles/Home.scss'
import Search from '../components/Home/Search'
import Filters from '../components/Home/Filters'

import { useDispatch } from 'react-redux'
import ContentCards from '../components/Home/ContentCards'

import { getAllPokemons, getAllTypes, ReloadLoading } from '../redux/action'

const Home = () => {

  const xDispatch_action = useDispatch();
  
  useEffect( () => {
    xDispatch_action(getAllTypes());
    
    const mPokemons = async () => {
      await xDispatch_action(getAllPokemons());
      await xDispatch_action(ReloadLoading());
    };mPokemons();

  }, [xDispatch_action])

  return (
    <div className="Page-Home">
      <header className="Home-header">
        <Search/>
      </header>

      <main className="Home-main">
        <section className="main-sec_one">
          <Filters/>
        </section>

        <section className="main-sec_two">
          <ContentCards/>
        </section>
      </main>
    </div>
  )
}

export default Home