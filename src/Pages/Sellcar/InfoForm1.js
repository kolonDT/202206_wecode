import React, { useRef, useState } from "react";
import styled from "styled-components";

const InfoForm1 = () => {
  //주행거리 값 관리하는 상태값
  const [inputValue, setInputValue] = useState("");

  //옵션 값 관리하는 상태값
  const [options, setOptions] = useState({
    1: false,
    2: false,
    3: false,
    4: false,
    5: false,
    6: false,
  });

  //input에 숫자만 입력 및 세 자리수 마다 콤마 찍는 함수
  const checkNumber = (e) => {
    const value = e.target.value;
    const onlyNumber = value.replace(/[^0-9]/g, "");
    const commaNumber = onlyNumber
      .toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    setInputValue(commaNumber);
  };

  //click시 옵션값 저장하는 함수
  const clickOptions = (e) => {
    // setOptions([...options, e.target.value]);
    const value = e.target.value;
    console.log("beforeChange>>", options);
    setOptions({ ...options, [value]: !options[value] });
    console.log("afterChange>>", options);
  };

  return (
    <InfoContainer>
      <Announcement>
        보다 정확한 견적을 위해
        <br />
        추가 정보를 입력해주세요
      </Announcement>
      <DrivingDistanceWrapper>
        <Name>주행거리</Name>
        <InputBox>
          <DistanceInput
            placeholder="1,500"
            onChange={(e) => checkNumber(e)}
            value={inputValue}
          />
          <Measurements>km</Measurements>
        </InputBox>
      </DrivingDistanceWrapper>
      <OptionWrapper>
        <Name>옵션</Name>
        <OptionBox>
          <OptionLine>
            <OptionButton
              value={1}
              onClick={clickOptions}
              isClicked={options[1]}
            >
              네비게이션
            </OptionButton>
            <OptionButton
              value={2}
              onClick={clickOptions}
              isClicked={options[2]}
            >
              선루프
            </OptionButton>
            <OptionButton
              value={3}
              onClick={clickOptions}
              isClicked={options[3]}
            >
              통풍시트
            </OptionButton>
          </OptionLine>
          <OptionLine>
            <OptionButton
              value={4}
              onClick={clickOptions}
              isClicked={options[4]}
            >
              디지털키
            </OptionButton>
            <OptionButton
              value={5}
              onClick={clickOptions}
              isClicked={options[5]}
            >
              옵션명
            </OptionButton>
            <OptionButton
              value={6}
              onClick={clickOptions}
              isClicked={options[6]}
            >
              옵션명
            </OptionButton>
          </OptionLine>
        </OptionBox>
        <NoOptionCheck>
          <CheckBoxInfo></CheckBoxInfo>
        </NoOptionCheck>
      </OptionWrapper>
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

const DrivingDistanceWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  margin: 20px 0;
`;

const Name = styled.span`
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

const OptionWrapper = styled.div``;

const OptionLine = styled.div`
  margin-bottom: 15px;
`;

const OptionBox = styled.div`
  padding: 10px;
  margin-top: 20px;
`;

const OptionButton = styled.button`
  padding: 13px 20px;
  margin-right: 30px;
  color: rgba(0, 0, 0, 0.8);
  background-color: white;
  border: 0px solid black;
  border-radius: 30px;
  font-size: 16px;
  font-weight: 600;
  box-shadow: 5px 5px 10px 1px rgba(0, 0, 0, 0.1);
  ${({ isClicked }) => {
    return isClicked
      ? `
        background-color: rgba(0, 0, 0, 0.1);
        cursor: pointer;
        box-shadow: inset 1px 1px 1px 1px rgba(0, 0, 0, 0.2);
      `
      : null;
  }}
`;

const NoOptionCheck = styled.div``;

const CheckBoxInfo = styled.span``;

export default InfoForm1;
