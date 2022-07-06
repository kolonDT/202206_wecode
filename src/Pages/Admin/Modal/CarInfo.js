import React from 'react';
import styled, { css } from 'styled-components/macro';
import { CAR_LIST } from '../RightSection/Search/Branch/ModalData';
import ImageInfo from './ImageInfo';

const CarInfo = () => {
  return (
    <CarInfoContainer>
      <CarInfoTitle>차량정보</CarInfoTitle>
      <RowAlign>
        <CarContainer>
          {CAR_LIST.map(({ id, subject }) => {
            return (
              <CarSubject key={id}>
                <CarTypo>{subject}</CarTypo>
              </CarSubject>
            );
          })}
        </CarContainer>
        <CarDetailsContainer>
          <CarDetails>
            <CarTypo>123가5678</CarTypo>
          </CarDetails>
          <CarDetails>
            <CarTypo>BMW</CarTypo>
          </CarDetails>
          <CarDetails>
            <CarTypo>M8 그란데 쿠페</CarTypo>
          </CarDetails>
          <CarDetails>
            <CarTypo>2021</CarTypo>
          </CarDetails>
          <CarDetails>
            <CarTypo>1,500km</CarTypo>
          </CarDetails>
          <CarDetails>
            <CarTypo>없음</CarTypo>
          </CarDetails>
        </CarDetailsContainer>
      </RowAlign>
      <ImageInfo />
    </CarInfoContainer>
  );
};

const BoxAlign = css`
  ${props => props.theme.flex.flexBox('column', '', 'center')};
  height: 30px;
  border: 1px solid #eaebec;
`;

const CarInfoContainer = styled.div`
  ${props => props.theme.flex.flexBox('column', '', '')};
  margin-bottom: 30px;
  width: 420px;
`;

const CarInfoTitle = styled.span`
  font-size: ${props => props.theme.fontSizes.small};
  font-weight: ${props => props.theme.fontWeights.extraBold};
  margin-bottom: 10px;
`;

const RowAlign = styled.div`
  ${props => props.theme.flex.flexBox('row', '', '')};
  border: 1px solid #eaebec;
  margin-bottom: 30px;
`;

const CarContainer = styled.div`
  ${props => props.theme.flex.flexBox('column', '', '')};
`;

const CarSubject = styled.div`
  ${BoxAlign}
  width: 120px;
  background-color: #dbdbdb;
`;

const CarDetailsContainer = styled.div`
  ${props => props.theme.flex.flexBox('column', '', '')};
`;

const CarDetails = styled.div`
  ${BoxAlign}
  width: 300px;
  background-color: white;
`;

const CarTypo = styled.span`
  padding-left: 5px;
  font-size: ${props => props.theme.fontSizes.small};
  font-weight: ${props => props.theme.fontWeights.bold};
`;

export default CarInfo;
