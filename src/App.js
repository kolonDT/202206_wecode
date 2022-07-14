import React, { useState } from 'react';
import { Routes, BrowserRouter, Route } from 'react-router-dom';
import { RecoilRoot, useRecoilState } from 'recoil';
import Header from './Components/Header';
import Footer from './Components/Footer';
import Login from './Pages/Login/Login';
import Complete from './Pages/Estimate/Complete';
import Estimate from './Pages/Estimate/Estimate';
import MyState from './Pages/MyPage/MyState';
import SignIn from './Pages/SignIn/SignIn';
import KakaoRedirect from './Pages/Login/Kakao/KakaoRedirect';
import AdminLogin from './Pages/AdminLogin/AdminLogin';
import Admin from './Pages/Admin/Admin';

function App() {
  const [isNew, setNew] = useState(-1);
  const [page, setPage] = useState('default');

  return (
    <BrowserRouter>
      <RecoilRoot>
        <Header isNew={isNew} setNew={setNew} page={page} />
        <Routes>
          <Route path="/" element={<Login setPage={setPage} />} />
          <Route
            path="/complete"
            element={
              <Complete isNew={isNew} setNew={setNew} setPage={setPage} />
            }
          />
          <Route path="/join" element={<SignIn />} />
          <Route path="/KakaoLogin" element={<KakaoRedirect />} />
          <Route path="/sellcar" element={<Estimate />} />
          <Route path="/estimate" element={<MyState />} />
          (
          <Route
            path="/dealers/estimates"
            element={<Admin isNew={isNew} setNew={setNew} setPage={setPage} />}
          />
          ) (
          <Route
            path="/dealers/login"
            element={
              <AdminLogin isNew={isNew} setNew={setNew} setPage={setPage} />
            }
          />
          )
        </Routes>
        <Footer page={page} />
      </RecoilRoot>
    </BrowserRouter>
  );
}

export default App;
