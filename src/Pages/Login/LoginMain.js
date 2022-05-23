// modules
import { useNavigate } from "react-router-dom";
import Sellcar from "../Sellcar/Sellcar";
import Slider from "react-slick";
//styles
import styled from "styled-components";

function LoginMain() {
  const navigate = useNavigate();
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
  const handleSellcar = () => {
    <Sellcar />;
    // navigate("/sellcar");
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
          {/* <p>OOO님의</p> */}
          <p>{localStorage.getItem("car_number")}</p>
          <p>차량 시세를 확인해볼까요?</p>
        </InfoTitle>
        <InfoCar>
          <div>
            차량번호: <span>{localStorage.getItem("car_number")}</span>
          </div>
          <div>
            모델명: <span>{localStorage.getItem("car_name")}</span>
          </div>
          <div>
            연식: <span>{localStorage.getItem("car_birth")}</span>
          </div>
        </InfoCar>
        <InfoButton onClick={handleSellcar}>시세확인</InfoButton>
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
