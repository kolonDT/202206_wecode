import React from "react";
import styled from "styled-components";
import { GrDown } from "react-icons/gr";
import { MdCopyright } from "react-icons/md";

const Footer = ({ page }) => {
  return (
    <FooterContainer page={page}>
      <FooterWrapper>
        <CompanyBox>
          <CompanyName>코오롱글로벌주식회사</CompanyName>
          <GrDown />
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
  width: ${(props) => (props.page === "admin" ? "1250px" : "640px")};
  margin: 20px auto;
  @media only screen and (max-width: 640px) {
    width: 90%;
    margin: 1.8em auto;
  }
`;

const FooterWrapper = styled.div`
  border-top: 1px solid rgba(0, 0, 0, 0.3);
  width: 95%;
  margin: 0 auto;
  margin-top: 15px;
  padding-top: 25px;
`;

const CompanyBox = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 10px;
`;

const CompanyName = styled.p`
  padding-right: 5px;
`;

const InfoBox = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 10px;
  gap: 15px;
`;

const PrivacyPolicy = styled.p`
  font-weight: 700;
`;

const Conditions = styled.p``;

const CopyrightBox = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
`;

const Copyright = styled.div``;

export default Footer;
