import React from 'react';
import styled, { css } from 'styled-components/macro';
import { CAR_LIST } from './ModalData';
import ImageInfo from './ImageInfo';

const CarInfo = () => {
  return (
    <CarInfoContainer>
      <CarInfoTitle>차량정보</CarInfoTitle>
      <BorderWrapper>
        <RowAlign>
          <CarContainer>
            {CAR_LIST.map(({ id, subject }) => {
              return <CarTitle key={id}>{subject}</CarTitle>;
            })}
          </CarContainer>
          <CarDetailsContainer>
            <CarTypo>123가5678</CarTypo>
            <CarTypo>BMW</CarTypo>
            <CarTypo>M8 그란데 쿠페</CarTypo>
            <CarTypo>2021</CarTypo>
            <CarTypo>1,500km</CarTypo>
            <CarTypo>없음</CarTypo>
          </CarDetailsContainer>
        </RowAlign>
        <AdditionalAlign>
          <AdditionalSubject>추가정보</AdditionalSubject>
          <AdditionalTypo>
            추가 정보 확인 요망. 추가 정보 확인 요망. 추가 정보 확인 요망.
          </AdditionalTypo>
        </AdditionalAlign>
      </BorderWrapper>
      <ImageInfo />
    </CarInfoContainer>
  );
};

const BoxAlign = css`
  ${props => props.theme.flex.flexBox('column', '', 'center')};
  padding-left: 5px;
  border-bottom: 1.5px solid #eaebec;
  border-right: 1px solid #eaebec;
  border-left: 1px solid #eaebec;
  font-size: ${props => props.theme.fontSizes.small};
  font-weight: ${props => props.theme.fontWeights.bold};
  font-size: ${props => props.theme.fontSizes.small};
  font-weight: ${props => props.theme.fontWeights.bold};
`;

const CarInfoContainer = styled.div`
  ${props => props.theme.flex.flexBox('column', '', '')};
  margin-bottom: 30px;
  width: 420px;
`;

const BorderWrapper = styled.div`
  border-top: 1px solid #eaebec;
  border-top: 1.5px solid #eaebec;
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

const CarTitle = styled.div`
  ${BoxAlign}
  width: 120px;
  height: 30px;
  background-color: #dbdbdb;
`;

const CarDetailsContainer = styled.div`
  ${props => props.theme.flex.flexBox('column', '', '')};
`;

const AdditionalAlign = styled.div`
  ${props => props.theme.flex.flexBox('row', 'center', 'center')};
`;

const CarTypo = styled.div`
  ${BoxAlign}
  width: 300px;
  height: 30px;
  background-color: white;
`;

const AdditionalSubject = styled.div`
  ${props => props.theme.flex.flexBox('column', '', 'center')};
  ${BoxAlign}
  width: 120px;
  height: 70px;
  background-color: #dbdbdb;
  border-top: 1px solid #eaebec;
`;

const AdditionalTypo = styled.div`
  ${BoxAlign}
  width: 300px;
  height: 70px;
  background-color: white;
`;

export default CarInfo;
