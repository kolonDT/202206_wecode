import React, { useEffect } from 'react';
import { ProgressBar } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { MdOutlineNavigateNext } from 'react-icons/md';
import { useRecoilState, useSetRecoilState } from 'recoil';
import {
  currentEstimateState,
  lastEstimateState,
  EstimateCarInfo,
  EstimateCarOption,
} from '../../atoms';
import styled, { css } from 'styled-components';
import StateZero from './States/StateZero';
import StateOne from './States/StateOne';
import StateTwo from './States/StateTwo';
import StateThree from './States/StateThree';
import StateFour from './States/StateFour';
import StateFive from './States/StateFive';
import AddContactInfo from './AddContactInfo';

const Estimate = () => {
  const [currentEstimate, setCurrentEstimate] =
    useRecoilState(currentEstimateState);
  const setEstimateCarInfo = useSetRecoilState(EstimateCarInfo);
  const setEstimateCarOption = useSetRecoilState(EstimateCarOption);
  const [lastEstimate, setLastEstimate] = useRecoilState(lastEstimateState);

  useEffect(() => {
    fetch('http://localhost:3000/Data/Dino/carData.json')
      .then(res => res.json())
      .then(data => {
        setEstimateCarInfo(data);
      });
  }, []);

  useEffect(() => {
    fetch('http://localhost:3000/Data/Dino/carOption.json')
      .then(res => res.json())
      .then(data => {
        setEstimateCarOption(data);
      });
  }, []);

  const nextProcess = () => {
    setCurrentEstimate(prev => prev + 1);
    lastEstimate <= currentEstimate && setLastEstimate(currentEstimate + 1);
  };

  const prevProcess = () => {
    setCurrentEstimate(prev => prev - 1);
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
                        {id !== PROCESS_STATE.length - 1 && <NextIcon />}
                      </CurrentProcess>
                    )
                )}
              </ProcessState>
              <PercentageBar
                now={5 + (currentEstimate / (PROCESS_STATE.length - 1)) * 100}
              />
            </ProcessBox>
          )}
          {/* STATE 0 : 차량정보 확인 */}
          {currentEstimate === 0 && <StateZero nextProcess={nextProcess} />}
          {/* STATE 1 : 예상시세 표출 */}
          {currentEstimate === 1 && (
            <StateOne prevProcess={prevProcess} nextProcess={nextProcess} />
          )}
          {/* STATE 2 : 주행거리 입력 */}
          {currentEstimate === 2 && (
            <StateTwo prevProcess={prevProcess} nextProcess={nextProcess} />
          )}
          {/* STATE 3 : 추가옵션 입력 */}
          {currentEstimate === 3 && (
            <StateThree prevProcess={prevProcess} nextProcess={nextProcess} />
          )}
          {/* STATE 4 : 추가정보 입력 */}
          {currentEstimate === 4 && (
            <StateFour prevProcess={prevProcess} nextProcess={nextProcess} />
          )}
          {/* STATE 5 : 사진등록 */}
          {currentEstimate === 5 && (
            <StateFive prevProcess={prevProcess} nextProcess={nextProcess} />
          )}
          {/* STATE 6 : Contact Info 입력 */}
          {currentEstimate === 6 && (
            <AddContactInfo
              prevProcess={prevProcess}
              nextProcess={nextProcess}
            />
          )}
        </EstimateWrapper>
      </BodyWrapper>
    </Background>
  );
};

export default Estimate;

const ProcessBox = styled.section`
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

const EstimateWrapper = styled.div`
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
  height: 100vh;

  @media only screen and (max-width: 640px) {
    width: 90%;
  }
`;

const Background = styled.div`
  ${({ theme }) => theme.flex.flexBox}
  width: 100vw;
  height: fit-content;
  background-color: aliceblue;
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
    name: '추가옵션',
  },
  {
    id: 5,
    step: 'carInfo',
    name: '추가입력',
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
];
