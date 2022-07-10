import React from 'react';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';
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

  return (
    <ContentBox>
      <ContentTitle>
        보다 정확한 견적을 위해
        <br /> 주행거리를 입력해주세요
      </ContentTitle>
      <InputWrapper>
        <InputBox
          placeholder="12,345"
          onChange={e => setUserInputMileage(e.target.value)}
          value={userInputMileage}
          type="number"
        />
        <span>km</span>
      </InputWrapper>
      <ButtonSet>
        <PrevButton onClick={prevProcess} variant="primary">
          이전
        </PrevButton>
        <NextButton
          disabled={userInputMileage === '' ? true : false}
          onClick={nextProcess}
          variant="primary"
        >
          다음
        </NextButton>
      </ButtonSet>
    </ContentBox>
  );
};

export default Mileage;

const InputWrapper = styled.div`
  position: relative;

  span {
    position: absolute;
    right: 5%;
    margin-top: 1rem;
    font-weight: 500;
    color: ${({ theme }) => theme.colors.gray};
  }
`;
