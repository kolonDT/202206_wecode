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

  function isValidId(str) {
    const regId = /\d{2}[가-힣]{1}\d{4}/g;
    let ret = regId.test(str);
    console.log("TESR2", ret);
    return ret;
  }
  return (
    <LoginBox>
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
        견적확인
      </LoginButton>
    </LoginBox>
  );
}

export default Login;

const LoginBox = styled.div`
  width: 640px;
  margin: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 120px 5px 250px 5px;
  border: 1px solid gray;
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
