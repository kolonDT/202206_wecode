import React from 'react';
import { useRecoilValue } from 'recoil';
import styled, { css } from 'styled-components/macro';
import { setModalList } from '../adminAtoms';
import { CUSTOMER_LIST } from './ModalData';

const CustomerInfo = () => {
  const getModal = useRecoilValue(setModalList);
  const { estimate_id, owner, phone_number, address, estimate_request_date } =
    getModal;

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
          <CustomerTypo>{owner}</CustomerTypo>
          <CustomerTypo>{phone_number}</CustomerTypo>
          <CustomerTypo>{address}</CustomerTypo>
          <CustomerTypo>{estimate_request_date}</CustomerTypo>
        </CustomerDetailsContainer>
      </RowAlign>
    </CustomerInfoContainer>
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
  height: 30px;
  background-color: #dbdbdb;
`;

const CustomerDetailsContainer = styled.div`
  ${props => props.theme.flex.flexBox('column', '', '')};
`;

const CustomerTypo = styled.div`
  ${BoxAlign}
  width: 300px;
  height: 30px;
  background-color: white;
`;

export default CustomerInfo;
