import { Route, Routes } from 'react-router-dom';

import Navigator from './components/Navigator/Navigator.jsx';
import LandingPage from './pages/LandingPage.jsx';
import Home from './pages/Home.jsx';
import Detail from './pages/Detail.jsx';
import Create from './pages/Create.jsx';
import NotFound from './pages/NotFound.jsx';

function App() {
  return (<>
      
    <Navigator/>
    <Routes>
      <Route exact path='/detail/:identifier' element={<Detail/>} />
      <Route exact path="/create" element={<Create/>} />
      <Route exact path="/home" element={<Home/>} />
      <Route exact path="/" element={<LandingPage/>} />
      <Route path='*' element={<NotFound/>} />
    </Routes>
      
  </>);
}

export default App;
