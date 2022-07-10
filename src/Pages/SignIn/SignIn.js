import React from 'react';
import styled from 'styled-components';
import {
  ContentBox,
  ContentTitle,
  InputBox,
  InputButton,
} from '../Estimate/Style';

const SignIn = () => {
  return (
    <Background>
      <BodyWrapper>
        <EstimateWrapper>
          <ContentBox>
            <ContentsTitle>
              손쉽게 시세조회와
              <br />
              견적요청을 진행해보세요!
            </ContentsTitle>
            <ContentWrapper>
              <SubTitle>차량번호</SubTitle>
              <InputBox />
            </ContentWrapper>
            <ContentWrapper>
              <SubTitle>소유자명</SubTitle>
              <InputBox />
            </ContentWrapper>
            <ContentWrapper>
              {/* TO DO : 유효성 검사 밑 칸 3개로 나눠야 함 */}
              <SubTitle>연락처</SubTitle>
              <InputBox />
            </ContentWrapper>
            <InputButton
              // onClick={goToMain}
              variant="primary"
            >
              시세 확인하러 가기
            </InputButton>
          </ContentBox>
        </EstimateWrapper>
      </BodyWrapper>
    </Background>
  );
};

export default SignIn;

const SubTitle = styled.h5`
  margin-bottom: 0.5rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.gray};
`;

const ContentWrapper = styled.div`
  margin-bottom: 2rem;
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
  height: 95vh;
  background: aliceblue;
`;
