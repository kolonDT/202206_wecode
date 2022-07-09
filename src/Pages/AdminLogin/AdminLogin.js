import React, { useEffect, useState } from 'react';
import AdminId from './AdminId';
import AdminPw from './AdminPw';
import styled from 'styled-components/macro';
import { useNavigate } from 'react-router-dom';
import { useRecoilState, useRecoilValue } from 'recoil';
import { setResponse, signInIdState, signInPwState } from '../Admin/adminAtoms';

const AdminLogin = () => {
  const inputId = useRecoilValue(signInIdState);
  const inputPw = useRecoilValue(signInPwState);
  const navigate = useNavigate();
  const [responseData, setResponseData] = useRecoilState(setResponse);
  const [newArray, setNewArray] = useState();

  // const goToAdmin = () => {
  //   navigate('/dealers/estimates');
  // };

  const goToAdmin = () => {
    navigate('/admin');
  };

  const signUp = e => {
    e.preventDefault();
    fetch('http://10.58.3.221:8000/dealers/login', {
      method: 'POST',
      body: JSON.stringify({ id: inputId, password: inputPw }),
    })
      .then(response => response.json())
      .then(response => {
        console.log(response);
        setNewArray(response);
        if (response.Message === 'SUCCESS') {
          goToAdmin();
        } else {
          alert('등록된 관리자가 아닙니다.');
        }
      });
  };

  console.log(`데이터 제발 ${responseData}`);

  return (
    <SignInContainer>
      <AdminId />
      <AdminPw />
      <SignIn
        type="button"
        onClick={e => {
          signUp(e);
        }}
      >
        SIGN IN
      </SignIn>
    </SignInContainer>
  );
};

const SignInContainer = styled.div`
  ${props => props.theme.flex.flexBox('column', 'center', 'center')};
  margin: 0;
`;

const SignIn = styled.button`
  width: 300px;
  height: 40px;
  border-style: none;
  border: 2px solid #28c6de;
  border-radius: 5px;
  background-color: transparent;
  &:hover {
    cursor: pointer;
    background-color: #28c6de;
    color: white;
  }
`;

export default AdminLogin;
