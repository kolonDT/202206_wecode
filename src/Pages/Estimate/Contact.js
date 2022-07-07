import React from 'react';
import DaumPostcode from 'react-daum-postcode';
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
  const Postcode = ({ setAddr, setFindAddr, carNumber }) => {
    const handleComplete = data => {
      let fullAddress = data.address;
      let extraAddress = '';
      if (data.addressType === 'R') {
        if (data.bname !== '') {
          extraAddress += data.bname;
        }
        if (data.buildingName !== '') {
          extraAddress +=
            extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName;
        }
        fullAddress += extraAddress !== '' ? ` (${extraAddress})` : '';
      }
      setAddr(fullAddress);
      localStorage.setItem(`${carNumber}_address`, fullAddress);
      setFindAddr(false);
    };

    return <DaumPostcode onComplete={handleComplete} />;
  };

  return (
    <ContentBox>
      <ContentTitle>
        딜러의 방문 상담을 위해
        <br /> 연락처와 주소를 확인해주세요
      </ContentTitle>

      <ContactInputWrapper>
        <InputTitle>연락처</InputTitle>
        <InputBox placeholder="010-1234-5678" />
      </ContactInputWrapper>

      <AddressInputWrapper>
        <InputTitle>주소</InputTitle>
        <Postcode
        // carNumber={carNumber}
        // setFindAddr={setFindAddr}
        // setAddr={setAddr}
        />
      </AddressInputWrapper>

      <ButtonSet>
        <PrevButton onClick={prevProcess} variant="primary">
          이전
        </PrevButton>
        <NextButton onClick={nextProcess} variant="primary">
          다음
        </NextButton>
      </ButtonSet>
    </ContentBox>
  );
};

export default AddContactInfo;

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
