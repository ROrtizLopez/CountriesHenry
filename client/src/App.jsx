/* Style */
import './App.css'

/* Components to render */
import Nav from './components/nav/Nav';
import Home from './components/home/Home';
import LandingPage from './components/landingPage/LandingPage';
import Detail from './components/detail/Detail';
import Form from './components/form/Form';

/* Dependencies */
import { Routes, Route, useLocation } from 'react-router-dom';

function App() {

  const { pathname } = useLocation();

  return (
    <div>
       { pathname !== '/' && <Nav  />}
      <Routes>        
        <Route path='/' element={ <LandingPage  /> }  />
        <Route path='/home' element={ <Home  /> }  />
        <Route path='/country/:id' element={ <Detail  /> }  />
        <Route path='/activity' element={ <Form  /> }  />
      </Routes>
    </div>
  )
}

export default App;
