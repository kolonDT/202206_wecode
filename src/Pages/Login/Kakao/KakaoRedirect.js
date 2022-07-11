import React from 'react';
// import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useLocation } from 'react-router-dom';
import { REST_API_KEY, REDIRECT_URI } from './KakaoLoginData';
import axios from 'axios';

const KakaoRedirect = () => {
  const location = useLocation();
  // const navigate = useNavigate();
  // const code = new URL(window.location.href).searchParams.get('code');
  // const KAKAO_CODE = location.search;

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
        console.log('requestToken:', data);
      })
      .catch(err => {
        console.error('requestToken:', err);
      });
  }

  // useEffect(() => {
  //   const body = {
  //     grant_type: 'authorization_code',
  //     client_id: process.env.REACT_APP_REST_API_KEY,
  //     redirect_uri: REDIRECT_URI,
  //     code: KAKAO_CODE,
  //   };

  //   const queryStringBody = Object.keys(body)
  //     .map(k => encodeURIComponent(k) + '=' + encodeURI(body[k]))
  //     .join('&');

  //   fetch('https://kauth.kakao.com/oauth/token', {
  //     method: 'POST',
  //     headers: {
  //       'Content-type': 'application/x-www-form-urlencoded;charset=utf-8',
  //     },
  //     body: queryStringBody,
  //   })
  //     .then(res => res.json())
  //     .then(data => {
  //       if (data.access_token) {
  //         localStorage.setItem('token', data.access_token);
  //         navigate('/join');
  //       } else {
  //         navigate('/');
  //       }
  //     });

  // fetch(`${IP}cars/kakao/callback${KAKAO_CODE}`, {
  //   method: 'POST',
  //   headers: {
  //     Authorization: code,
  //   },
  // })
  //   .then(res => res.json())
  //   .then(data => {
  //     console.log(data);
  //     navigate('/join');
  //   });
  // }, []);

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
