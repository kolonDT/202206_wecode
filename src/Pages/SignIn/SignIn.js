import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import {
  ContentBox,
  ContentTitle,
  InputBox,
  InputButton,
} from '../Estimate/Style';
import { useRecoilState } from 'recoil';
import {
  car365InfoState,
  signInCarNumberState,
  signInOwnerState,
  signInPhoneNumberState,
} from '../../atoms';
import { IP } from '../../Hooks/Fetch';

const SignIn = () => {
  const [car365Info, setCar365Info] = useRecoilState(car365InfoState);
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
          fetch(`${IP}cars/signup`, {
            method: 'POST',
            body: JSON.stringify({
              car_number: car365Info.car_number,
              owner: car365Info.owner,
              car_name: car365Info.car_name,
              trim: car365Info.trim,
              body_shape: car365Info.body_shape,
              color: car365Info.color,
              model_year: car365Info.model_year,
              first_registration_year: car365Info.first_registration_year,
              engine: car365Info.engine,
              transmission: car365Info.transmission,
              manufacturer: car365Info.manufacturer,
              factory_price: car365Info.factory_price,
              insurance_history: '1',
              transaction_history: '1',
              kakao_id: localStorage.getItem('kakao_id'),
              phone_number: signInPhoneNumber,
            }),
          })
            .then(res => res.json())
            .then(data => {
              if (data.message === 'SUCCESS') {
                localStorage.setItem('access_token', data.access_token);
                navigate('/sellcar');
              } else {
                alert(data.message);
              }
            });
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
