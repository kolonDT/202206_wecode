import React from 'react';
import styled from 'styled-components/macro';
import { useRecoilState } from 'recoil';
import { signInIdState } from '../Admin/adminAtoms';

const AdminId = () => {
  const [inputId, setInpuId] = useRecoilState(signInIdState);
  const handleInputId = e => {
    setInpuId(e.target.value);
  };

  return (
    <div>
      <Login type="text" placeholder="emial 입력" onChange={handleInputId} />
    </div>
  );
};

const Login = styled.input`
  margin-bottom: 20px;
  width: 300px;
  height: 50px;
`;

export default AdminId;
