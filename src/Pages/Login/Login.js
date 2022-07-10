import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
// import moment from 'moment';
// import { HiLightBulb } from 'react-icons/hi';
import { RiAlertFill } from 'react-icons/ri';
import { BsPatchCheckFill } from 'react-icons/bs';
import { CAR_API, MYCAR_API } from '../../config';
import { Button } from 'react-bootstrap';

import { useRecoilState } from 'recoil';
import {
  LoginProcessState,
  UserInputOwnerState,
  EstimateCarInfo,
  isLoginModalState,
} from '../../atoms';

import {
  ButtonSet,
  NextButton,
  PrevButton,
  ContentBox,
  ContentTitle,
  InputBox,
} from '../Estimate/Style';
import { KAKAO_AUTH_URL } from '../SignIn/OAuth';
import LoginModal from '../../Components/Modal/LoginModal';

function Login({ setPage }) {
  const [userInputOwner, setUserInputOwner] =
    useRecoilState(UserInputOwnerState);
  const navigate = useNavigate();
  const [id, setId] = useState('');
  const [isLogin, setLogin] = useState(false);
  const [show, setShow] = useState(false);
  const [data, setData] = useState(false);

  const [loginProcess, setLoginProcess] = useRecoilState(LoginProcessState);
  const [isLoginModal, setIsLoginModal] = useRecoilState(isLoginModalState);

  // useEffect(() => {
  //   window.Kakao.init('9910587dbfb5d2e3262e8e3567ed7021');
  // }, []);

  const getCar = carNumber => {
    fetch(`${CAR_API}?carNumber=${carNumber}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(res => res.json())
      .then(data => {
        if (data.hasOwnProperty('infoByCarNumber')) {
          setShow(true);
        } else {
          setShow(false);
        }
      });
  };

  const getData = () => {
    fetch(`${MYCAR_API}?carNumber=${localStorage.getItem('carNumber')}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(res => res.json())
      .then(data => {
        if (data.registeredCarInfo.length !== 0) {
          setData(data.registeredCarInfo[0]);
        } else {
          setData(false);
        }
      });
  };

  const handleInput = e => {
    setInputCarNumber(e.target.value);
    let ret = isValidId(e.target.value);
    setLogin(ret);
    setId(e.target.value);
    if (ret === true) {
      localStorage.setItem('carNumber', e.target.value);
      getCar(e.target.value);
      getData();
    }
  };

  const [inputCarNumber, setInputCarNumber] = useState('');

  const handleAdmin = () => {
    navigate('/admin');
  };

  function isValidId(str) {
    const regId = /\d{2,3}[가-힣]{1}?([0-9]{4})$/g;
    let ret = regId.test(str);
    return ret;
  }

  const [estimateCarInfo, setEstimateCarInfo] = useRecoilState(EstimateCarInfo);

  const startLogin = () => {
    fetch('http://localhost:3000/Data/Dino/userData.json')
      .then(res => res.json())
      .then(data => {
        // const alert = () => {
        //   if (
        //     window.confirm(
        //       '등록되어 있지 않은 사용자입니다.\n등록을 진행하시겠습니까?'
        //     )
        //   ) {
        //     Link(`${KAKAO_AUTH_URL}`);
        //     // navigate('/join');
        //   } else {
        //   }
        // };
        data.carNumber === inputCarNumber
          ? setLoginProcess(prev => prev + 1)
          : setIsLoginModal(true);
      });
  };

  const getUserInputOwner = e => {
    setUserInputOwner(e.target.value);
  };

  const checkUser = () => {
    fetch('http://localhost:3000/Data/Dino/carData.json')
      .then(res => res.json())
      .then(data => {
        setEstimateCarInfo(data);
        const { owner, number } = estimateCarInfo;
        userInputOwner === owner && inputCarNumber === number
          ? navigate('/sellcar')
          : alert('소유자명을 확인해주세요');
      });
  };

  return (
    <Background>
      <BodyWrapper>
        {isLoginModal && <LoginModal />}
        {loginProcess === 1 && (
          <LoginWrap>
            <ContentBox>
              <LoginTitle>차량번호 입력만으로</LoginTitle>
              <LoginSubTitle>
                내 차 시세조회와 <br />
                견적요청까지 한번에 🙌
              </LoginSubTitle>
              <InputWrapper>
                <LoginInput
                  onChange={handleInput}
                  type="text"
                  id="id"
                  placeholder="12가3456"
                  value={inputCarNumber}
                />
                <InputMessage>
                  {inputCarNumber.length > 1 && !isLogin && (
                    <>
                      <FailIcon />
                      유효하지 않은 차량번호입니다
                    </>
                  )}
                  {inputCarNumber.length === 0 && (
                    <GuideMessage>차량 번호를 입력해주세요</GuideMessage>
                  )}
                  {isLogin && (
                    <SuccessMessage>
                      <SuccessIcon />
                      시작하기를 눌러보세요 !
                    </SuccessMessage>
                  )}
                </InputMessage>
              </InputWrapper>
              <LoginButton disabled={!isLogin} onClick={startLogin}>
                시작하기
              </LoginButton>
              <GotoAdmin onClick={handleAdmin}>
                <AdminText>관리자 페이지로 이동</AdminText>
              </GotoAdmin>
            </ContentBox>
          </LoginWrap>
        )}
        {loginProcess === 2 && (
          <InputOwnerWrapper>
            <ContentBox>
              <ContentTitle>
                {inputCarNumber} <br />
                소유자명을 입력해주세요
              </ContentTitle>
              <InputBox
                placeholder="홍길동"
                onChange={e => getUserInputOwner(e)}
                value={userInputOwner}
              />
              <ButtonSet>
                <PrevButton
                  onClick={() => setLoginProcess(prev => prev - 1)}
                  variant="primary"
                >
                  이전
                </PrevButton>
                <NextButton onClick={checkUser} variant="primary">
                  다음
                </NextButton>
              </ButtonSet>
            </ContentBox>
          </InputOwnerWrapper>
        )}
      </BodyWrapper>
    </Background>
  );
}
export default Login;

const InputWrapper = styled.div`
  margin: 0 auto;
  width: 70%;
  position: relative;

  @media only screen and (max-width: 640px) {
    width: 100%;
  }
`;

const InputOwnerWrapper = styled.div`
  width: 100%;
  height: fit-content;
  position: absolute;
  text-align: left;
  top: 5vh;
  box-shadow: 0px 0px 8px rgba(8, 94, 214, 0.05);

  @media only screen and (max-width: 640px) {
    width: 90%;
  }
`;

const LoginWrap = styled.div`
  width: 100%;
  height: fit-content;
  position: absolute;
  text-align: left;
  top: 5vh;
  text-align: center;
  box-shadow: 0px 0px 8px rgba(8, 94, 214, 0.05);

  @media only screen and (max-width: 640px) {
    width: 90%;
  }
`;

const LoginTitle = styled.p`
  color: ${({ theme }) => theme.colors.primaryBlue};
  margin-bottom: 1rem;
  font-weight: 600;
  font-size: xx-large;

  @media only screen and (max-width: 640px) {
    font-size: 28px;
  }
`;

const LoginSubTitle = styled.p`
  font-size: x-large;
  font-weight: 500;
  margin-bottom: 3rem;
  line-height: 1.8rem;
  color: ${({ theme }) => theme.colors.darkGray};

  @media only screen and (max-width: 640px) {
    font-size: 22px;
  }
`;

const InputMessage = styled.div`
  ${({ theme }) => theme.flex.flexBox}
  position: absolute;
  left: 0;
  margin: 0.5rem 0 0 0;
  font-size: small;
  color: ${({ theme }) => theme.colors.heartPink};
`;

const FailIcon = styled(RiAlertFill)`
  margin-right: 0.2rem;
`;

const GuideMessage = styled.div`
  color: ${({ theme }) => theme.colors.gray};
`;

const SuccessMessage = styled.div`
  ${({ theme }) => theme.flex.flexBox}
  color: ${({ theme }) => theme.colors.primaryBlue};
`;

const SuccessIcon = styled(BsPatchCheckFill)`
  margin-right: 0.2rem;
`;

const LoginInput = styled.input`
  width: 100%;
  height: 5rem;
  border: 1px solid ${({ theme }) => theme.colors.disabled};
  border-radius: 5px;
  padding: 1em;
  font-weight: 600;
  font-size: xx-large;

  :focus {
    outline: none;
  }

  ::placeholder {
    word-spacing: 2px;
    opacity: 0.3;
  }

  @media only screen and (max-width: 640px) {
    width: 100%;
  }
`;

const LoginButton = styled(Button)`
  width: 70%;
  height: 3rem;
  border-radius: 100rem;
  margin-top: 5rem;
  font-weight: 600;

  @media only screen and (max-width: 640px) {
    width: 100%;
  }
`;

const GotoAdmin = styled.div`
  ${({ theme }) => theme.flex.flexBox}
  margin-top: 2rem;
  font-size: small;
  cursor: pointer;
`;

const AdminText = styled.p`
  font-weight: 500;
  color: ${({ theme }) => theme.colors.skyMint};
  opacity: 0.4;
  transition: all ease-in-out 100ms;

  &:hover {
    opacity: 1;
  }
`;

const BodyWrapper = styled.div`
  ${({ theme }) => theme.flex.flexBox('column')}
  position: relative;
  width: 640px;
  height: 100%;
`;

const Background = styled.div`
  ${({ theme }) => theme.flex.flexBox}
  width: 100vw;
  height: 95vh;
  background-color: aliceblue;
`;
