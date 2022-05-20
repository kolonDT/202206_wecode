// modules
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

//styles
import styled from "styled-components";

function Login() {
  const navigate = useNavigate();
  const [id, setId] = useState("");
  const [isLogin, setLogin] = useState(false);

  const handleInput = (e) => {
    let ret = isValidId(e.target.value);
    setLogin(ret);
    setId(e.target.value);
  };

  const handleLogin = (str) => {
    if (isValidId(str) === "" || isValidId(str)) {
      return alert("차량번호를 다시 확인해주세요.");
    }
    navigate("/login");
  };

  const handleWrite = () => {
    navigate("/sellcar");
  };

  function isValidId(str) {
    const regId = /\d{2,3}[가-힣]{1}\d{4}/g;
    let ret = regId.test(str);
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
          placeholder="12가3456"
          required
        />
        <LoginButton
          disabled={!isLogin}
          onClick={(e) => {
            handleLogin(e.target.value);
          }}
        >
          등록하기
        </LoginButton>
        <LoginNone onClick={handleWrite}>
          이미 작성중인 견적서가 있으신가요?
        </LoginNone>
      </LoginWrap>
    </LoginBox>
  );
}

export default Login;

const LoginBox = styled.div`
  @media only screen and (max-width: 640px) {
    width: 100%;
    margin: 30px auto;
  }
  margin: 30px auto;
  width: 640px;
  padding: 10px 0px;
`;

const LoginWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const LoginTitle = styled.p`
  color: #5c1049;
  margin-bottom: 10px;
  font-weight: 600;
  font-size: 35px;
`;

const LoginSubTitle = styled.p`
  font-size: 30px;
  font-weight: 500;
  margin-bottom: 40px;
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
  border: 1px solid #adadad;
  cursor: pointer;
  font-size: 14px;
  font-weight: 600;
  color: white;
  background-color: #5c1049;
  box-shadow: 3px 3px 5px #d8d8d8;
  &:disabled {
    opacity: 0.5;
    background-color: #5c1049;
  }
`;

const LoginNone = styled.span`
  display: block;
  margin-top: 100px;
  cursor: pointer;
  color: #ababab;
`;
