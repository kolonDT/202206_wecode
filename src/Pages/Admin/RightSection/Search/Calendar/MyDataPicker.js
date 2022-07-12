import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import styled, { css } from 'styled-components/macro';
import { BsCalendarCheck } from 'react-icons/bs';

const MyDataPicker = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [month, setMonth] = useState(new Date().getMonth());

  const handleMonthChange = date => {
    setMonth(date.getMonth());
  };

  return (
    <CalendarDate>
      <StartDate>
        <MyDatePicker
          selected={startDate}
          dateFormat="yyyy-MM-dd" // 날짜 형식
          onChange={date => setStartDate(date)}
          placeholder="날짜 선택"
          onMonthChange={handleMonthChange}
        />
        <BsCalendarCheck className="iconCal" />
      </StartDate>
      <MiddleTypo>~</MiddleTypo>
      <EndDate>
        <MyDatePicker
          selected={endDate}
          dateFormat="yyyy-MM-dd" // 날짜 형식
          onChange={date => setEndDate(date)}
          placeholder="날짜 선택"
          onMonthChange={handleMonthChange}
        />
        <BsCalendarCheck className="iconCal" />
      </EndDate>
    </CalendarDate>
  );
};

const WhiteBox = css`
  width: 130px;
  height: 30px;
  background-color: white;
`;

const IconCustom = css`
  margin-right: 10px;
  font-size: ${props => props.theme.fontSizes.lg};
`;

const DateTypo = css`
  font-size: ${props => props.theme.fontSizes.small};
  font-weight: ${props => props.theme.fontWeights.bold};
`;

const CalendarDate = styled.div`
  ${props => props.theme.flex.flexBox('row', 'center', '')};
  width: 240px;
  height: 30px;
  background-color: white;
`;

const StartDate = styled.div`
  ${props => props.theme.flex.flexBox('row', 'center', '')};
  margin-left: 10px;
  ${WhiteBox}

  .iconCal {
    ${IconCustom}
  }
`;

const MiddleTypo = styled.span`
  margin-right: 11px;
  font-size: ${props => props.theme.fontSizes.lg};
  font-weight: ${props => props.theme.fontWeights.bold};
`;

const EndDate = styled.div`
  ${props => props.theme.flex.flexBox('row', 'center', '')};
  margin-left: 11px;
  ${WhiteBox}

  .iconCal {
    ${IconCustom}
  }
`;

const MyDatePicker = styled(DatePicker)`
  width: 100px;
  height: 30px;
  border-style: none;
  ${DateTypo}
`;

const CustomDay = styled.div`
  width: 28px;
  height: 28px;
  line-height: 1.8;
  text-align: center;
`;

export default MyDataPicker;
