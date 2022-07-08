import React from 'react';
import styled, { css } from 'styled-components/macro';
import { useRecoilState } from 'recoil';
import { signInPwState } from '../Admin/adminAtoms';

const AdminPw = () => {
  const [inputPw, setInputPw] = useRecoilState(signInPwState);
  const handleInputPw = e => {
    setInputPw(e.target.value);
  };

  return (
    <div>
      <Password
        type="password"
        placeholder="비밀번호를 입력해주세요"
        onChange={handleInputPw}
      />
    </div>
  );
};
const Password = styled.input`
  margin-bottom: 20px;
  width: 300px;
  height: 50px;
`;

export default AdminPw;
