import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { RiAlertFill } from 'react-icons/ri';
import { BsPatchCheckFill } from 'react-icons/bs';
import { Button } from 'react-bootstrap';

import { useRecoilState, useSetRecoilState } from 'recoil';
import {
  LoginProcessState,
  UserInputOwnerState,
  isLoginModalState,
  currentEstimateState,
  userEstimateProcessState,
  UserInputMileageState,
  userInputInsuranceState,
  keyAmountState,
  wheelScratchAmountState,
  panelScratchAmountState,
  userInputRepairState,
  userInputEtcState,
  userInputAddressState,
  userInputPhoneNumberState,
} from '../../atoms';

import {
  ButtonSet,
  NextButton,
  PrevButton,
  ContentBox,
  ContentTitle,
  InputBox,
} from '../Estimate/Style';
import LoginModal from '../../Components/Modal/LoginModal';
import { IP } from '../../Hooks/Fetch';

function Login() {
  const [userInputOwner, setUserInputOwner] =
    useRecoilState(UserInputOwnerState);
  const navigate = useNavigate();
  const [id, setId] = useState('');
  const [isLogin, setLogin] = useState(false);
  const [loginProcess, setLoginProcess] = useRecoilState(LoginProcessState);
  const [isLoginModal, setIsLoginModal] = useRecoilState(isLoginModalState);

  const [inputCarNumber, setInputCarNumber] = useState('');
  const setCurrentEstimate = useSetRecoilState(currentEstimateState);
  const setUserEstimateProcess = useSetRecoilState(userEstimateProcessState);

  const setUserInputMileage = useSetRecoilState(UserInputMileageState);
  const setUserInputInsurance = useSetRecoilState(userInputInsuranceState);
  const setKeyAmount = useSetRecoilState(keyAmountState);
  const setWheelScratchAmount = useSetRecoilState(wheelScratchAmountState);
  const setPanelScratchAmount = useSetRecoilState(panelScratchAmountState);
  const setUserInputRepair = useSetRecoilState(userInputRepairState);
  const setUserInputEtc = useSetRecoilState(userInputEtcState);
  const setUserInputAddress = useSetRecoilState(userInputAddressState);
  const setUserInputPhoneNumber = useSetRecoilState(userInputPhoneNumberState);

  const handleInputCarNumber = e => {
    setInputCarNumber(e.target.value);
    let ret = isValidId(e.target.value);
    setLogin(ret);
    setId(e.target.value);
  };

  const handleAdmin = () => {
    navigate('/admin');
  };

  function isValidId(str) {
    const regId = /\d{2,3}[가-힣]{1}?([0-9]{4})$/g;
    let ret = regId.test(str);
    return ret;
  }

  const startLogin = () => {
    fetch(`${IP}cars/number`, {
      method: 'POST',
      body: JSON.stringify({
        car_number: inputCarNumber,
      }),
    })
      .then(res => res.json())
      .then(data => {
        data.message === 'THE_CAR_NUMBER_ALREADY'
          ? setLoginProcess(prev => prev + 1)
          : setIsLoginModal(true);
      });
  };

  const getUserInputOwner = e => {
    setUserInputOwner(e.target.value);
  };

  const checkUser = () => {
    fetch(`${IP}cars/signin`, {
      method: 'POST',
      body: JSON.stringify({
        car_number: inputCarNumber,
        owner: userInputOwner,
      }),
    })
      .then(res => res.json())
      .then(data => {
        // 견적서가 작성 완료인 경우 : process_state : '신청완료'
        if (data.message === 'SUCCESS_ESTIMATE_COMPLETION') {
          localStorage.setItem(`access_token`, data.access_token);
          alert('요청한 견적서가 있습니다.\n내 견적서로 이동합니다.');
          navigate('/estimate');
        }
        // 작성중인 견적서가 있을 경우
        if (data.message === 'SUCCESS_ESTIMATE_REGISTERING') {
          localStorage.setItem(`access_token`, data.access_token);
          alert(
            '작성 중이던 견적서가 있습니다.\n입력 중이던 페이지로 이동합니다.'
          );
          fetch(`${IP}estimates`, {
            headers: {
              Authorization: localStorage.getItem('access_token'),
            },
          })
            .then(res => res.json())
            .then(data => {
              setUserInputMileage(data.results.mileage);
              // selectedOptions[0].state(data.results.sunroof);
              // selectedOptions[1].state(data.results.navigation);
              // selectedOptions[2].state(data.results.ventilation_seat);
              // selectedOptions[3].state(data.results.heated_seat);
              // selectedOptions[4].state(data.results.electric_seat);
              // selectedOptions[5].state(data.results.smart_key);
              // selectedOptions[6].state(data.results.leather_seat);
              // selectedOptions[7].state(data.results.electric_folding_mirror);
              setUserInputInsurance(data.results.accident_status);
              setKeyAmount(data.results.spare_key);
              setWheelScratchAmount(data.results.wheel_scratch);
              setPanelScratchAmount(data.results.outer_plate_scratch);
              setUserInputRepair(data.results.other_maintenance_repair);
              setUserInputEtc(data.results.other_special);
              setUserInputAddress(data.results.address);
              setUserInputPhoneNumber(data.results.phone_number);
            });

          setUserEstimateProcess(data.process_state);
          data.process_state === '주행거리' && setCurrentEstimate(3);
          data.process_state === '추가옵션' && setCurrentEstimate(4);
          data.process_state === '추가입력' && setCurrentEstimate(5);
          data.process_state === '사진등록' && setCurrentEstimate(6);
          data.process_state === '개인정보' && setCurrentEstimate(7);
          navigate('/sellcar');
        }
        // 견적서가 없을 경우
        if (data.message === 'SUCCESS_ESTIMATE_REQUIRED') {
          localStorage.setItem(`access_token`, data.access_token);
          navigate('/sellcar');
        }
        // DB에 입력된 차량번호와 소유주명이 맞지 않을 경우
        if (data.message === 'MY_CAR_NOT_PRESENT_CAR_NUMBER') {
          alert('소유자명을 확인해주세요');
        }
      });
  };

  return (
    <Background>
      <BodyWrapper>
        {isLoginModal && <LoginModal />}
        {loginProcess === 1 && (
          <LoginWrap>
            <ContentBox>
              <LoginTitle>차량번호 입력만으로</LoginTitle>
              <LoginSubTitle>
                내 차 시세조회와 <br />
                견적요청까지 한번에 🙌
              </LoginSubTitle>
              <InputWrapper>
                <LoginInput
                  onChange={handleInputCarNumber}
                  type="text"
                  id="id"
                  placeholder="12가3456"
                  value={inputCarNumber}
                />
                <InputMessage>
                  {inputCarNumber.length > 1 && !isLogin && (
                    <>
                      <FailIcon />
                      유효하지 않은 차량번호입니다
                    </>
                  )}
                  {inputCarNumber.length === 0 && (
                    <GuideMessage>차량 번호를 입력해주세요</GuideMessage>
                  )}
                  {isLogin && (
                    <SuccessMessage>
                      <SuccessIcon />
                      시작하기를 눌러보세요 !
                    </SuccessMessage>
                  )}
                </InputMessage>
              </InputWrapper>
              <LoginButton disabled={!isLogin} onClick={startLogin}>
                시작하기
              </LoginButton>
              <GotoAdmin onClick={handleAdmin}>
                <AdminText>관리자 페이지로 이동</AdminText>
              </GotoAdmin>
            </ContentBox>
          </LoginWrap>
        )}
        {loginProcess === 2 && (
          <InputOwnerWrapper>
            <ContentBox>
              <ContentTitle>
                {inputCarNumber} <br />
                소유자명을 입력해주세요
              </ContentTitle>
              <InputBox
                placeholder="홍길동"
                onChange={e => getUserInputOwner(e)}
                value={userInputOwner}
              />
              <ButtonSet>
                <PrevButton
                  onClick={() => setLoginProcess(prev => prev - 1)}
                  variant="primary"
                >
                  이전
                </PrevButton>
                <NextButton onClick={checkUser} variant="primary">
                  다음
                </NextButton>
              </ButtonSet>
            </ContentBox>
          </InputOwnerWrapper>
        )}
      </BodyWrapper>
    </Background>
  );
}
export default Login;

