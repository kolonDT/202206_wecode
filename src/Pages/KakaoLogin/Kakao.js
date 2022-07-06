// import React, { useEffect } from 'react';
// import { useNavigate, useLocation } from 'react-router-dom';
// import { API } from '../../config';

// function Kakao() {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const KAKAO_CODE = location.search.split('=')[1];

//   useEffect(() => {
//     fetch(`${API.KAKAO_LOGIN}?code=${KAKAO_CODE}`, {
//       method: 'GET',
//     })
//       .then(res => res.json())
//       .then(data => {
//         localStorage.setItem('token', data.token);
//         navigate('/');
//       });
//   }, [KAKAO_CODE, navigate]);

//   return <div>kakao</div>;
// }

// export default Kakao;
