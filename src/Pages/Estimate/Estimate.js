import React from 'react';
import { ProgressBar } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { MdOutlineNavigateNext } from 'react-icons/md';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import {
  currentEstimateState,
  lastEstimateState,
  userEstimateProcessState,
  // UserInputMileageState,
  // SelectedOptionsState,
  // userInputInsuranceState,
  // keyAmountState,
  // wheelScratchAmountState,
  // panelScratchAmountState,
  // userInputRepairState,
  // userInputEtcState,
  // userInputPhoneNumberState,
  // userInputAddressState,
} from '../../atoms';
import styled, { css } from 'styled-components';
import CarInfo from './States/CarInfo';
import Price from './States/Price';
import Mileage from './States/Mileage';
import Options from './States/Options';
import AddInfo from './States/AddInfo';
import Photo from './States/Photo';
import Contact from './Contact';
import Confirm from './Confirm';
import { IP } from '../../Hooks/Fetch';

const Estimate = () => {
  const [currentEstimate, setCurrentEstimate] =
    useRecoilState(currentEstimateState);
  const [lastEstimate, setLastEstimate] = useRecoilState(lastEstimateState);

  // const userInputMileage = useRecoilValue(UserInputMileageState);
  // const selectedOptions = useRecoilValue(SelectedOptionsState);
  // const userInputInsurance = useRecoilValue(userInputInsuranceState);
  // const keyAmount = useRecoilValue(keyAmountState);
  // const wheelScratchAmount = useRecoilValue(wheelScratchAmountState);
  // const panelScratchAmount = useRecoilValue(panelScratchAmountState);
  // const userInputRepair = useRecoilValue(userInputRepairState);
  // const userInputEtc = useRecoilValue(userInputEtcState);
  // const userInputPhoneNumber = useRecoilValue(userInputPhoneNumberState);
  // const userInputAddress = useRecoilValue(userInputAddressState);
  const [userEstimateProcess, setUserEstimateProcess] = useRecoilState(
    userEstimateProcessState
  );

  const prevProcess = () => {
    setCurrentEstimate(prev => prev - 1);
  };

  const nextProcess = () => {
    currentEstimate === 2 && setUserEstimateProcess('주행거리');
    currentEstimate === 3 && setUserEstimateProcess('추가옵션');
    currentEstimate === 4 && setUserEstimateProcess('추가입력');
    currentEstimate === 5 && setUserEstimateProcess('사진등록');
    currentEstimate === 6 && setUserEstimateProcess('개인정보');

    // currentEstimate > 1
    //   ? fetch(`${IP}estimates`, {
    //       method: 'PATCH',
    //       headers: {
    //         Authorization: localStorage.getItem('access_token'),
    //       },
    //       body: JSON.stringify({
    //         process_state: userEstimateProcess,
    //         mileage: userInputMileage,
    //         sunroof: selectedOptions[0].state,
    //         navigation: selectedOptions[1].state,
    //         ventilation_seat: selectedOptions[2].state,
    //         heated_seat: selectedOptions[3].state,
    //         electric_seat: selectedOptions[4].state,
    //         smart_key: selectedOptions[5].state,
    //         leather_seat: selectedOptions[6].state,
    //         electric_folding_mirror: selectedOptions[7].state,
    //         accident_status: userInputInsurance,
    //         spare_key: keyAmount,
    //         wheel_scratch: wheelScratchAmount,
    //         outer_plate_scratch: panelScratchAmount,
    //         other_maintenance_repair: userInputRepair,
    //         other_special: userInputEtc,
    //         address: userInputAddress,
    //         phone_number: userInputPhoneNumber,
    //       }),
    //     })
    //       .then(res => res.json())
    //       .then(data => {
    //         if (data.message === 'SUCCESS') {
    //           setCurrentEstimate(prev => prev + 1);
    //           lastEstimate <= currentEstimate &&
    //             setLastEstimate(currentEstimate + 1);
    //         } else {
    //           alert(data);
    //         }
    //       })
    //   :
    setCurrentEstimate(prev => prev + 1);
    lastEstimate <= currentEstimate && setLastEstimate(currentEstimate + 1);
  };

  const goToProcess = id => {
    id <= lastEstimate && setCurrentEstimate(id);
  };

  return (
    <Background>
      <BodyWrapper>
        <EstimateWrapper>
          {currentEstimate < 6 && (
            <ProcessBox>
              <ProcessState>
                {PROCESS_STATE.map(
                  ({ id, step, name }) =>
                    step === 'carInfo' && (
                      <CurrentProcess
                        key={id}
                        active={currentEstimate + 1 === id}
                        onClick={() => goToProcess(id - 1)}
                      >
                        {name}
                        {id !== PROCESS_STATE.length - 2 && <NextIcon />}
                      </CurrentProcess>
                    )
                )}
              </ProcessState>
              <PercentageBar
                now={5 + (currentEstimate / (PROCESS_STATE.length - 2)) * 100}
              />
            </ProcessBox>
          )}
          {currentEstimate === 0 && <CarInfo nextProcess={nextProcess} />}
          {currentEstimate === 1 && (
            <Price prevProcess={prevProcess} nextProcess={nextProcess} />
          )}
          {currentEstimate === 2 && <Mileage prevProcess={prevProcess} />}
          {currentEstimate === 3 && (
            <Options prevProcess={prevProcess} nextProcess={nextProcess} />
          )}
          {currentEstimate === 4 && (
            <AddInfo prevProcess={prevProcess} nextProcess={nextProcess} />
          )}
          {currentEstimate === 5 && (
            <Photo prevProcess={prevProcess} nextProcess={nextProcess} />
          )}
          {currentEstimate === 6 && (
            <Contact prevProcess={prevProcess} nextProcess={nextProcess} />
          )}
          {currentEstimate === 7 && <Confirm />}
        </EstimateWrapper>
      </BodyWrapper>
    </Background>
  );
};

