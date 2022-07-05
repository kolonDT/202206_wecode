import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import moment from 'moment';
import { HiLightBulb } from 'react-icons/hi';
import { CAR_API, MYCAR_API } from '../../config';
import { Button } from 'react-bootstrap';

function Login({ setPage }) {
  const navigate = useNavigate();
  const [id, setId] = useState('');
  const [isLogin, setLogin] = useState(false);
  const [show, setShow] = useState(false);

  //방문 기록이 있는지 관리하는 상태값
  const [hasQuote, setHasQuote] = useState(false);
  const [data, setData] = useState(false);

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
          expireCheck(carNumber);
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
  const checkExpiry = carNumber => {
    const timeStamp = localStorage.getItem(`${carNumber}_time_stamp`);
    //  timeStamp에서 시간과 분을 나눈다.
    const month = moment().month();
    const hour = moment().hour();
    const date = moment().date();

    //timestamp가 없는 경우
    let now = new Date();
    if (!timeStamp) {
      localStorage.setItem(`${carNumber}_time_stamp`, now);
      return false;
    } else {
      const saved = new Date(localStorage.getItem(`${carNumber}_time_stamp`));
      let oneday = 1000 * 60 * 60 * 24;
      // console.log("date :", now - saved, now, saved, oneday);
      if (now - saved >= oneday) {
        localStorage.removeItem(`${carNumber}_driving_distance`);
        localStorage.removeItem(`${carNumber}_options`);
        localStorage.removeItem(`${carNumber}_additional_info`);
        localStorage.removeItem(`${carNumber}_contact`);
        localStorage.removeItem(`${carNumber}_lat`);
        localStorage.removeItem(`${carNumber}_lng`);
        localStorage.removeItem(`${carNumber}_address`);
        localStorage.removeItem(`${carNumber}_time_stamp`);
        localStorage.removeItem(`${carNumber}_image`);
        localStorage.removeItem(`${carNumber}_detailAddress`);
        localStorage.setItem(`${carNumber}_time_stamp`, now);
        return false;
      } else return true;
    }
  };

  const handleInput = e => {
    let ret = isValidId(e.target.value);
    setLogin(ret);
    setId(e.target.value);
    if (ret === true) {
      localStorage.setItem('carNumber', e.target.value);
      getCar(e.target.value);
      getData();
    }
  };

  const handleLogin = str => {
    getCar(str);
    if (!show || !isLogin) {
      alert('차량번호를 다시 확인해주세요.');
    } else if (data) {
      navigate('/requestform');
    } else {
      navigate('/login', { state: id });
    }
    return 'return';
  };

  const handleWrite = () => {
    if (show) {
      alert('작성중인 견적서 페이지로 이동합니다.');
      navigate('/sellcar');
    }
    return null;
  };

  const handleAdmin = () => {
    navigate('/admin');
  };

  const handleEnter = e => {
    if (e.keyCode === 13) {
      handleLogin(e.target.value);
    }
  };

  function isValidId(str) {
    const regId = /\d{2,3}[가-힣]{1}?([0-9]{4})$/g;
    let ret = regId.test(str);
    return ret;
  }

  const expireCheck = carNumber => {
    const isVisited = checkExpiry(carNumber);
    let isWriting = false;
    if (
      localStorage.getItem(`${carNumber}_driving_distance`) ||
      localStorage.getItem(`${carNumber}_options`) ||
      localStorage.getItem(`${carNumber}_additional_info`) ||
      localStorage.getItem(`${carNumber}_contact`) ||
      localStorage.getItem(`${carNumber}_lat`) ||
      localStorage.getItem(`${carNumber}_lng`) ||
      localStorage.getItem(`${carNumber}_address`)
    ) {
      isWriting = true;
    }
    const result = isVisited && isWriting;
    setHasQuote(result);
  };
  /*
  useEffect(() => {
    const isVisited = checkExpiry();
    const isWriting = localStorage.length > 2;
    const result = isVisited && isWriting;
    setHasQuote(result);
    // setPage("login");
  }, []);
*/
  return (
    <Background>
      <BodyWrapper>
        <LoginBox>
          <LoginWrap>
            <LoginTitle>차량번호 입력만으로,</LoginTitle>
            <LoginSubTitle>
              내 차 시세조회와 <br />
              견적요청까지 한번에 🙌
            </LoginSubTitle>
            <LoginInput
              onChange={handleInput}
              onKeyDown={handleEnter}
              type="text"
              id="id"
              name="id"
              placeholder="12가3456"
              required
            />
            {!data ? (
              <LoginButton
                disabled={!isLogin}
                onClick={e => {
                  handleLogin(localStorage.getItem('carNumber'));
                }}
              >
                시작하기
              </LoginButton>
            ) : (
              <LoginButton
                onClick={e => {
                  handleLogin(e.target.value);
                }}
              >
                조회하기
              </LoginButton>
            )}
            {hasQuote && !data && (
              <LoginNone onClick={handleWrite}>
                <span>이미 작성중인 견적서가 있습니다</span>
                <HiLightBulb size={20} />
              </LoginNone>
            )}
            <GotoAdmin onClick={handleAdmin}>
              <AdminText>관리자 페이지로 이동</AdminText>
            </GotoAdmin>
          </LoginWrap>
        </LoginBox>
      </BodyWrapper>
    </Background>
  );
}
export default Login;

const LoginBox = styled.div`
  ${({ theme }) => theme.flex.flexBox}
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
    font-size: x-large;
  }
`;

const LoginSubTitle = styled.p`
  font-size: x-large;
  font-weight: 500;
  margin-bottom: 40px;
  line-height: 1.5rem;

  @media only screen and (max-width: 640px) {
    font-size: 22px;
  }
`;

const LoginInput = styled.input`
  width: 70%;
  height: 5rem;
  margin-top: 2rem;
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

const LoginNone = styled.div`
  display: flex;
  margin-top: 80px;
  padding-bottom: 10px;
  align-items: center;
  cursor: pointer;
  font-weight: 500;
  font-size: 18px;
  color: gray;
  animation: fadein 1.2s;
  @keyframes fadein {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
  span {
    margin-right: 3px;
  }
`;

const GotoAdmin = styled.div`
  ${({ theme }) => theme.flex.flexBox}
  margin-top: 2rem;
  font-size: small;
  cursor: pointer;
`;

const AdminText = styled.p`
  font-weight: 600;
  color: rgba(0, 0, 0, 0.2);
  :hover {
    color: rgba(0, 0, 0, 0.5);
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
