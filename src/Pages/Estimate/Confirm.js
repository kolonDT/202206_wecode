import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { BsCheckSquareFill, BsCheckSquare } from 'react-icons/bs';
import {
  ContentBox,
  ContentTitle,
  InputBox,
  NoOptionWrapper,
  NoOption,
  InputButton,
} from '../Estimate/Style';

const Confirm = () => {
  const navigate = useNavigate();
  const goToConfirm = () => {
    navigate('/complete');
    //TO DO : DB POST fetch
  };

  return (
    <ContentBox>
      <ContentTitle>
        입력한 내용을 확인하시고
        <br /> 견적 요청 버튼을 눌러주세요
      </ContentTitle>

      <ContentWrapper>
        <SubTitle>보험 외 사고 처리</SubTitle>
        <InputBox onChange={null} value={null} />
      </ContentWrapper>

      <InputButton onClick={goToConfirm} variant="primary">
        견적 요청
      </InputButton>
    </ContentBox>
  );
};

export default Confirm;

const INPUT_DATA = [
  { id: 1, SubTitle: '주행거리', onChange: '', value: '' },
  { id: 2, SubTitle: '보험 외 사고 처리', onChange: '', value: '' },
  { id: 3, SubTitle: '보험 외 사고 처리', onChange: '', value: '' },
];

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
