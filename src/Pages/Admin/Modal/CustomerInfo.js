import React from 'react';
import { useRecoilValue } from 'recoil';
import styled, { css } from 'styled-components/macro';
import { setModalList } from '../adminAtoms';
import { CUSTOMER_LIST } from '../RightSection/Search/Branch/ModalData';
import Estimate from './Estimate';

const CustomerInfo = () => {
  const getModal = useRecoilValue(setModalList);
  const { estimate_id } = getModal;

  return (
    <CustomerInfoContainer>
      <CustomerInfoTitle>고객정보</CustomerInfoTitle>
      <RowAlign>
        <CustomerContainer>
          {CUSTOMER_LIST.map(({ id, subject }) => {
            return <CustomerTitle key={id}>{subject}</CustomerTitle>;
          })}
        </CustomerContainer>
        <CustomerDetailsContainer>
          <CustomerTypo>{estimate_id}</CustomerTypo>
          <CustomerTypo>홍길동</CustomerTypo>
          <CustomerTypo>010-3392-0580</CustomerTypo>
          <CustomerTypo>서울특별시 강서구 화곡동</CustomerTypo>
          <CustomerTypo>2022.07.06 23:20:35</CustomerTypo>
        </CustomerDetailsContainer>
      </RowAlign>
    </CustomerInfoContainer>
  );
};

const BoxAlign = css`
  ${props => props.theme.flex.flexBox('column', '', 'center')};
  height: 30px;
  border-bottom: 1.5px solid #eaebec;
  border-right: 1px solid #eaebec;
  border-left: 1px solid #eaebec;
`;

const CustomerInfoContainer = styled.div`
  ${props => props.theme.flex.flexBox('column', '', '')};
  margin-bottom: 30px;
  width: 420px;
`;

const CustomerInfoTitle = styled.span`
  font-size: ${props => props.theme.fontSizes.small};
  font-weight: ${props => props.theme.fontWeights.extraBold};
  margin-bottom: 10px;
`;

const RowAlign = styled.div`
  ${props => props.theme.flex.flexBox('row', 'center', '')};
  border-top: 1.5px solid #eaebec;
`;

const CustomerContainer = styled.div`
  ${props => props.theme.flex.flexBox('column', '', '')};
`;

const CustomerTitle = styled.div`
  ${BoxAlign}
  width: 120px;
  padding-left: 5px;
  font-size: ${props => props.theme.fontSizes.small};
  font-weight: ${props => props.theme.fontWeights.bold};
  background-color: #dbdbdb;
`;

const CustomerDetailsContainer = styled.div`
  ${props => props.theme.flex.flexBox('column', '', '')};
`;

const CustomerTypo = styled.div`
  ${BoxAlign}
  width: 300px;
  padding-left: 5px;
  font-size: ${props => props.theme.fontSizes.small};
  font-weight: ${props => props.theme.fontWeights.bold};
  background-color: white;
`;

export default CustomerInfo;
