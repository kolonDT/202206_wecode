import React from 'react';
import styled, { css } from 'styled-components/macro';
import { CAR_LIST } from './ModalData';
import ImageInfo from './ImageInfo';
import { useRecoilValue } from 'recoil';
import { setModalList } from '../adminAtoms';

const CarInfo = () => {
  const getModal = useRecoilValue(setModalList);
  const { car_number, manufacturer, trim, model_year, distance, option, info } =
    getModal;

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
            <CarTypo>{car_number}</CarTypo>
            <CarTypo>{manufacturer}</CarTypo>
            <CarTypo>{trim}</CarTypo>
            <CarTypo>{model_year}</CarTypo>
            <CarTypo>{distance}</CarTypo>
            <CarTypo>{option}</CarTypo>
          </CarDetailsContainer>
        </RowAlign>
        <AdditionalAlign>
          <AdditionalSubject>추가정보</AdditionalSubject>
          <AdditionalTypo>{info}</AdditionalTypo>
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
