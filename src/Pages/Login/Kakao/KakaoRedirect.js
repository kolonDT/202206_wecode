import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useLocation } from 'react-router-dom';
import { REST_API_KEY, REDIRECT_URI } from './KakaoLoginData';
import axios from 'axios';
import { IP } from '../../../Hooks/Fetch';

const KakaoRedirect = () => {
  const location = useLocation();

  const code = location.search.split('?code=')[1];
  const requestToken = code => {
    const makeFormData = params => {
      const searchParams = new URLSearchParams();
      Object.keys(params).forEach(key => {
        searchParams.append(key, params[key]);
      });

      return searchParams;
    };

    return axios({
      method: 'POST',
      headers: {
        'content-type': 'application/x-www-form-urlencoded;charset=utf-8',
      },
      url: 'https://kauth.kakao.com/oauth/token',
      data: makeFormData({
        grant_type: 'authorization_code',
        client_id: REST_API_KEY,
        redirect_uri: REDIRECT_URI,
        code,
      }),
    });
  };

  if (code !== undefined) {
    requestToken(code)
      .then(({ data }) => {
        localStorage.setItem('access_token', data.access_token);
      })
      .catch(err => {
        console.error('requestToken:', err);
      });
  }

  const sendKakaoToken = () => {
    fetch(`http://10.133.5.51:8000/cars/kakao/callback`, {
      method: 'GET',
      headers: {
        access_token: localStorage.getItem('access_token'),
      },
    })
      .then(res => res.json())
      .then(data => {
        console.log(data);
        console.log('test');
        console.log(localStorage.getItem('access_token'));
      });
  };

  useEffect(() => {
    if (localStorage.getItem('access_token') !== '') {
      sendKakaoToken();
    }
    console.log('access_token', localStorage.getItem('access_token'));
  }, []);

  // console.log('code', code);
  // console.log('token', localStorage.getItem('access_token'));

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

  h1 {
    animation: blink-effect 2s linear infinite;

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
  border: 8px solid lightgray;
  border-radius: 50%;
  border-top: 10px solid white;
  animation: spin 2s linear infinite;

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;
