import React from 'react';
import styled, { css } from 'styled-components/macro';
import { CAR_LIST } from '../RightSection/Search/Branch/ModalData';
import ImageInfo from './ImageInfo';

const CarInfo = () => {
  return (
    <CarInfoContainer>
      <CarInfoTitle>차량정보</CarInfoTitle>
      <BorderWrapper>
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
        <AdditionalAlign>
          <AdditionalSubject>
            <CarTypo>추가정보</CarTypo>
          </AdditionalSubject>
          <AdditionalInfo>
            <CarTypo>
              추가 정보 확인 요망. 추가 정보 확인 요망. 추가 정보 확인 요망.
            </CarTypo>
          </AdditionalInfo>
        </AdditionalAlign>
      </BorderWrapper>
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

const BorderWrapper = styled.div`
  border-top: 1px solid #eaebec;
`;

const CarInfoTitle = styled.span`
  font-size: ${props => props.theme.fontSizes.small};
  font-weight: ${props => props.theme.fontWeights.extraBold};
  margin-bottom: 10px;
`;

const RowAlign = styled.div`
  ${props => props.theme.flex.flexBox('row', '', '')};
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

const AdditionalAlign = styled.div`
  ${props => props.theme.flex.flexBox('row', 'center', 'center')};
`;

const AdditionalSubject = styled.div`
  ${props => props.theme.flex.flexBox('column', '', 'center')};
  height: 70px;
  width: 120px;
  background-color: #dbdbdb;
  border: 1px solid #eaebec;
`;

const AdditionalInfo = styled.div`
  ${props => props.theme.flex.flexBox('column', '', 'center')};
  height: 70px;
  width: 300px;
  background-color: white;
  border: 1px solid #eaebec;
`;

const CarTypo = styled.span`
  padding: 5px;
  font-size: ${props => props.theme.fontSizes.small};
  font-weight: ${props => props.theme.fontWeights.bold};
`;

export default CarInfo;
