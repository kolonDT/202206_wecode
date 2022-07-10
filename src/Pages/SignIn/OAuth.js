const KAKAO_URI = 'http://localhost:3000/oauth/callback/kakao';
export const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.REACT_APP_KAKAO_ID}&redirect_uri=${KAKAO_URI}&response_type=code`;