export default Estimate;

const ProcessBox = styled.article`
  ${({ theme }) => theme.flex.flexBox('column')}
  height: 5rem;
  padding: 1rem;
  background-color: ${({ theme }) => theme.colors.white};
  position: relative;
`;

const ProcessState = styled.div`
  ${({ theme }) => theme.flex.flexBox}
`;

const CurrentProcess = styled.button`
  ${({ theme }) => theme.flex.flexBox}
  border: 0;
  background: 0;
  padding: 0;
  font-size: medium;
  cursor: pointer;

  color: ${({ theme }) => theme.colors.gray};

  &:last-child {
    margin-right: 0;
  }

  ${({ active }) =>
    active &&
    css`
      color: ${({ theme }) => theme.colors.primaryBlue};
      font-weight: bold;
    `}
`;

const NextIcon = styled(MdOutlineNavigateNext)`
  font-size: medium;
  margin: 0 0.3rem;
  cursor: auto;
`;

const PercentageBar = styled(ProgressBar)`
  width: 100%;
  height: 5px;
  border-radius: 0;
  position: absolute;
  bottom: 0;
`;

const EstimateWrapper = styled.section`
  width: 100%;
  height: fit-content;
  position: absolute;
  top: 5vh;
  box-shadow: 0px 0px 8px rgba(8, 94, 214, 0.05);
`;

const BodyWrapper = styled.div`
  ${({ theme }) => theme.flex.flexBox('column')}
  position: relative;
  width: 640px;
  height: 100%;

  @media only screen and (max-width: 640px) {
    width: 90%;
  }
`;

const Background = styled.div`
  ${({ theme }) => theme.flex.flexBox('column')}
  width: 100vw;
  height: 95vh;
  background: aliceblue;
`;

const PROCESS_STATE = [
  {
    id: 1,
    step: 'carInfo',
    name: '차량정보',
  },
  {
    id: 2,
    step: 'carInfo',
    name: '예상시세',
  },
  {
    id: 3,
    step: 'carInfo',
    name: '주행거리',
  },
  {
    id: 4,
    step: 'carInfo',
    name: '선택옵션',
  },
  {
    id: 5,
    step: 'carInfo',
    name: '추가정보',
  },
  {
    id: 6,
    step: 'carInfo',
    name: '사진등록',
  },
  {
    id: 7,
    step: 'contactInfo',
    name: '개인정보입력',
  },
  {
    id: 8,
    step: 'confirm',
    name: '입력정보확인',
  },
];
