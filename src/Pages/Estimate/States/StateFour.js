import React from 'react';
import {
  ButtonSet,
  NextButton,
  PrevButton,
  ContentBox,
  ContentTitle,
  InputBox,
} from './CarInfoStyle';

const StateFour = ({ nextProcess, prevProcess }) => {
  return (
    <ContentBox>
      <ContentTitle>
        보험 외 사고 처리를
        <br /> 하신 적이 있다면 알려주세요
      </ContentTitle>
      <InputBox
        placeholder="추가입력 사항"
        // onChange={e => getUserInputOwner(e)}
        // value={userInputOwner}
      />
      <button>보험 외 사고 처리를 한 적이 없어요</button>
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

export default StateFour;