const InputWrapper = styled.div`
  margin: 0 auto;
  width: 70%;
  position: relative;

  @media only screen and (max-width: 640px) {
    width: 100%;
  }
`;

const InputOwnerWrapper = styled.div`
  width: 100%;
  height: fit-content;
  position: absolute;
  text-align: left;
  top: 5vh;
  box-shadow: 0px 0px 8px rgba(8, 94, 214, 0.05);

  @media only screen and (max-width: 640px) {
    width: 90%;
  }
`;

const LoginWrap = styled.div`
  width: 100%;
  height: fit-content;
  position: absolute;
  text-align: left;
  top: 5vh;
  text-align: center;
  box-shadow: 0px 0px 8px rgba(8, 94, 214, 0.05);

  @media only screen and (max-width: 640px) {
    width: 90%;
  }
`;

const LoginTitle = styled.p`
  color: ${({ theme }) => theme.colors.primaryBlue};
  margin-bottom: 1rem;
  font-weight: 600;
  font-size: xx-large;

  @media only screen and (max-width: 640px) {
    font-size: 28px;
  }
`;

const LoginSubTitle = styled.p`
  font-size: x-large;
  font-weight: 500;
  margin-bottom: 3rem;
  line-height: 1.8rem;
  color: ${({ theme }) => theme.colors.darkGray};

  @media only screen and (max-width: 640px) {
    font-size: 22px;
  }
`;

