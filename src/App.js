import "./App.css";
import { Routes, BrowserRouter, Route } from "react-router-dom";
import Login from "./Pages/Login/Login";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        {/* <Route path='/' element={}/>
    <Route path='/sellcar' element={}/>
    <Route path='/confirm' element={}/>
    <Route path='/complete' element={}/>
    <Route path='/requestform' element={}/>
    <Route path='/admin' element={}/> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
