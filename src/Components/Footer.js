import React from 'react';
import styled from 'styled-components';
import { MdCopyright } from 'react-icons/md';

const Footer = ({ page }) => {
  return (
    <FooterContainer page={page}>
      <FooterWrapper>
        <CompanyBox>
          <CompanyName>코오롱글로벌주식회사</CompanyName>
        </CompanyBox>
        <InfoBox>
          <PrivacyPolicy>개인정보처리방침</PrivacyPolicy>
          <Conditions>이용약관</Conditions>
        </InfoBox>
        <CopyrightBox>
          <MdCopyright size="18" />
          <Copyright>copyright</Copyright>
        </CopyrightBox>
      </FooterWrapper>
    </FooterContainer>
  );
};

const FooterContainer = styled.div`
  ${({ theme }) => theme.flex.flexBox}
  width: 100vw;
  background-color: white;

  @media only screen and (max-width: 640px) {
    font-size: 90%;
  }
`;

const FooterWrapper = styled.div`
  width: 90%;
  padding: 3rem 0;
`;

const CompanyBox = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 10px;
`;

const CompanyName = styled.p``;

const InfoBox = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 10px;
`;

const PrivacyPolicy = styled.p`
  font-weight: 600;
`;

const Conditions = styled.p`
  margin-left: 0.3rem;
`;

const CopyrightBox = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
`;

const Copyright = styled.div``;

export default Footer;
