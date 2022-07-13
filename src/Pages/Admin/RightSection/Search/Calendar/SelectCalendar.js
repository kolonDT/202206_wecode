import React from 'react';
import styled, { css } from 'styled-components/macro';
import MyDataPicker from './MyDataPicker';

const SelectCalendar = () => {
  return (
    <CalendarContainer>
      <DateAlign>
        <QuotationTypo>견적요청일</QuotationTypo>
      </DateAlign>
      <MyDataPicker />
    </CalendarContainer>
  );
};

const DateTypo = css`
  font-size: ${props => props.theme.fontSizes.small};
  font-weight: ${props => props.theme.fontWeights.bold};
`;

const CalendarContainer = styled.div`
  ${props => props.theme.flex.flexBox('row', 'center', '')};
  width: 420px;
  border: 1px solid #eaebec;
`;

const DateAlign = styled.div`
  ${props => props.theme.flex.flexBox('row', 'center', '')};
  width: 120px;
  height: 30px;
  background-color: #dbdbdb;
`;

const QuotationTypo = styled.span`
  padding-left: 5px;
  ${DateTypo}
`;

export default SelectCalendar;
