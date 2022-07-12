import React, { useEffect } from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';
import styled, { css } from 'styled-components';
import { BsCheckSquareFill, BsCheckSquare } from 'react-icons/bs';
import {
  SelectedOptionsState,
  isAllOptionFalseState,
  currentEstimateState,
  lastEstimateState,
  userEstimateProcessState,
} from '../../../atoms';
import {
  ButtonSet,
  NextButton,
  PrevButton,
  ContentBox,
  ContentTitle,
  NoOptionWrapper,
  NoOption,
} from '../Style';
import { IP } from '../../../Hooks/Fetch';

const Options = ({ prevProcess }) => {
  const [selectedOptions, setSelectedOptions] =
    useRecoilState(SelectedOptionsState);
  const [isAllOptionFalse, setIsAllOptionFalse] = useRecoilState(
    isAllOptionFalseState
  );
  const [currentEstimate, setCurrentEstimate] =
    useRecoilState(currentEstimateState);
  const [lastEstimate, setLastEstimate] = useRecoilState(lastEstimateState);

  const setUserEstimateProcess = useSetRecoilState(userEstimateProcessState);

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

  const goToAddInfo = () => {
    setUserEstimateProcess('추가옵션');

    fetch(`${IP}estimates`, {
      method: 'PATCH',
      headers: {
        Authorization: localStorage.getItem('access_token'),
      },
      body: JSON.stringify({
        process_state: '추가옵션',
        sunroof: selectedOptions[0].state,
        navigation: selectedOptions[1].state,
        ventilation_seat: selectedOptions[2].state,
        heated_seat: selectedOptions[3].state,
        electric_seat: selectedOptions[4].state,
        smart_key: selectedOptions[5].state,
        leather_seat: selectedOptions[6].state,
        electric_folding_mirror: selectedOptions[7].state,
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
    <div>
      <ContentBox>
        <ContentTitle>
          차량에 포함 된
          <br /> 옵션을 선택해주세요
        </ContentTitle>
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
        <ButtonSet>
          <PrevButton onClick={prevProcess} variant="primary">
            이전
          </PrevButton>
          <NextButton onClick={goToAddInfo} variant="primary">
            다음
          </NextButton>
        </ButtonSet>
      </ContentBox>
    </div>
  );
};

export default Options;

const OptionContainer = styled.div`
  ${({ theme }) => theme.flex.flexBox}
  flex-wrap: wrap;
  height: fit-content;
`;

const OptionBox = styled.div`
  ${({ theme }) => theme.flex.flexBox}
  width: 23%;
  margin: 0 1.5% 1.5% 0;
  padding: 11% 0;
  border: 1px solid rgba(8, 94, 214, 0.2);
  border-radius: 0.5rem;
  text-align: center;
  transition: border ease-in-out 150ms;
  cursor: pointer;

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
  position: absolute;
  border: 0;
  background: 0;

  @media only screen and (max-width: 640px) {
    font-size: 70%;
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
