import React from 'react';
import styled from 'styled-components';
import { ContentBox, ContentTitle, InputBox } from '../Estimate/Style';

const SignIn = () => {
  return (
    <Background>
      <BodyWrapper>
        <EstimateWrapper>
          <ContentBox>
            <ContentsTitle>회원가입</ContentsTitle>
            <ContentWrapper>
              차량번호
              <InputBox />
            </ContentWrapper>
          </ContentBox>
        </EstimateWrapper>
      </BodyWrapper>
    </Background>
  );
};

export default SignIn;

const ContentWrapper = styled.div`
  border: 1px solid black;
`;

const ContentsTitle = styled(ContentTitle)`
  text-align: center;
`;

const EstimateWrapper = styled.section`
  width: 100%;
  height: fit-content;
  position: absolute;
  top: 5vh;
  box-shadow: 0px 0px 8px rgba(8, 94, 214, 0.05);
`;

const BodyWrapper = styled.div`
  ${({ theme }) => theme.flex.flexBox('column')}
  position: relative;
  width: 640px;
  height: 100%;

  @media only screen and (max-width: 640px) {
    width: 90%;
  }
`;

const Background = styled.div`
  ${({ theme }) => theme.flex.flexBox('column')}
  width: 100vw;
  height: 100vh;
  background: aliceblue;
`;
