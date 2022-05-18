import React, { useState } from "react";
import styled from "styled-components";

const InfoForm1 = () => {
  const [inputValue, setInputValue] = useState("");

  //input에 숫자만 입력 및 세 자리수 마다 콤마 찍는 함수
  const checkNumber = (e) => {
    const value = e.target.value;
    const onlyNumber = value.replace(/[^0-9]/g, "");
    const commaNumber = onlyNumber
      .toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    setInputValue(commaNumber);
  };

  return (
    <InfoContainer>
      <Announcement>
        보다 정확한 견적을 위해
        <br />
        추가 정보를 입력해주세요
      </Announcement>
      <DrivingDistanceBox>
        <DrivingDistance>주행거리</DrivingDistance>
        <InputBox>
          <DistanceInput
            placeholder="1,500"
            onChange={(e) => checkNumber(e)}
            value={inputValue}
          />
          <Measurements>km</Measurements>
        </InputBox>
      </DrivingDistanceBox>
    </InfoContainer>
  );
};

const InfoContainer = styled.div`
  width: 640px;
  margin: 0px auto;
  padding-left: 50px;
`;

const Announcement = styled.h1`
  font-size: 20px;
  font-weight: 800;
  letter-spacing: 1px;
  line-height: 25px;
`;

const DrivingDistanceBox = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  margin: 20px 0;
`;

const DrivingDistance = styled.span`
  margin-right: 20px;
  letter-spacing: 0.7px;
`;

const InputBox = styled.div`
  border-bottom: 1px solid rgba(0, 0, 0, 0.3);
`;

const DistanceInput = styled.input`
  margin-bottom: 5px;
  margin-right: 5px;
  padding: 3px 150px 3px 10px;
  border: 0 solid black;
  font-size: 16px;
  font-weight: 600;
  ::placeholder {
    color: rgba(0, 0, 0, 0.2);
    font-size: 16px;
  }
  :focus {
    outline: 0px solid black;
  }
`;

const Measurements = styled.span`
  padding-right: 7px;
`;

export default InfoForm1;
