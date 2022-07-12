import React from 'react';
import Post from '../Estimate/Post/Post';
import styled from 'styled-components';
import {
  ButtonSet,
  NextButton,
  PrevButton,
  ContentBox,
  ContentTitle,
  InputBox,
} from './Style';

const AddContactInfo = ({ nextProcess, prevProcess }) => {
  return (
    <ContentsBox>
      <ContentTitle>
        딜러의 방문 상담을 위해
        <br /> 연락처와 주소를 확인해주세요
      </ContentTitle>

      <InputWrapper>
        <ContactInputWrapper>
          <InputTitle>연락처</InputTitle>
          <InputBox placeholder="010-1234-5678" />
        </ContactInputWrapper>

        <AddressInputWrapper>
          <InputTitle>주소</InputTitle>
          <Post />
        </AddressInputWrapper>
      </InputWrapper>

      <ButtonSet>
        <PrevButton onClick={prevProcess} variant="primary">
          이전
        </PrevButton>
        <NextButton onClick={nextProcess} variant="primary">
          다음
        </NextButton>
      </ButtonSet>
    </ContentsBox>
  );
};

export default AddContactInfo;

const InputWrapper = styled.article`
  height: 69%;
  overflow: scroll;
`;

const ContactInputWrapper = styled.section`
  margin: 1rem 0 2rem 0;
`;

const InputTitle = styled.p`
  font-weight: 600;
  margin-bottom: 1rem;
  color: ${({ theme }) => theme.colors.darkGray};
`;

const AddressInputWrapper = styled.section`
  margin: 1rem 0;
`;

const ContentsBox = styled(ContentBox)`
  height: 85vh;
`;
