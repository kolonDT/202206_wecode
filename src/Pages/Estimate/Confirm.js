import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled, { css } from 'styled-components';
import { useRecoilState } from 'recoil';
import { BsCheckSquareFill, BsCheckSquare } from 'react-icons/bs';
import {
  InputButton,
  ContentBox,
  ContentTitle,
  InputBox,
  NoOptionWrapper,
  NoOption,
} from '../Estimate/Style';
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
  UserInputMileageState,
  SelectedOptionsState,
  isAllOptionFalseState,
} from '../../atoms';
import { IP } from '../../Hooks/Fetch';

console.log(SelectedOptionsState);

const Confirm = () => {
  const [userInputMileage, setUserInputMileage] = useRecoilState(
    UserInputMileageState
  );
  const [selectedOptions, setSelectedOptions] =
    useRecoilState(SelectedOptionsState);
  const [isAllOptionFalse, setIsAllOptionFalse] = useRecoilState(
    isAllOptionFalseState
  );
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

  useEffect(() => {
    const falseOptionCheck = () => {
      for (let i = 0; i < selectedOptions.length; i++) {
        if (selectedOptions[i].state === true) {
          setIsAllOptionFalse(false);
          break;
        } else {
          setIsAllOptionFalse(true);
        }
      }
    };
    falseOptionCheck();
  }, [selectedOptions]);

  const handleOption = id => {
    selectedOptions[id].state
      ? setSelectedOptions(prevState => {
          const newState = prevState.map(obj => {
            if (obj.id === id) {
              return { ...obj, state: false };
            }
            return obj;
          });
          return newState;
        })
      : setSelectedOptions(prevState => {
          const newState = prevState.map(obj => {
            if (obj.id === id) {
              return { ...obj, state: true };
            }
            return obj;
          });
          return newState;
        });
  };

  const allOptionsFalse = () => {
    setSelectedOptions(prev => {
      const newArray = prev.map(list => ({ ...list, state: false }));
      return newArray;
    });
  };

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

  const navigate = useNavigate();
  const goToConfirm = () => {
    fetch(`${IP}cars/estimates`, {
      method: 'PATCH',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify({
        process_state: '개인정보',
        mileage: userInputMileage,
        sunroof: selectedOptions[0].state,
        navigation: selectedOptions[1].state,
        ventilation_seat: selectedOptions[2].state,
        heated_seat: selectedOptions[3].state,
        electric_seat: selectedOptions[4].state,
        smart_key: selectedOptions[5].state,
        leather_seat: selectedOptions[6].state,
        electric_folding_mirror: selectedOptions[7].state,
        accident_status: userInputInsurance,
        spare_key: keyAmount,
        wheel_scratch: wheelScratchAmount,
        outer_plate_scratch: panelScratchAmount,
        other_maintenance_repair: userInputRepair,
        other_special: userInputEtc,
        address: '',
        phone_number: '',
      }),
    })
      .then(res => res.json())
      .then(data => {
        data.message === 'SUCCESS'
          ? navigate('/complete')
          : alert('FAIL TO UPLOAD');
      });
  };

  return (
    <ContentsBox>
      <ContentsWrapper>
        <ContentTitle>
          입력한 내용을 확인하시고
          <br /> 견적 요청 버튼을 눌러주세요
        </ContentTitle>

        <ContentWrapper>
          <SubTitle>주행거리</SubTitle>
          <InputWrapper>
            <ConfirmInputBox
              placeholder="12,345"
              onChange={e => setUserInputMileage(e.target.value)}
              value={userInputMileage}
              type="number"
            />
            <span>km</span>
          </InputWrapper>
        </ContentWrapper>

        <ContentWrapper>
          <SubTitle>옵션</SubTitle>
          <OptionContainer>
            {CAR_OPTION.map(({ id, type }) => (
              <OptionBox
                key={id}
                active={selectedOptions[id].state === true}
                onClick={() => {
                  handleOption(id);
                }}
              >
                <OptionText>{type}</OptionText>
              </OptionBox>
            ))}
            <NoOptionWrapper>
              <NoOption onClick={allOptionsFalse}>
                {isAllOptionFalse ? <BsCheckSquareFill /> : <BsCheckSquare />}
                <span>옵션이 없어요</span>
              </NoOption>
            </NoOptionWrapper>
          </OptionContainer>
        </ContentWrapper>

        <ContentWrapper>
          <SubTitle>보험 외 사고 처리</SubTitle>
          <ConfirmInputBox
            onChange={inputInsurance}
            value={userInputInsurance}
          />
          <NoOptionWrapper>
            <NoOption onClick={handleInsurance}>
              {isInsurance ? <BsCheckSquareFill /> : <BsCheckSquare />}
              <span>보험 외 사고 처리를 한 적이 없어요</span>
            </NoOption>
          </NoOptionWrapper>
        </ContentWrapper>

        <ContentWrapper>
          <SubTitle>보조 키 갯수</SubTitle>
          <InputWrapper>
            <ConfirmInputBox placeholder="2" type="number" value={keyAmount} />
            <ButtonWrapper>
              <button onClick={decreaseKeyAmount}>-</button>
              <button onClick={increaseKeyAmount}>+</button>
            </ButtonWrapper>
          </InputWrapper>
        </ContentWrapper>

        <ContentWrapper>
          <SubTitle>휠 스크래치</SubTitle>
          <InputWrapper>
            <ConfirmInputBox
              placeholder="0"
              type="number"
              value={wheelScratchAmount}
            />
            <ButtonWrapper>
              <button onClick={decreaseWheelScratchAmount}>-</button>
              <button onClick={increaseWheelScratchAmount}>+</button>
            </ButtonWrapper>
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
            <ConfirmInputBox
              placeholder="0"
              type="number"
              value={panelScratchAmount}
            />
            <ButtonWrapper>
              <button onClick={decreasePanelScratchAmount}>-</button>
              <button onClick={increasePanelScratchAmount}>+</button>
            </ButtonWrapper>
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
          <ConfirmInputBox onChange={inputRepair} value={userInputRepair} />
          <NoOptionWrapper>
            <NoOption onClick={handleRepair}>
              {isRepair ? <BsCheckSquareFill /> : <BsCheckSquare />}
              <span>잘 모르겠거나 정비 필요사항이 없어요</span>
            </NoOption>
          </NoOptionWrapper>
        </ContentWrapper>

        <ContentWrapper>
          <SubTitle>특이사항</SubTitle>
          <ConfirmInputBox onChange={inputEtc} value={userInputEtc} />
          <NoOptionWrapper>
            <NoOption onClick={handleEtc}>
              {isEtc ? <BsCheckSquareFill /> : <BsCheckSquare />}
              <span>특이사항이 없어요</span>
            </NoOption>
          </NoOptionWrapper>
        </ContentWrapper>

        <InputButton onClick={goToConfirm} variant="primary">
          견적 요청
        </InputButton>
      </ContentsWrapper>
    </ContentsBox>
  );
};

