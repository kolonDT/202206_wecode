import React from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';
import styled from 'styled-components';
import {
  currentEstimateState,
  lastEstimateState,
  UserInputMileageState,
  userEstimateProcessState,
} from '../../../atoms';
import {
  ButtonSet,
  NextButton,
  PrevButton,
  ContentBox,
  ContentTitle,
  InputBox,
} from '../Style';
import { IP } from '../../../Hooks/Fetch';

const Mileage = ({ prevProcess }) => {
  const [currentEstimate, setCurrentEstimate] =
    useRecoilState(currentEstimateState);
  const [lastEstimate, setLastEstimate] = useRecoilState(lastEstimateState);

  const setUserEstimateProcess = useSetRecoilState(userEstimateProcessState);
  const [userInputMileage, setUserInputMileage] = useRecoilState(
    UserInputMileageState
  );

  const goToOptions = () => {
    setUserEstimateProcess('주행거리');

    fetch(`${IP}estimates`, {
      method: 'PATCH',
      headers: {
        Authorization: localStorage.getItem('access_token'),
      },
      body: JSON.stringify({
        process_state: '주행거리',
        mileage: userInputMileage,
      }),
    })
      .then(res => res.json())
      .then(data => {
        if (data.message === 'SUCCESS') {
          setCurrentEstimate(prev => prev + 1);
          lastEstimate <= currentEstimate &&
            setLastEstimate(currentEstimate + 1);
        } else {
          alert(data.message);
        }
      });
  };

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
          onClick={goToOptions}
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
