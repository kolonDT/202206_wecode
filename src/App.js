import './App.css';
import { Routes, BrowserRouter, Route } from 'react-router-dom';
import Header from './Components/Header';
import Footer from './Components/Footer';

function App() {
  return (
  <>
  <Header/>
  <BrowserRouter>
    <Routes>
      {/* <Route path='/' element={}/>
      <Route path='/' element={}/>
      <Route path='/sellcar' element={}/>
      <Route path='/confirm' element={}/>
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
