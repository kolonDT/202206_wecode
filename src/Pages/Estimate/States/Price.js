import React from 'react';
import styled from 'styled-components';
import { useRecoilValue } from 'recoil';
import { EstimateCarInfo } from '../../../atoms';
import {
  ButtonSet,
  NextButton,
  PrevButton,
  ContentBox,
  ContentTitle,
} from '../Style';
import PriceGraph from '../../Graph/PriceGraph';

const Price = ({ nextProcess, prevProcess }) => {
  const estimateCarInfo = useRecoilValue(EstimateCarInfo);
  const { owner, car_name } = estimateCarInfo;

  return (
    <ContentBox>
      <ContentTitle>
        <OwnerTag>{owner}</OwnerTag>님의 <CarTag>{car_name}</CarTag> 🚙
        <br />
        예상시세는 다음과 같습니다.
      </ContentTitle>
      <PriceGraph />
      <ButtonSet>
        <PrevButton onClick={prevProcess} variant="primary">
          이전
        </PrevButton>
        <NextButton onClick={nextProcess} variant="primary">
          다음
        </NextButton>
      </ButtonSet>
    </ContentBox>
  );
};

export default Price;

const OwnerTag = styled.span`
  color: ${({ theme }) => theme.colors.primaryBlue};
`;

const CarTag = styled.span`
  background-color: ${({ theme }) => theme.colors.primaryBlue};
  color: ${({ theme }) => theme.colors.white};
  border-radius: 0.2rem;
  padding: 0 0.3rem;
  font-size: 22px;
`;
