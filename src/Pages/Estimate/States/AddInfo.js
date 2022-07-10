import React from 'react';
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
} from '../Style';
import { insuranceState, keyAmountState } from '../../../atoms';

const AddInfo = ({ nextProcess, prevProcess }) => {
  const [isInsurance, setIsInsurance] = useRecoilState(insuranceState);
  const [keyAmount, setKeyAmount] = useRecoilState(keyAmountState);

  const decreaseKeyAmount = () => {
    keyAmount > 1
      ? setKeyAmount(prev => prev - 1)
      : alert('키는 1개 이상이어야 합니다.');
  };

  const increaseKeyAmount = () => {
    setKeyAmount(prev => prev + 1);
  };

  return (
    <ContentsBox>
      <ContentsWrapper>
        <ContentTitle>추가 정보</ContentTitle>
        <ContentWrapper>
          <SubTitle>보험 외 사고 처리를 하신 적이 있다면 알려주세요</SubTitle>
          <InputBox />
          <CheckBox onClick={setKeyAmount(prev => !prev)}>
            {isInsurance ? <BsCheckSquareFill /> : <BsCheckSquare />}
            <button>보험 외 사고 처리를 한 적이 없어요</button>
          </CheckBox>
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
          <InputBox />
          <button>휠 스크래치가 없어요</button>
        </ContentWrapper>
        <ContentWrapper>
          <SubTitle>외판 스크래치</SubTitle>
          <InputBox />
          <button>외판 스크래치가 없어요</button>
        </ContentWrapper>
        <ContentWrapper>
          <SubTitle>정비 필요사항</SubTitle>
          <InputBox />
          <button>잘 모르겠거나 정비 필요사항이 없어요</button>
        </ContentWrapper>
        <ContentWrapper>
          <SubTitle>특이사항</SubTitle>
          <InputBox />
          <button>특이사항이 없어요</button>
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

const CheckBox = styled.div`
  border: 1px solid black;
  cursor: pointer;
`;

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
`;

const SubTitle = styled.h5`
  margin-bottom: 0.5rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.gray};
`;
