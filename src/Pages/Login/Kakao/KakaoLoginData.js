// import { IP } from '../../../Hooks/Fetch';

export const REDIRECT_URI = 'http://localhost:3000/KakaoLogin';
export const REST_API_KEY = '5ff7b7a18b63ba62b62b81f7ea698a0a';

export const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;
