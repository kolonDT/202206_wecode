import "./App.css";
import { Routes, BrowserRouter, Route } from "react-router-dom";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import Login from "./Pages/Login/Login";
import LoginMain from "./Pages/Login/LoginMain";
import CompleteForm from "./Pages/Complete/CompleteForm";
import RequestForm from "./Pages/Requestform/RequestForm";
import Reconfirm from "./Pages/Sellcar/Reconfirm";
import SellCar from "./Pages/Sellcar/Sellcar";
import Reconfirm from "./Pages/Sellcar/Reconfirm";
function App() {
  return (
    <>
      <Header />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<LoginMain />} />
          <Route path="/complete" element={<CompleteForm />} />
          <Route path="/requestform" element={<RequestForm />} />
          <Route path="/reconfirm" element={<Reconfirm />} />
          <Route path="/sellcar" element={<SellCar />} />
          {/* <Route path='/' element={}/>
              <Route path='/' element={}/>
              <Route path='/confirm' element={}/>
              <Route path='/requestform' element={}/>
              <Route path='/admin' element={}/> */}
        </Routes>
      </BrowserRouter>
      <Footer />
    </>
  );
}

export default App;
