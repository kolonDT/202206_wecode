import React from 'react';
import Post from '../Estimate/Post/Post';
import styled from 'styled-components';
import { useRecoilState } from 'recoil';
import { userInputPhoneNumberState } from '../../atoms';
import {
  ButtonSet,
  NextButton,
  PrevButton,
  ContentBox,
  ContentTitle,
  InputBox,
} from './Style';

const AddContactInfo = ({ nextProcess, prevProcess }) => {
  const [userInputPhoneNumber, setUserInputPhoneNumber] = useRecoilState(
    userInputPhoneNumberState
  );

  const inputPhoneNumber = e => {
    setUserInputPhoneNumber(e.target.value);
  };

  // const navigate = useNavigate();
  // const goToConfirm = () => {
  //   fetch(`${IP}estimates`, {
  //     method: 'PATCH',
  //     headers: {
  //       Authorization: localStorage.getItem('access_token'),
  //     },
  //     body: JSON.stringify({
  //       process_state: userEstimateProcess,
  //       phone_number: userInputPhoneNumber,
  //     }),
  //   })
  //     .then(res => res.json())
  //     .then(data => {
  //       data.message === 'SUCCESS'
  //         ? navigate('/complete')
  //         : alert('FAIL TO UPLOAD');
  //     });
  // };

  return (
    <ContentsBox>
      <ContentTitle>
        딜러의 방문 상담을 위해
        <br /> 연락처와 주소를 확인해주세요
      </ContentTitle>

      <InputWrapper>
        <ContactInputWrapper>
          <InputTitle>연락처</InputTitle>
          <InputBox
            onChange={inputPhoneNumber}
            value={userInputPhoneNumber}
            placeholder="010-1234-5678"
          />
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
