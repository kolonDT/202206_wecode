import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useLocation, useNavigate } from 'react-router-dom';
import { IP } from '../../../config';

const KakaoRedirect = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const code = location.search;

  useEffect(() => {
    fetch(`${IP}cars/kakao/callback${code}`)
      .then(res => res.json())
      .then(data => {
        if (data.message === 'SUCCESS') {
          localStorage.setItem('kakao_id', data.kakao_id);
          navigate('/join');
        }
      });
  }, []);

  return (
    <RedirectBody>
      <h1>Loading...</h1>
      <Spinner />
    </RedirectBody>
  );
};

export default KakaoRedirect;

const RedirectBody = styled.div`
  ${theme => theme.theme.flex.flexBox}
  height: 76vh;
  background-color: aliceblue;

  h1 {
    animation: blink-effect 2s linear infinite;
    color: ${({ theme }) => theme.colors.primaryBlue};

    @keyframes blink-effect {
      50% {
        opacity: 0;
      }
    }
  }
`;

const Spinner = styled.div`
  position: absolute;
  width: 12rem;
  height: 12rem;
  color: ${({ theme }) => theme.colors.primaryBlue};
  border-radius: 50%;
  border-top: 5px solid ${({ theme }) => theme.colors.primaryBlue};
  animation: spin 2s linear infinite;
  opacity: 10%;

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;
