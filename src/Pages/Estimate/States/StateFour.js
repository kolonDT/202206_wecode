import React from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import styled from 'styled-components';
import {
  currentEstimateState,
  EstimateCarOption,
  SelectedOptionsState,
} from '../../../atoms';
import {
  ButtonSet,
  NextButton,
  PrevButton,
  ContentBox,
  ContentTitle,
} from './CarInfoStyle';

const StateFour = ({ nextProcess, prevProcess }) => {
  const currentEstimate = useRecoilValue(currentEstimateState);
  const estimateCarOption = useRecoilValue(EstimateCarOption);
  const [selectedOptions, setSelectedOption] =
    useRecoilState(SelectedOptionsState);

  const handleOption = idx => {
    let temp_selectedOptions = { ...selectedOptions };
    let temp_element = { ...temp_selectedOptions[idx] };

    temp_element.state === true
      ? (temp_element.state = false)
      : (temp_element.state = true);

    temp_selectedOptions[idx] = temp_element;
    setSelectedOption(temp_selectedOptions);
  };

  return (
    <div>
      {currentEstimate === 4 && (
        <ContentBox>
          <ContentTitle>
            차량에 포함 된
            <br /> 옵션을 선택해주세요
          </ContentTitle>
          <OptionContainer>
            {Object.keys(estimateCarOption).map((entrie, idx) => (
              <OptionBox
                key={idx}
                onClick={() => {
                  handleOption(idx, entrie);
                }}
              >
                <OptionText>{entrie}</OptionText>
              </OptionBox>
            ))}
          </OptionContainer>
          <ButtonSet>
            <PrevButton onClick={prevProcess} variant="primary">
              이전
            </PrevButton>
            <NextButton onClick={nextProcess} variant="primary">
              다음
            </NextButton>
          </ButtonSet>
        </ContentBox>
      )}
    </div>
  );
};

export default StateFour;

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
