import React, { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';
import { BsCheckSquareFill, BsCheckSquare } from 'react-icons/bs';
import {
  ButtonSet,
  NextButton,
  PrevButton,
  ContentBox,
  ContentTitle,
  InputBox,
  NoOptionWrapper,
  NoOption,
} from '../Style';
import {
  userInputInsuranceState,
  insuranceState,
  wheelScratchState,
  keyAmountState,
  wheelScratchAmountState,
  panelScratchState,
  panelScratchAmountState,
  repairState,
  userInputRepairState,
  userInputEtcState,
  etcState,
} from '../../../atoms';

const AddInfo = ({ nextProcess, prevProcess }) => {
  const [userInputInsurance, setUserInputInsurance] = useRecoilState(
    userInputInsuranceState
  );
  const [isInsurance, setIsInsurance] = useRecoilState(insuranceState);
  const [keyAmount, setKeyAmount] = useRecoilState(keyAmountState);
  const [isWheelScratch, setIsWheelScratch] = useRecoilState(wheelScratchState);
  const [wheelScratchAmount, setWheelScratchAmount] = useRecoilState(
    wheelScratchAmountState
  );
  const [isPanelScratch, setIsPanelScratch] = useRecoilState(panelScratchState);
  const [panelScratchAmount, setPanelScratchAmount] = useRecoilState(
    panelScratchAmountState
  );
  const [userInputRepair, setUserInputRepair] =
    useRecoilState(userInputRepairState);
  const [isRepair, setIsRepair] = useRecoilState(repairState);
  const [userInputEtc, setUserInputEtc] = useRecoilState(userInputEtcState);
  const [isEtc, setIsEtc] = useRecoilState(etcState);

  // 보험 외 사고처리 관련 함수
  const handleInsurance = () => {
    setIsInsurance(prev => !prev);
    setUserInputInsurance('');
  };

  const inputInsurance = e => {
    setUserInputInsurance(e.target.value);
  };

  const CheckInsurance = () => {
    userInputInsurance === '' ? setIsInsurance(true) : setIsInsurance(false);
  };

  // 보조키 관련 함수
  const decreaseKeyAmount = () => {
    keyAmount > 1
      ? setKeyAmount(prev => prev - 1)
      : alert('키는 1개 이상이어야 합니다.');
  };

  const increaseKeyAmount = () => {
    setKeyAmount(prev => prev + 1);
  };

  // 휠 스크래치 관련 함수
  const handleWheelScratch = () => {
    setIsWheelScratch(prev => !prev);
    setWheelScratchAmount(0);
  };

  const CheckWheelScratch = () => {
    wheelScratchAmount === 0
      ? setIsWheelScratch(true)
      : setIsWheelScratch(false);
  };

  const decreaseWheelScratchAmount = () => {
    wheelScratchAmount > 0
      ? setWheelScratchAmount(prev => prev - 1)
      : alert('스크래치는 음수일 수 없습니다.');
  };

  const increaseWheelScratchAmount = () => {
    setWheelScratchAmount(prev => prev + 1);
  };

  // 외판 스크래치 관련 함수
  const handlePanelScratch = () => {
    setIsPanelScratch(prev => !prev);
    setPanelScratchAmount(0);
  };

  const CheckPanelScratch = () => {
    panelScratchAmount === 0
      ? setIsPanelScratch(true)
      : setIsPanelScratch(false);
  };

  const decreasePanelScratchAmount = () => {
    panelScratchAmount > 0
      ? setPanelScratchAmount(prev => prev - 1)
      : alert('스크래치는 음수일 수 없습니다.');
  };

  const increasePanelScratchAmount = () => {
    setPanelScratchAmount(prev => prev + 1);
  };

  // 정비 필요사항 관련 함수
  const handleRepair = () => {
    setIsRepair(prev => !prev);
    setUserInputRepair('');
  };

  const inputRepair = e => {
    setUserInputRepair(e.target.value);
  };

  const CheckRepair = () => {
    userInputRepair === '' ? setIsRepair(true) : setIsRepair(false);
  };

  // 특이사항 관련 함수
  const handleEtc = () => {
    setIsEtc(prev => !prev);
    setUserInputEtc('');
  };

  const inputEtc = e => {
    setUserInputEtc(e.target.value);
  };

  const CheckEtc = () => {
    userInputEtc === '' ? setIsEtc(true) : setIsEtc(false);
  };

  useEffect(() => {
    CheckInsurance();
    CheckWheelScratch();
    CheckPanelScratch();
    CheckRepair();
    CheckEtc();
  }, [
    [
      userInputInsurance,
      wheelScratchAmount,
      CheckPanelScratch,
      CheckRepair,
      CheckEtc,
    ],
  ]);

  return (
    <ContentsBox>
      <ContentsWrapper>
        <ContentTitle>추가 정보</ContentTitle>

        <ContentWrapper>
          <SubTitle>보험 외 사고 처리를 하신 적이 있다면 알려주세요</SubTitle>
          <InputBox onChange={inputInsurance} value={userInputInsurance} />
          <NoOptionWrapper>
            <NoOption onClick={handleInsurance}>
              {isInsurance ? <BsCheckSquareFill /> : <BsCheckSquare />}
              <span>보험 외 사고 처리를 한 적이 없어요</span>
            </NoOption>
          </NoOptionWrapper>
        </ContentWrapper>

        <ContentWrapper>
          <SubTitle>소유하신 키 갯수를 알려주세요</SubTitle>
          <InputWrapper>
            <button onClick={decreaseKeyAmount}>-</button>
            <CountInputBox placeholder="2" type="number" value={keyAmount} />
            <button onClick={increaseKeyAmount}>+</button>
          </InputWrapper>
        </ContentWrapper>

        <ContentWrapper>
          <SubTitle>휠 스크래치</SubTitle>
          <InputWrapper>
            <button onClick={decreaseWheelScratchAmount}>-</button>
            <CountInputBox
              placeholder="0"
              type="number"
              value={wheelScratchAmount}
            />
            <button onClick={increaseWheelScratchAmount}>+</button>
          </InputWrapper>
          <NoOptionWrapper>
            <NoOption onClick={handleWheelScratch}>
              {isWheelScratch ? <BsCheckSquareFill /> : <BsCheckSquare />}
              <span>휠 스크래치가 없어요</span>
            </NoOption>
          </NoOptionWrapper>
        </ContentWrapper>

        <ContentWrapper>
          <SubTitle>외판 스크래치</SubTitle>
          <InputWrapper>
            <button onClick={decreasePanelScratchAmount}>-</button>
            <CountInputBox
              placeholder="0"
              type="number"
              value={panelScratchAmount}
            />
            <button onClick={increasePanelScratchAmount}>+</button>
          </InputWrapper>
          <NoOptionWrapper>
            <NoOption onClick={handlePanelScratch}>
              {isPanelScratch ? <BsCheckSquareFill /> : <BsCheckSquare />}
              <span>외판 스크래치가 없어요</span>
            </NoOption>
          </NoOptionWrapper>
        </ContentWrapper>

        <ContentWrapper>
          <SubTitle>정비 필요사항</SubTitle>
          <InputBox onChange={inputRepair} value={userInputRepair} />
          <NoOptionWrapper>
            <NoOption onClick={handleRepair}>
              {isRepair ? <BsCheckSquareFill /> : <BsCheckSquare />}
              <span>잘 모르겠거나 정비 필요사항이 없어요</span>
            </NoOption>
          </NoOptionWrapper>
        </ContentWrapper>

        <ContentWrapper>
          <SubTitle>특이사항</SubTitle>
          <InputBox onChange={inputEtc} value={userInputEtc} />
          <NoOptionWrapper>
            <NoOption onClick={handleEtc}>
              {isEtc ? <BsCheckSquareFill /> : <BsCheckSquare />}
              <span>특이사항이 없어요</span>
            </NoOption>
          </NoOptionWrapper>
        </ContentWrapper>

        <ButtonSet>
          <PrevButton onClick={prevProcess} variant="primary">
            이전
          </PrevButton>
          <NextButton onClick={nextProcess} variant="primary">
            다음
          </NextButton>
        </ButtonSet>
      </ContentsWrapper>
    </ContentsBox>
  );
};

export default AddInfo;

const InputWrapper = styled.div`
  width: 100%;

  button {
    width: 1.5rem;
    height: 1.5rem;
    border: 1px solid ${({ theme }) => theme.colors.primaryBlue};
    border-radius: 0.2rem;
    background-color: white;
    color: ${({ theme }) => theme.colors.primaryBlue};
    font-weight: 600;

    &:hover {
      opacity: 0.5;
    }
  }
`;

const CountInputBox = styled(InputBox)`
  width: 20%;
  margin: 0.5rem 1rem;
  text-align: center;

  ::placeholder {
    color: rgba(0, 0, 0, 0.2);
    text-align: center;
  }
`;

const ContentsBox = styled(ContentBox)`
  height: 76vh;
`;

const ContentsWrapper = styled.div`
  height: 100%;
  overflow: scroll;
`;

const ContentWrapper = styled.div`
  margin-bottom: 2rem;
  padding-bottom: 1.8rem;
  border-bottom: 1px solid #eee;
`;

const SubTitle = styled.h5`
  margin-bottom: 0.5rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.gray};
`;
