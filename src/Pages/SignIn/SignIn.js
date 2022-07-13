import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import {
  ContentBox,
  ContentTitle,
  InputBox,
  InputButton,
} from '../Estimate/Style';
import { useRecoilState, useSetRecoilState } from 'recoil';
import {
  car365InfoState,
  EstimateCarInfo,
  signInCarNumberState,
  signInOwnerState,
  signInPhoneNumberState,
} from '../../atoms';
import { IP } from '../../config';

const SignIn = () => {
  const setCar365Info = useSetRecoilState(car365InfoState);
  const setEstimateCarInfo = useSetRecoilState(EstimateCarInfo);
  const [signInCarNumber, setSignInCarNumber] =
    useRecoilState(signInCarNumberState);
  const [signInOwner, setSignInOwner] = useRecoilState(signInOwnerState);
  const [signInPhoneNumber, setSignInPhoneNumber] = useRecoilState(
    signInPhoneNumberState
  );
  const navigate = useNavigate();

  const goToCarInfo = () => {
    fetch(
      `${IP}cars/car365API?car_number=${signInCarNumber}&owner=${signInOwner}`
    )
      .then(res => res.json())
      .then(data => {
        if (data.message === 'SUCCESS') {
          setCar365Info(data.results);
          setEstimateCarInfo(data.results);
          navigate('/sellcar');
        } else {
          alert(data.message);
        }
      });
  };

  return (
    <Background>
      <BodyWrapper>
        <EstimateWrapper>
          <ContentBox>
            <ContentsTitle>
              손쉽게 시세조회와
              <br />
              견적요청을 진행해보세요!
            </ContentsTitle>
            <ContentWrapper>
              {/* TO DO : 유효성 검사 */}
              <SubTitle>차량번호</SubTitle>
              <InputBox
                placeholder="123가4567"
                onChange={e => setSignInCarNumber(e.target.value)}
                value={signInCarNumber}
              />
            </ContentWrapper>
            <ContentWrapper>
              <SubTitle>소유자명</SubTitle>
              <InputBox
                placeholder="홍길동"
                onChange={e => setSignInOwner(e.target.value)}
                value={signInOwner}
              />
            </ContentWrapper>
            <ContentWrapper>
              <SubTitle>연락처</SubTitle>
              <InputBox
                placeholder="010-1234-5678"
                onChange={e => setSignInPhoneNumber(e.target.value)}
                value={signInPhoneNumber}
                type="number"
              />
            </ContentWrapper>
            <InputButton onClick={goToCarInfo} variant="primary">
              시세 확인하러 가기
            </InputButton>
          </ContentBox>
        </EstimateWrapper>
      </BodyWrapper>
    </Background>
  );
};

export default SignIn;

const SubTitle = styled.h5`
  margin-bottom: 0.5rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.gray};
`;

const ContentWrapper = styled.div`
  margin-bottom: 2rem;
`;

const ContentsTitle = styled(ContentTitle)`
  text-align: center;
`;

const EstimateWrapper = styled.section`
  width: 100%;
  height: fit-content;
  position: absolute;
  top: 5vh;
  box-shadow: 0px 0px 8px rgba(8, 94, 214, 0.05);
`;

const BodyWrapper = styled.div`
  ${({ theme }) => theme.flex.flexBox('column')}
  position: relative;
  width: 640px;
  height: 100%;

  @media only screen and (max-width: 640px) {
    width: 90%;
  }
`;

const Background = styled.div`
  ${({ theme }) => theme.flex.flexBox('column')}
  width: 100vw;
  height: 95vh;
  background: aliceblue;
`;
