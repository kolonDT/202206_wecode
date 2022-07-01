import React, { useState } from 'react';
import DatePicker from 'react-datepicker'; // DatePicker 라는 컴포넌트도 가져오깅
import 'react-datepicker/dist/react-datepicker.css'; // 스타일 맥이기
import styled from 'styled-components/macro';
import { BsCalendarCheck } from 'react-icons/bs';

const SelectCalendar = () => {
  // const [value, onChange] = useState(new Date());
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  return (
    <CalendarContainer>
      <DateAlign>
        <QuotationTypo>견적요청일</QuotationTypo>
      </DateAlign>
      <CalendarDate>
        <StartDate>
          <MyDatePicker
            selected={startDate}
            dateFormat="yyyy-MM-dd" // 날짜 형식
            onChange={date => setStartDate(date)}
          />
          <BsCalendarCheck />
        </StartDate>
        <EndDate>
          <MyDatePicker
            selected={endDate}
            dateFormat="yyyy-MM-dd" // 날짜 형식
            onChange={date => setEndDate(date)}
          />
        </EndDate>
      </CalendarDate>
    </CalendarContainer>
  );
};
const CalendarContainer = styled.div`
  ${props => props.theme.flex.flexBox('row', 'center', '')};
`;

const DateAlign = styled.div`
  ${props => props.theme.flex.flexBox('row', 'center', '')};
  width: 120px;
  height: 30px;
  border: 1px solid #eaebec;
  background-color: #dbdbdb;
`;

const CalendarDate = styled.div`
  ${props => props.theme.flex.flexBox('row', 'center', '')};
  width: 300px;
  background-color: white;
`;

const StartDate = styled.div`
  ${props => props.theme.flex.flexBox('row', 'center', '')};
`;
const EndDate = styled.div`
  ${props => props.theme.flex.flexBox('row', 'center', '')};
`;

const QuotationTypo = styled.span`
  padding-left: 5px;
  font-size: ${props => props.theme.fontSizes.small};
  font-weight: ${props => props.theme.fontWeights.bold};
`;

const MyDatePicker = styled(DatePicker)`
  width: 100px;
  height: 30px;
  border-style: none;
  font-size: ${props => props.theme.fontSizes.small};
  font-weight: ${props => props.theme.fontWeights.bold};
`;

export default SelectCalendar;
