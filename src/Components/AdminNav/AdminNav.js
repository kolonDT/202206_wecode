import React, { useEffect } from 'react';
import styled, { css } from 'styled-components/macro';
import { useNavigate } from 'react-router-dom';
import { VscBell, VscBellDot } from 'react-icons/vsc';
import { useRecoilState, useRecoilValue } from 'recoil';
import { LoginState } from '../../Pages/Admin/adminAtoms';
import DealerName from './DealerName';

const AdminNav = () => {
  const navigate = useNavigate();

  const Logout = () => {
    navigate(`/dealers/login`);
  };

  return (
    <NavBox>
      <NavTypo>코오롱 프리미엄 멤버십 Admin Page</NavTypo>
      <DealerInfo>
        <DealerName />
        <CenterLine>|</CenterLine>
        <DealerLogout onClick={Logout}>로그아웃</DealerLogout>
        <VscBell className="bell" />
      </DealerInfo>
    </NavBox>
  );
};

const rightTypo = css`
  font-size: ${props => props.theme.fontSizes.base};
  font-weight: ${props => props.theme.fontWeights.bold};
`;

const NavBox = styled.div`
  ${props => props.theme.flex.flexBox('row', 'center', 'space-between')};
  width: 100vw;
  height: 3.75rem;
  padding: 0 ${props => props.theme.paddings.xxxl};
  background-color: #c4c4c4;
`;

const NavTypo = styled.span`
  font-size: ${props => props.theme.fontSizes.xxl};
  font-weight: ${props => props.theme.fontWeights.extraBold};
`;

const DealerInfo = styled.div`
  ${props => props.theme.flex.flexBox('row', 'center', 'space-between')};
  width: 9.938rem;
  height: 1.375rem;

  .bell {
    font-size: 20px;
    &:hover {
      cursor: pointer;
    }
  }
`;

const CenterLine = styled.span`
  ${rightTypo}
`;

const DealerLogout = styled.span`
  ${rightTypo}
  cursor: pointer;
`;

export default AdminNav;
