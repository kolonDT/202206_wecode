import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { PrevButton, ContentBox, ContentTitle } from './Style';

const Complete = () => {
  const navigate = useNavigate();
  const goToMyState = () => {
    navigate('/estimate');
  };

  return (
    <Background>
      <BodyWrapper>
        <EstimateWrapper>
          <ContentBox>
            <ContentTitle>견적 요청이 접수되었습니다!</ContentTitle>
            <SubTitle>
              <p>
                담당 SC 배정 후 방문 상담과 <br /> 판매 절차가 진행 됩니다.
              </p>
              <p>
                진행 상황이 업데이트 될 때 <br /> 알려드릴게요!
              </p>
            </SubTitle>
            <GoToConfirmBtn onClick={goToMyState} variant="primary">
              내 견적 확인하러 가기
            </GoToConfirmBtn>
          </ContentBox>
        </EstimateWrapper>
      </BodyWrapper>
    </Background>
  );
};

export default Complete;

const SubTitle = styled.h4`
  font-size: 21px;
  line-height: 1.8rem;

  p {
    color: ${({ theme }) => theme.colors.darkGray};
    margin-bottom: 1.5rem;
  }
`;

const GoToConfirmBtn = styled(PrevButton)`
  margin-top: 4rem;
  width: 100%;
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
  ${({ theme }) => theme.flex.flexBox}
  width: 100vw;
  height: 95vh;
  background-color: aliceblue;
`;

const EstimateWrapper = styled.section`
  width: 100%;
  height: fit-content;
  position: absolute;
  top: 5vh;
  box-shadow: 0px 0px 8px rgba(8, 94, 214, 0.05);
`;
