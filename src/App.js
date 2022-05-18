import './App.css';
import { Routes, BrowserRouter, Route } from 'react-router-dom';
import Sellcar from './Pages/Sellcar/Sellcar';
import Footer from './Components/Footer';
import Header from './Components/Header';

function App() {
  return (
    <>
  <Header/>
  <BrowserRouter>
    <Routes>
      {/* <Route path='/' element={}/> */}
      <Route path='/sellcar' element={<Sellcar/>}/>
      {/* <Route path='/confirm' element={}/>
      <Route path='/complete' element={}/>
      <Route path='/requestform' element={}/>
      <Route path='/admin' element={}/> */}
    </Routes>
  </BrowserRouter>
 <Footer/>
 </>
  );
}

export default App;
