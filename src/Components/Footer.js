import React from 'react';
import styled from 'styled-components';
import { GrDown } from "react-icons/gr";
import { MdCopyright } from "react-icons/md";


const Footer = () => {
    return (
       <FooterContainer>
           <CompanyBox>
               <CompanyName>
                   코오롱글로벌주식회사
               </CompanyName>
               <GrDown/>
           </CompanyBox>
           <InfoBox>
               <PrivacyPolicy>
                   개인정보처리방침
               </PrivacyPolicy>
               <Conditions>
                   이용약관
               </Conditions>
           </InfoBox>
           <CopyrightBox>
               <MdCopyright size="18"/>
               <Copyright>
                   copyright
               </Copyright>
           </CopyrightBox>
       </FooterContainer>
    );
};

const FooterContainer = styled.div`
    margin: 30px auto;
    padding-top: 30px;
    width: 640px;
    border-top: 1px solid rgba(0,0,0,0.2);
`

const CompanyBox = styled.div`
    display: flex;
    flex-wrap: wrap;
    margin-bottom: 10px;
`

const CompanyName = styled.p`
    padding-right: 5px;
`

const InfoBox = styled.div`
    display: flex;
    flex-wrap: wrap;
    margin-bottom: 10px;
    gap: 15px;

`

const PrivacyPolicy = styled.p`
    font-weight: 700;
`

const Conditions = styled.p``

const CopyrightBox = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 5px
`

const Copyright = styled.div``

export default Footer;