const InputMessage = styled.div`
  ${({ theme }) => theme.flex.flexBox}
  position: absolute;
  left: 0;
  margin: 0.5rem 0 0 0;
  font-size: small;
  color: ${({ theme }) => theme.colors.heartPink};
`;

const FailIcon = styled(RiAlertFill)`
  margin-right: 0.2rem;
`;

const GuideMessage = styled.div`
  color: ${({ theme }) => theme.colors.gray};
`;

const SuccessMessage = styled.div`
  ${({ theme }) => theme.flex.flexBox}
  color: ${({ theme }) => theme.colors.primaryBlue};
`;

const SuccessIcon = styled(BsPatchCheckFill)`
  margin-right: 0.2rem;
`;

const LoginInput = styled.input`
  width: 100%;
  height: 5rem;
  border: 1px solid ${({ theme }) => theme.colors.disabled};
  border-radius: 5px;
  padding: 1em;
  font-weight: 600;
  font-size: xx-large;

  :focus {
    outline: none;
  }

  ::placeholder {
    word-spacing: 2px;
    opacity: 0.3;
  }

  @media only screen and (max-width: 640px) {
    width: 100%;
  }
`;

const LoginButton = styled(Button)`
  width: 70%;
  height: 3rem;
  border-radius: 100rem;
  margin-top: 5rem;
  font-weight: 600;

  @media only screen and (max-width: 640px) {
    width: 100%;
  }
`;

const GotoAdmin = styled.div`
  ${({ theme }) => theme.flex.flexBox}
  margin-top: 2rem;
  font-size: small;
  cursor: pointer;
`;

const AdminText = styled.p`
  font-weight: 500;
  color: ${({ theme }) => theme.colors.skyMint};
  opacity: 0.4;
  transition: all ease-in-out 100ms;

  &:hover {
    opacity: 1;
  }
`;

const BodyWrapper = styled.div`
  ${({ theme }) => theme.flex.flexBox('column')}
  position: relative;
  width: 640px;
  height: 100%;
`;

const Background = styled.div`
  ${({ theme }) => theme.flex.flexBox}
  width: 100vw;
  height: 95vh;
  background-color: aliceblue;
`;