export default Confirm;

const OptionContainer = styled.div`
  ${({ theme }) => theme.flex.flexBox}
  flex-wrap: wrap;
  height: fit-content;
  margin-top: 1rem;
`;

const OptionBox = styled.div`
  ${({ theme }) => theme.flex.flexBox}
  width: 23%;
  margin: 0 1.5% 1.5% 0;
  padding: 8% 0;
  border: 1px solid rgba(8, 94, 214, 0.2);
  border-radius: 0.5rem;
  text-align: center;
  transition: border ease-in-out 150ms;
  cursor: pointer;

  @media only screen and (max-width: 640px) {
    padding: 6% 0;
  }

  button {
    color: rgba(8, 94, 214, 0.5);
    transition: color ease-in-out 150ms;
  }

  &:hover {
    border: 1px solid ${({ theme }) => theme.colors.primaryBlue};

    button {
      color: ${({ theme }) => theme.colors.primaryBlue};
    }
  }

  ${props =>
    props.active &&
    css`
      background-color: aliceblue;
      border: 1.5px solid ${({ theme }) => theme.colors.primaryBlue};

      button {
        color: ${({ theme }) => theme.colors.primaryBlue};
      }

      &:hover {
        border: 1.5px solid ${({ theme }) => theme.colors.primaryBlue};
      }
    `}
`;

const OptionText = styled.button`
  font-weight: 600;
  height: 2rem;
  position: relative;
  border: 0;
  background: 0;

  @media only screen and (max-width: 640px) {
    font-size: 65%;
  }
`;

const CAR_OPTION = [
  { id: 0, type: '선루프', state: false },
  { id: 1, type: '내비게이션', state: false },
  { id: 2, type: '통풍시트', state: false },
  { id: 3, type: '열선시트', state: false },
  { id: 4, type: '전동시트', state: false },
  { id: 5, type: '스마트키', state: false },
  { id: 6, type: '가죽시트', state: false },
  { id: 7, type: '전동접이미러', state: false },
];

const ConfirmInputBox = styled(InputBox)`
  border: 0;
  border-bottom: 1px solid ${({ theme }) => theme.colors.disabled};
`;

const ButtonWrapper = styled.div`
  position: absolute;
  right: 3%;
  margin-top: 0.5rem;
`;

const InputWrapper = styled.div`
  display: flex;
  position: relative;
  width: 100%;

  span {
    position: absolute;
    right: 3%;
    margin-top: 1rem;
    font-weight: 500;
    color: ${({ theme }) => theme.colors.gray};
  }

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

const ContentWrapper = styled.div`
  margin-bottom: 1.2rem;
  padding-bottom: 0.8rem;
`;

const SubTitle = styled.h5`
  margin-bottom: 0.3rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.gray};
`;

const ContentsWrapper = styled.div`
  height: 100%;
  overflow: scroll;
`;

const ContentsBox = styled(ContentBox)`
  height: 85vh;
`;
