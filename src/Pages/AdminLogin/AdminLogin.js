import React from 'react';
import AdminId from './AdminId';
import AdminPw from './AdminPw';
import styled from 'styled-components/macro';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { signInIdState, signInPwState } from '../Admin/adminAtoms';

const AdminLogin = () => {
  const inputId = useRecoilValue(signInIdState);
  const inputPw = useRecoilValue(signInPwState);
  const navigate = useNavigate();

  const goToAdmin = () => {
    navigate('/dealers/estimates');
  };

  const userToken = localStorage.getItem('token'); //토큰값 가져옴
  console.log(`토큰 머 들고오노 함 보자 ${userToken}`);

  const signUp = e => {
    e.preventDefault();
    fetch('http://10.133.4.172:8000/dealers/login', {
      method: 'POST',
      body: JSON.stringify({ id: inputId, password: inputPw }),
    })
      .then(response => response.json())
      .then(response => {
        if (response.Message === 'SUCCESS') {
          goToAdmin();
        } else {
          alert('등록된 관리자가 아닙니다.');
        }
      });
  };

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
  width: 200px;
  height: 30px;
  border-style: none;
  background-color: #28c6de;
  &:hover {
    cursor: pointer;
    background-color: #2a808d;
  }
`;

export default AdminLogin;
