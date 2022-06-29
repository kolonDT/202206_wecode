import React from "react";
import styled, { css } from "styled-components/macro";
import { useNavigate } from "react-router-dom";

const AdminNav = () => {
  const navigate = useNavigate();

  const Logout = () => {
    navigate(`/login`);
  };

  return (
    <div>
      <NavContainer>
        <NavBox>
          <NavTypo>코오롱 프리미엄 멤버십 Admin Page</NavTypo>
          <DealerInfo>
            <DealerName>홍길동</DealerName>
            <CenterLine>|</CenterLine>
            <DealerLogout onClick={Logout}>로그아웃</DealerLogout>
          </DealerInfo>
        </NavBox>
      </NavContainer>
    </div>
  );
};

const rightTypo = css`
  font-size: 16px;
  font-weight: 500;
`;

const NavContainer = styled.div`
  display: flex;
`;

const NavBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 60px;
  padding: 0 40px;
  background-color: #c4c4c4;
`;

const NavTypo = styled.span`
  font-size: 24px;
  font-weight: 700;
`;

const DealerInfo = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  width: 159px;
  height: 22px;
`;

const DealerName = styled.span`
  ${rightTypo}
`;

const CenterLine = styled.span`
  ${rightTypo}
`;

const DealerLogout = styled.span`
  ${rightTypo}
  cursor: pointer;
`;

export default AdminNav;
