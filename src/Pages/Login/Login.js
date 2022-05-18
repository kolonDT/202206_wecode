// modules
import React, { useState } from "react";

//styles
import styled from "styled-components";

function Login() {
  const [id, setId] = useState("");
  const [isLogin, setLogin] = useState(false);
  const handleInput = (e) => {
    let ret = isValidId(e.target.value);
    setLogin(ret);
    setId(console.log(e.target.value));
  };

  const handleLogin = () => {
    // console.log("handleLogin");
  };

  const handleWrite = () => {};

  function isValidId(str) {
    const regId = /\d{2}[가-힣]{1}\d{4}/g;
    let ret = regId.test(str);
    console.log("TESR2", ret);
    return ret;
  }
  return (
    <LoginBox>
      <LoginWrap>
        <LoginTitle>바로지금,</LoginTitle>
        <LoginSubTitle>똑똑하게 내 차를 파는 가장 빠른시간</LoginSubTitle>
        <LoginInput
          onChange={handleInput}
          type="text"
          id="id"
          name="id"
          placeholder="12가 3456"
          required
        />
        <LoginButton disabled={!isLogin} onClick={handleLogin}>
          등록하기
        </LoginButton>
      </LoginWrap>
      <LoginNone onClick={handleWrite}>작성하신 견적서가 있으신가요?</LoginNone>
    </LoginBox>
  );
}

export default Login;

const LoginBox = styled.div`
  /* @media only screen and (max-width: 640px) {
    width: 100%;
    height: 100%;
  } */
  margin: auto;
  width: 640px;
  padding: 20px 0px;
  border: 1px solid gray;
`;

const LoginWrap = styled.div`
  @media only screen and (max-width: 640px) {
    width: 90%;
    margin: 0px auto;
    /* justify-content: center; */
  }
  margin: 50px 0px 100px 0px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const LoginTitle = styled.p`
  color: #5c1049;
  padding-right: 55%;
  margin-bottom: 10px;
  font-weight: 600;
  font-size: 35px;
`;

const LoginSubTitle = styled.p`
  font-size: 30px;
  font-weight: 500;
  margin-bottom: 30px;
`;

const LoginInput = styled.input`
  width: 450px;
  padding: 20px;
  border: 1px solid gray;
  border-radius: 5px;
  ::placeholder {
    word-spacing: 2px;
    font-size: 18px;
  }
`;

const LoginButton = styled.button`
  width: 180px;
  margin: 20px 0px 0px 310px;
  padding: 12px 15px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 600;
  color: white;
  background-color: #5c1049;
  &:disabled {
    opacity: 0.5;
    background-color: #5c1049;
  }
`;

const LoginNone = styled.span`
  margin: 50px 0px 0px 75px;
  cursor: pointer;
  color: #ababab;
`;
