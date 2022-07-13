import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';

const GlobalStyle = createGlobalStyle`
  ${reset}
  
  * {
  box-sizing: border-box;
  -ms-overflow-style: none;
  ::-webkit-scrollbar {
  display: none;
    }
  }
  
  body{
    font-family: 'Spoqa Han Sans Neo', 'sans-serif';
  }  

  a {
  text-decoration: none;
  color: black;

  &:visited {
    text-decoration: none;
  }

  &:hover {
    text-decoration: none;
  }

  &:focus {
    text-decoration: none;
  }

  &:hover,
  &:active {
    text-decoration: none;
    }
  }

  `;

export default GlobalStyle;
