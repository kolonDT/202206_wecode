import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled, { css } from 'styled-components';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import {
  userInputPhoneNumberState,
  EstimateCarInfo,
  ShowAddressResultState,
  ShowAddressInputState,
  detailAddressState,
  userEstimateProcessState,
  kakaoAddressState,
  kakaoDetailAddressState,
} from '../../atoms';
import {
  ButtonSet,
  NextButton,
  PrevButton,
  ContentBox,
  ContentTitle,
  InputBox,
} from './Style';
import DaumPostcode from 'react-daum-postcode';
import { IP } from '../../config';

const AddContactInfo = ({ prevProcess }) => {
  const setUserEstimateProcess = useSetRecoilState(userEstimateProcessState);
  const [userInputPhoneNumber, setUserInputPhoneNumber] = useRecoilState(
    userInputPhoneNumberState
  );
  const EstimateCarInfoValue = useRecoilValue(EstimateCarInfo);
  const [showAddressResult, setShowAddressResult] = useRecoilState(
    ShowAddressResultState
  );
  const [showAddressInputState, setShowAddressInputState] = useRecoilState(
    ShowAddressInputState
  );
  const [detailAddress, setDetailAddress] = useRecoilState(detailAddressState);

  const inputPhoneNumber = e => {
    setUserInputPhoneNumber(e.target.value);
  };

  const inputDetailAddress = e => {
    setDetailAddress(e.target.value);
  };

  const navigate = useNavigate();
  setUserEstimateProcess('개인정보');

  const goToConfirm = () => {
    fetch(`${IP}estimates`, {
      method: 'PATCH',
      headers: {
        Authorization: localStorage.getItem('access_token'),
      },
      body: JSON.stringify({
        process_state: '개인정보',
        address: fullAddress,
        phone_number: userInputPhoneNumber,
      }),
    })
      .then(res => res.json())
      .then(data => {
        data.message === 'SUCCESS'
          ? navigate('/complete')
          : alert('FAIL TO UPLOAD');
      });
  };

  const setAddress = useSetRecoilState(kakaoAddressState);
  const [addressDetail, setAddressDetail] = useRecoilState(
    kakaoDetailAddressState
  );

  const fullAddress = `${addressDetail} ${detailAddress}`;

  const onCompletePost = data => {
    let fullAddr = data.address;
    let extraAddr = '';
    if (data.addressType === 'R') {
      if (data.bname !== '' && /[동|로|가]$/g.test(data.bname)) {
        extraAddr += data.bname;
      }
      if (data.buildingName !== '') {
        extraAddr +=
          extraAddr !== '' ? `, ${data.buildingName}` : data.buildingName;
      }
      fullAddr += extraAddr !== '' ? ` (${extraAddr})` : '';
    }
    setAddress(data.zonecode);
    setAddressDetail(fullAddr);
    setShowAddressResult(true);
    setShowAddressInputState(false);
  };

  const reInputAddress = () => {
    setShowAddressResult(false);
    setShowAddressInputState(true);
    setDetailAddress('');
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
          <InputPost isOpen={showAddressInputState ? true : false}>
            <DaumPostcode autoClose={false} onComplete={onCompletePost} />
          </InputPost>
          <AddressResultWrapper isOpen={showAddressResult ? true : false}>
            <AddressResult>{addressDetail}</AddressResult>
            <AddressDetailInput
              placeholder="상세주소를 입력해주세요"
              onChange={inputDetailAddress}
              value={detailAddress}
            />
            <OpenButton onClick={reInputAddress}>다시 검색하기</OpenButton>
          </AddressResultWrapper>
        </AddressInputWrapper>
      </InputWrapper>

      <ButtonSet>
        <PrevButton onClick={prevProcess} variant="primary">
          이전
        </PrevButton>
        <NextButton
          disabled={userInputPhoneNumber === '' ? true : false}
          onClick={goToConfirm}
          variant="primary"
        >
          다음
        </NextButton>
      </ButtonSet>
    </ContentsBox>
  );
};

export default AddContactInfo;

const InputPost = styled.section`
  display: none;

  ${props =>
    props.isOpen &&
    css`
      display: contents;
    `}
`;

const AddressResultWrapper = styled.section`
  border: 1px solid black;
  display: none;

  ${props =>
    props.isOpen &&
    css`
      display: contents;
    `}
`;

const AddressResult = styled.div`
  width: 100%;
  height: 3rem;
  padding: 1em;
  border-bottom: 1px solid ${({ theme }) => theme.colors.disabled};
`;

const AddressDetailInput = styled.input`
  width: 100%;
  height: 3rem;
  padding: 1em;
  margin: 0.8rem 0;
  border: 0;
  border-bottom: 1px solid ${({ theme }) => theme.colors.disabled};

  ::placeholder {
    color: rgba(0, 0, 0, 0.2);
  }

  ::-webkit-outer-spin-button,
  ::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`;

const OpenButton = styled.button`
  width: 100%;
  height: 3rem;
  border-radius: 100rem;
  margin-top: 1.5rem;
  font-weight: 600;
  border: 1px solid ${({ theme }) => theme.colors.gray};
  background-color: white;
  color: ${({ theme }) => theme.colors.gray};

  &:hover {
    opacity: 0.5;
  }
`;

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
