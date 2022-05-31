// modules
import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import Slider from "react-slick";
import Graph from "../Graph/Graph";

//styles
import styled from "styled-components";

function LoginMain({ setPage }) {
  const [show, setShow] = useState(false);
  const { state } = useLocation();
  const [data1, setData] = useState();
  const cnt = useRef(0);
  localStorage.setItem("carNumber", state);
  const getCarInfo = async () => {
    await fetch(`/car?carNumber=${state}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("ddd :", data);
        setData(data["infoByCarNumber"][0]);
        console.log(data1);
      });
  };

  useEffect(() => {
    setPage("default");
  }, []);

  useEffect(() => {
    getCarInfo();
  }, [cnt.current]);

  if (cnt.current === 0) cnt.current += 1;

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

  if (data1 === undefined) return null;
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
            모델명: <span>{data1.model_name}</span>
          </div>
          <div>
            연식: <span>{data1.model_year}</span>
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
        {/* <>{show === false ? <Graph active={show} /> : null}</> */}
        <>{show === true ? <Graph active={show} setPage={setPage} /> : null}</>
      </LoginMainInfo>
    </LoginMainWrap>
  );
}

const LoginMainWrap = styled.div`
  @media only screen and (max-width: 640px) {
    width: 100%;
    margin: 40px auto;
  }
  width: 640px;
  margin: 40px auto;
`;
const LoginMainBox = styled.div`
  img {
    width: 100%;
    height: 200px;
  }
`;
const LoginMainInfo = styled.div`
  @media only screen and (max-width: 640px) {
    width: 90%;
    margin: 0px auto;
  }
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 50px 0px 25px 0px;
  margin-top: 20px;
`;
const InfoTitle = styled.div`
  @media only screen and (max-width: 640px) {
    font-size: 30px;
  }
  margin-bottom: 10px;
  font-size: 34px;
  font-weight: 800;
  letter-spacing: 1px;
  line-height: 25px;
`;
const InfoCar = styled.div`
  @media only screen and (max-width: 640px) {
    /* text-align: center; */
    margin: 20px auto;
  }
  margin: 20px 210px 30px 0px;
  div {
    font-size: 18px;
    margin-bottom: 10px;
    font-weight: 500;
    color: black;
  }
  span {
    margin-left: 5px;
  }
`;
const InfoButton = styled.button`
  width: 200px;
  padding: 12px 15px;
  border-radius: 5px;
  border: 1px solid #adadad;
  cursor: pointer;
  font-size: 14px;
  font-weight: 600;
  color: white;
  background-color: #5c1049;
  box-shadow: 3px 3px 5px #d8d8d8;
`;
export default LoginMain;
