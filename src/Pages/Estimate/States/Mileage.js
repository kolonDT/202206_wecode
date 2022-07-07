import React from 'react';
import { useRecoilState } from 'recoil';
import { UserInputMileageState } from '../../../atoms';
import {
  ButtonSet,
  NextButton,
  PrevButton,
  ContentBox,
  ContentTitle,
  InputBox,
} from '../Style';

const Mileage = ({ nextProcess, prevProcess }) => {
  const [userInputMileage, setUserInputMileage] = useRecoilState(
    UserInputMileageState
  );
  const getUserInputMileage = e => {
    setUserInputMileage(e.target.value);
  };

  return (
    <ContentBox>
      <ContentTitle>
        보다 정확한 견적을 위해
        <br /> 주행거리를 입력해주세요
      </ContentTitle>
      <InputBox
        placeholder="12,345"
        onChange={getUserInputMileage}
        value={userInputMileage}
        type="number"
      />
      <ButtonSet>
        <PrevButton onClick={prevProcess} variant="primary">
          이전
        </PrevButton>
        <NextButton onClick={nextProcess} variant="primary">
          다음
        </NextButton>
      </ButtonSet>
    </ContentBox>
  );
};

export default Mileage;
