import React from 'react';
import { ProgressBar } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { MdOutlineNavigateNext } from 'react-icons/md';
import { useRecoilState } from 'recoil';
import { currentEstimateState, lastEstimateState } from '../../atoms';
import styled, { css } from 'styled-components';
import CarInfo from './States/CarInfo';
import Price from './States/Price';
import Mileage from './States/Mileage';
import Options from './States/Options';
import AddInfo from './States/AddInfo';
import Photo from './States/Photo';
import Contact from './Contact';
import Confirm from './Confirm';

const Estimate = () => {
  const [currentEstimate, setCurrentEstimate] =
    useRecoilState(currentEstimateState);
  const [lastEstimate, setLastEstimate] = useRecoilState(lastEstimateState);

  const prevProcess = () => {
    setCurrentEstimate(prev => prev - 1);
  };

  const nextProcess = () => {
    setCurrentEstimate(prev => prev + 1);
    lastEstimate <= currentEstimate && setLastEstimate(currentEstimate + 1);
  };

  const goToProcess = id => {
    id > 2 && lastEstimate && setCurrentEstimate(id);
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
          {currentEstimate === 1 && <Price nextProcess={nextProcess} />}
          {currentEstimate === 2 && <Mileage prevProcess={prevProcess} />}
          {currentEstimate === 3 && <Options prevProcess={prevProcess} />}
          {currentEstimate === 4 && <AddInfo prevProcess={prevProcess} />}
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
