import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import moment from 'moment';
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
} from '../../atoms';

import {
  ButtonSet,
  NextButton,
  PrevButton,
  InputButton,
  ContentBox,
  ContentTitle,
  InputBox,
} from '../Estimate/States/CarInfoStyle';

function Login({ setPage }) {
  const [userInputOwner, setUserInputOwner] =
    useRecoilState(UserInputOwnerState);
  const navigate = useNavigate();
  const [id, setId] = useState('');
  const [isLogin, setLogin] = useState(false);
  const [show, setShow] = useState(false);

  //방문 기록이 있는지 관리하는 상태값
  // const [hasQuote, setHasQuote] = useState(false);
  const [data, setData] = useState(false);

  const [loginProcess, setLoginProcess] = useRecoilState(LoginProcessState);

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
          // expireCheck(carNumber);
        } else {
          setShow(false);
        }
      });
  };

  const getData = () => {
    //fetch(`/car?carNumber=${localStorage.getItem("carNumber")}`, {
    //`${URL}:${PORT}/car/myCar?carNumber=${localStorage.getItem("carNumber")}`,
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

  useEffect(() => {
    setPage('login');
  }, []);

  // useEffect(() => {
  // 	// componentDidMount
  // 	setPhoto(props.photo);

  // 	if(photo.data && photo.data.length > 0) {
  // 		console.log(photo.data[0]);
  // 	}
  // })

  //방문 기록 확인 및 관리하는 함수
  // const checkExpiry = carNumber => {
  //   const timeStamp = localStorage.getItem(`${carNumber}_time_stamp`);
  //   //timestamp가 없는 경우
  //   let now = new Date();
  //   if (!timeStamp) {
  //     localStorage.setItem(`${carNumber}_time_stamp`, now);
  //     return false;
  //   } else {
  //     const saved = new Date(localStorage.getItem(`${carNumber}_time_stamp`));
  //     let oneday = 1000 * 60 * 60 * 24;
  //     // console.log("date :", now - saved, now, saved, oneday);
  //     if (now - saved >= oneday) {
  //       localStorage.removeItem(`${carNumber}_driving_distance`);
  //       localStorage.removeItem(`${carNumber}_options`);
  //       localStorage.removeItem(`${carNumber}_additional_info`);
  //       localStorage.removeItem(`${carNumber}_contact`);
  //       localStorage.removeItem(`${carNumber}_lat`);
  //       localStorage.removeItem(`${carNumber}_lng`);
  //       localStorage.removeItem(`${carNumber}_address`);
  //       localStorage.removeItem(`${carNumber}_time_stamp`);
  //       localStorage.removeItem(`${carNumber}_image`);
  //       localStorage.removeItem(`${carNumber}_detailAddress`);
  //       localStorage.setItem(`${carNumber}_time_stamp`, now);
  //       return false;
  //     } else return true;
  //   }
  // };

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

  // const handleLogin = str => {
  //   getCar(str);
  //   if (!show || !isLogin) {
  //     alert('차량번호를 다시 확인해주세요.');
  //   } else if (data) {
  //     navigate('/requestform');
  //   } else {
  //     navigate('/login', { state: id });
  //   }
  //   return 'return';
  // };

  const handleAdmin = () => {
    navigate('/admin');
  };

  // const handleEnter = e => {
  //   if (e.keyCode === 13) {
  //     handleLogin(e.target.value);
  //   }
  // };

  function isValidId(str) {
    const regId = /\d{2,3}[가-힣]{1}?([0-9]{4})$/g;
    let ret = regId.test(str);
    return ret;
  }

  // const expireCheck = carNumber => {
  //   const isVisited = checkExpiry(carNumber);
  //   let isWriting = false;
  //   if (
  //     localStorage.getItem(`${carNumber}_driving_distance`) ||
  //     localStorage.getItem(`${carNumber}_options`) ||
  //     localStorage.getItem(`${carNumber}_additional_info`) ||
  //     localStorage.getItem(`${carNumber}_contact`) ||
  //     localStorage.getItem(`${carNumber}_lat`) ||
  //     localStorage.getItem(`${carNumber}_lng`) ||
  //     localStorage.getItem(`${carNumber}_address`)
  //   ) {
  //     isWriting = true;
  //   }
  //   const result = isVisited && isWriting;
  //   setHasQuote(result);
  // };

  const [estimateCarInfo, setEstimateCarInfo] = useRecoilState(EstimateCarInfo);

  const startLogin = () => {
    setLoginProcess(prev => prev + 1);
  };

  const getUserInputOwner = e => {
    setUserInputOwner(e.target.value);
  };

  const checkOwner = () => {
    fetch(
      'http://localhost:3000/Data/Dino/carData.json'
      // TO DO : fetch URL 수정해서 서버 통신
      // , {
      //   method: 'POST',
      //   body: JSON.stringify({
      //     carNumber: inputCarNumber,
      //     owner: userInputOwner,
      //   }),}
    )
      .then(res => res.json())
      .then(data => {
        // TO DO : fetch URL 수정해서 서버 통신
        // DB 유? navigate('/sellcar')
        //  0. DB에 있는 차량번호와 소유주가 일치하는지 확인
        //  1. 견적 없을 경우 ? 견적 작성
        //  2. 견적 있을 경우 ? 견적 목록
        //  3. 작성 중이던 견적 있을 경우 ? DB 불러오기 및 진행 중 state부터 작성
        // DB 무? 2. 회원 가입 navigate('/singIn')
        //
        // data.result === 'success' ? ():()
        // data.result === 'signIn' ? ():()
        //   ? { DB없을 경우 카카오 인증 : DB있을 경우 navigate('/sellcar') }
        //   : alert('소유자명을 확인해주세요');
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
        <LoginBox>
          {loginProcess === 1 && (
            <LoginWrap>
              <LoginTitle>차량번호 입력만으로</LoginTitle>
              <LoginSubTitle>
                내 차 시세조회와 <br />
                견적요청까지 한번에 🙌
              </LoginSubTitle>
              <LoginInput
                onChange={handleInput}
                // onKeyDown={handleEnter}
                type="text"
                id="id"
                name="id"
                placeholder="12가3456"
                value={inputCarNumber}
              />
              <MessageWrapper>
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
              </MessageWrapper>
              <LoginButton disabled={!isLogin} onClick={startLogin}>
                시작하기
              </LoginButton>
              <GotoAdmin onClick={handleAdmin}>
                <AdminText>관리자 페이지로 이동</AdminText>
              </GotoAdmin>
            </LoginWrap>
          )}
          {loginProcess === 2 && (
            <InputOwnerWrapper>
              <ContentBox>
                <button onClick={() => setLoginProcess(prev => prev - 1)}>
                  뒤로가기
                </button>
                <ContentTitle>소유자명을 입력해주세요</ContentTitle>
                <InputBox
                  placeholder="홍길동"
                  onChange={e => getUserInputOwner(e)}
                  value={userInputOwner}
                />
                {/* <InputButton onClick={checkOwner} variant="primary">
                  확인
                </InputButton> */}
                <ButtonSet>
                  <PrevButton
                    onClick={() => setLoginProcess(prev => prev - 1)}
                    variant="primary"
                  >
                    이전
                  </PrevButton>
                  <NextButton onClick={checkOwner} variant="primary">
                    다음
                  </NextButton>
                </ButtonSet>
              </ContentBox>
            </InputOwnerWrapper>
          )}
        </LoginBox>
      </BodyWrapper>
    </Background>
  );
}
export default Login;

const InputOwnerWrapper = styled.div`
  width: 100%;
  position: absolute;
  top: 5vh;
  box-shadow: 0px 0px 8px rgba(8, 94, 214, 0.05);
`;

const LoginBox = styled.div`
  ${({ theme }) => theme.flex.flexBox('column')}
  box-shadow: 0px 0px 8px rgba(8, 94, 214, 0.05);
  width: 100%;
  height: fit-content;
  top: 5vh;
  padding: 10%;
  background-color: white;
  position: absolute;
  text-align: center;

  @media only screen and (max-width: 640px) {
    width: 90%;
  }
`;
const LoginWrap = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const LoginTitle = styled.p`
  color: ${({ theme }) => theme.colors.primaryBlue};
  margin-bottom: 1rem;
  font-weight: 600;
  font-size: xx-large;
  text-align: left;

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

const MessageWrapper = styled.div`
  position: relative;
  width: 70%;

  @media only screen and (max-width: 640px) {
    width: 100%;
  }
`;

const InputMessage = styled.div`
  ${({ theme }) => theme.flex.flexBox}
  position: absolute;
  left: 0;
  margin-top: 0.5rem;
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
  width: 70%;
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
  height: 100vh;
  background-color: aliceblue;
`;
