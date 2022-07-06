import React from 'react';
import styled, { css } from 'styled-components/macro';
import { CUSTOMER_LIST } from '../RightSection/Search/Branch/ModalData';

const CustomerInfo = () => {
  return (
    <div>
      <CustomerInfoContainer>
        <CustomerInfoTitle>고객정보</CustomerInfoTitle>
        <RowAlign>
          <CustomerContainer>
            {CUSTOMER_LIST.map(({ id, subject }) => {
              return (
                <CustomerSubject key={id}>
                  <CustomerTypo>{subject}</CustomerTypo>
                </CustomerSubject>
              );
            })}
          </CustomerContainer>
          <CustomerDetailsContainer>
            <CustomerDetails>
              <CustomerTypo>540345</CustomerTypo>
            </CustomerDetails>
            <CustomerDetails>
              <CustomerTypo>홍길동</CustomerTypo>
            </CustomerDetails>
            <CustomerDetails>
              <CustomerTypo>010-3392-0580</CustomerTypo>
            </CustomerDetails>
            <CustomerDetails>
              <CustomerTypo>서울특별시 강서구 화곡동</CustomerTypo>
            </CustomerDetails>
            <CustomerDetails>
              <CustomerTypo>2022.07.06 23:20:35</CustomerTypo>
            </CustomerDetails>
          </CustomerDetailsContainer>
        </RowAlign>
      </CustomerInfoContainer>
    </div>
  );
};

const BoxAlign = css`
  ${props => props.theme.flex.flexBox('column', '', 'center')};
  height: 30px;
  border: 1px solid #eaebec;
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
  ${props => props.theme.flex.flexBox('row', '', '')};
  border: 1px solid #eaebec;
`;

const CustomerContainer = styled.div`
  ${props => props.theme.flex.flexBox('column', '', '')};
`;

const CustomerSubject = styled.div`
  ${BoxAlign}
  width: 120px;
  background-color: #dbdbdb;
`;

const CustomerDetailsContainer = styled.div`
  ${props => props.theme.flex.flexBox('column', '', '')};
`;

const CustomerDetails = styled.div`
  ${BoxAlign}
  width: 300px;
  background-color: white;
`;

const CustomerTypo = styled.span`
  padding-left: 5px;
  font-size: ${props => props.theme.fontSizes.small};
  font-weight: ${props => props.theme.fontWeights.bold};
`;

export default CustomerInfo;
