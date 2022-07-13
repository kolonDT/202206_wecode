import React, { useState } from 'react';
// import Post from '../Estimate/Post/Post';
import styled from 'styled-components';
import { useRecoilState, useRecoilValue } from 'recoil';
import { userInputPhoneNumberState, EstimateCarInfo } from '../../atoms';
import {
  ButtonSet,
  NextButton,
  PrevButton,
  ContentBox,
  ContentTitle,
  InputBox,
} from './Style';
import DaumPostcode from 'react-daum-postcode';
// import { Map } from 'react-kakao-maps-sdk';

const AddContactInfo = ({ nextProcess, prevProcess }) => {
  const [userInputPhoneNumber, setUserInputPhoneNumber] = useRecoilState(
    userInputPhoneNumberState
  );
  const EstimateCarInfoValue = useRecoilValue(EstimateCarInfo);

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

  const [address, setAddress] = useState(''); // 주소
  const [addressDetail, setAddressDetail] = useState(''); // 상세주소
  const onCompletePost = data => {
    let fullAddr = data.address;
    let extraAddr = '';

    if (data.addressType === 'R') {
      // 사용자가 도로명 주소를 선택했을 경우
      if (data.bname !== '' && /[동|로|가]$/g.test(data.bname)) {
        // 법정동명이 있을 경우 추가한다. (법정리는 제외)
        // 법정동의 경우 마지막 문자가 "동/로/가"로 끝난다.
        extraAddr += data.bname;
      }
      if (data.buildingName !== '') {
        // 건물명이 있고
        extraAddr +=
          extraAddr !== '' ? `, ${data.buildingName}` : data.buildingName;
      } //공동주택제한일 경우 if안에  && data.apartment === 'Y' 추가
      // 아래와 같이 바꿔쓸수있다.
      // extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName;
      fullAddr += extraAddr !== '' ? ` (${extraAddr})` : '';
      // 표시할 참고항목이 있을 경우, 괄호까지 추가한 최종 문자열을 만든다.
    }

    setAddress(data.zonecode);
    setAddressDetail(fullAddr);
  };

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
            placeholder={EstimateCarInfoValue.phone_number}
            onChange={inputPhoneNumber}
            value={userInputPhoneNumber}
          />
        </ContactInputWrapper>

        <AddressInputWrapper>
          <InputTitle>주소</InputTitle>
          <DaumPostcode
            // style={postCodeStyle}
            autoClose={false}
            onComplete={onCompletePost}
          />
          {/* <Map /> */}
        </AddressInputWrapper>
      </InputWrapper>

      <ButtonSet>
        <PrevButton onClick={prevProcess} variant="primary">
          이전
        </PrevButton>
        <NextButton
          disabled={userInputPhoneNumber === '' ? true : false}
          onClick={nextProcess}
          variant="primary"
        >
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
