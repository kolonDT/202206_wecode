// modules
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
//styles
import styled from "styled-components";
import moment from "moment";
import { HiLightBulb } from "react-icons/hi";

function Login({ setPage }) {
  const locate = useLocation();
  const navigate = useNavigate();
  const [id, setId] = useState("");
  const [isLogin, setLogin] = useState(false);
  const [show, setShow] = useState(false);
  //방문 기록이 있는지 관리하는 상태값
  const [hasQuote, setHasQuote] = useState(false);
  const [data, setData] = useState(false);

  const getCar = (carNumber) => {
    fetch(`/car?carNumber=${carNumber}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.hasOwnProperty("infoByCarNumber")) {
          setShow(true);
          expireCheck(carNumber);
        }
      });
  };

  const getData = () => {
    fetch(`/car?carNumber=${localStorage.getItem("carNumber")}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data["infoByCarNumber"].length !== 0) {
          setData(data["infoByCarNumber"][0]);
          console.log("ww", data);
        } else {
          setData(false);
          console.log("why");
        }
      });
  };

  useEffect(() => {
    setPage("login");
  }, []);

  // useEffect(() => {
  // 	// componentDidMount
  // 	setPhoto(props.photo);

  // 	if(photo.data && photo.data.length > 0) {
  // 		console.log(photo.data[0]);
  // 	}
  // })

  //방문 기록 확인 및 관리하는 함수
  const checkExpiry = (carNumber) => {
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
      console.log("date :", now - saved, now, saved, oneday);
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

  const handleInput = (e) => {
    let ret = isValidId(e.target.value);
    expireCheck(e.target.value);
    setLogin(ret);
    setId(e.target.value);
    if (ret === true) {
      getCar(e.target.value);
      getData();
      localStorage.setItem("carNumber", e.target.value);
    }
  };

  const handleLogin = (str) => {
    console.log("hi", locate.state);
    getCar(str);
    if (!show) {
      alert("차량번호를 다시 확인해주세요.");
    } else {
      navigate("/login", { state: id });
    }
    return "123";
  };

  const handleWrite = () => {
    if (getCar) {
      alert("견적서 작성 페이지로 이동하시겠습니까?");
      navigate("/sellcar");
    }
    return null;
  };

  const handleEnter = (e) => {
    if (e.keyCode === 13) {
      handleLogin();
    }
  };

  function isValidId(str) {
    const regId = /\d{2,3}[가-힣]{1}?([0-9]{4})$/g;
    let ret = regId.test(str);
    return ret;
  }

  const expireCheck = (carNumber) => {
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
  console.log(data);
  return (
    <LoginBox>
      <LoginWrap>
        <LoginTitle>바로지금,</LoginTitle>
        <LoginSubTitle>똑똑하게 내 차를 파는 가장 빠른시간</LoginSubTitle>
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
            onClick={(e) => {
              handleLogin(e.target.value);
            }}
          >
            등록하기
          </LoginButton>
        ) : (
          <LoginButton
            onClick={() => {
              navigate("/requestform");
            }}
          >
            조회하기
          </LoginButton>
        )}
        {hasQuote ? (
          <LoginNone onClick={handleWrite}>
            <span>이미 작성중인 견적서가 있습니다</span>
            <HiLightBulb size={20} />
          </LoginNone>
        ) : null}
      </LoginWrap>
    </LoginBox>
  );
}
export default Login;

const LoginBox = styled.div`
  @media only screen and (max-width: 640px) {
    width: 90%;
    margin: 40px auto 100px;
  }
  margin: 40px auto 100px;
  width: 640px;
  padding: 10px 0px;
  text-align: center;
`;
const LoginWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const LoginTitle = styled.p`
  color: #5c1049;
  margin-bottom: 10px;
  font-weight: 600;
  font-size: 35px;
`;
const LoginSubTitle = styled.p`
  @media only screen and (max-width: 640px) {
    width: 80%;
  }
  font-size: 30px;
  font-weight: 500;
  margin-bottom: 40px;
`;
const LoginInput = styled.input`
  @media only screen and (max-width: 640px) {
    width: 80%;
    margin: 10px auto;
    margin-bottom: 25px;
  }
  width: 360px;
  margin: 10px auto;
  padding: 20px;
  margin-bottom: 25px;
  border: 0;
  border-bottom: 1px solid gray;
  :focus {
    outline: none;
  }
  ::placeholder {
    word-spacing: 2px;
    font-size: 18px;
  }
`;
const LoginButton = styled.button`
  @media only screen and (max-width: 640px) {
    width: 80%;
    margin: 10px auto;
  }
  width: 400px;
  padding: 14px;
  border-radius: 5px;
  border: 1px solid #adadad;
  cursor: pointer;
  font-size: 15px;
  font-weight: 600;
  color: white;
  background-color: #5c1049;
  box-shadow: 3px 3px 5px #d8d8d8;
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
