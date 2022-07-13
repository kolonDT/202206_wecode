import React from 'react';
import styled from 'styled-components';
import { useRecoilValue } from 'recoil';
import {
  EstimateCarInfo,
  setMinPriceState,
  setMaxPriceState,
} from '../../../atoms';
import { InputButton, ContentBox, ContentTitle } from '../Style';
import PriceGraph from '../../Graph/PriceGraph';

const Price = ({ nextProcess }) => {
  const estimateCarInfo = useRecoilValue(EstimateCarInfo);
  const minPrice = useRecoilValue(setMinPriceState);
  const maxPrice = useRecoilValue(setMaxPriceState);
  const { owner, car_name } = estimateCarInfo;

  return (
    <ContentBox>
      <ContentTitle>
        <OwnerTag>{owner}</OwnerTag>님의 <CarTag>{car_name}</CarTag> 🚙
        <br />
        예상시세는{' '}
        <ExpectedPrice>
          {minPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')} ~{' '}
          {maxPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')} 만 원
        </ExpectedPrice>
        입니다.
      </ContentTitle>
      <PriceGraph />
      <InputButton onClick={nextProcess} variant="primary">
        다음
      </InputButton>
    </ContentBox>
  );
};

export default Price;

const ExpectedPrice = styled.span`
  color: ${({ theme }) => theme.colors.darkGray};
`;

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
