// modules
import { useState } from "react";
import Graph from "../Sellcar/Graph";
import Slider from "react-slick";
//styles
import styled from "styled-components";
import { useLocation } from "react-router-dom";

function LoginMain() {
  const [show, setShow] = useState(false);
  const { state } = useLocation();

  // const getCarInfo = () => {
  //   fetch(`/car?carNumber=201누9290/3`, {
  //     method: "GET",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //   })
  //     .then((res) => res.json())
  //     .then((data) => {
  //       console.log(data);
  //     });
  // };

  function useLocation({ state }) {}

  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    speed: 3000,
    autoplaySpeed: 2000,
    cssEase: "linear",
  };

  return (
    <LoginMainWrap>
      <LoginMainBox>
        <div>
          <Slider {...settings}>
            <div>
              <img src="/Images/Thumb/main1.png" alt="메인이미지1" />
            </div>
            <div>
              <img src="/Images/Thumb/main2.png" alt="메인이미지2" />
            </div>
            <div>
              <img src="/Images/Thumb/main3.png" alt="메인이미지3" />
            </div>
            <div>
              <img src="/Images/Thumb/main4.png" alt="메인이미지4" />
            </div>
          </Slider>
        </div>
      </LoginMainBox>
      <LoginMainInfo>
        <InfoTitle>
          <p>차량 시세를 확인해볼까요?</p>
        </InfoTitle>
        <InfoCar>
          <div>
            차량번호: <span>{state}</span>
          </div>
          <div>
            모델명: <span>{}</span>
          </div>
          <div>
            연식: <span>{}</span>
          </div>
        </InfoCar>
        <InfoButton
          onClick={() => {
            setShow(!show);
          }}
          style={{ display: show === false ? "block" : "none" }}
        >
          <>시세확인</>
        </InfoButton>
        <>{show === true ? <Graph active={show} /> : null}</>
      </LoginMainInfo>
    </LoginMainWrap>
  );
}

const LoginMainWrap = styled.div`
  @media only screen and (max-width: 640px) {
    width: 100%;
    margin: 0px auto;
  }
  width: 640px;
  margin: 0px auto;
  padding: 20px 0px;
`;
const LoginMainBox = styled.div`
  img {
    width: 100%;
    height: 200px;
  }
`;
const LoginMainInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 50px 0px 25px 0px;
  margin-top: 20px;
`;
const InfoTitle = styled.div`
  margin-bottom: 10px;
  font-size: 34px;
  font-weight: 800;
  letter-spacing: 1px;
  line-height: 25px;
`;
const InfoCar = styled.div`
  margin: 20px 210px 30px 0px;
  div {
    font-size: 18px;
    margin-bottom: 10px;
  }
  span {
    margin-left: 5px;
  }
`;
const InfoButton = styled.button`
  width: 200px;
  padding: 12px 15px;
  border-radius: 5px;
  border: 1px solid #000;
  cursor: pointer;
  font-size: 14px;
  font-weight: 600;
  color: white;
  background-color: #5c1049;
  box-shadow: 3px 3px 5px #d8d8d8;
`;
export default LoginMain;
