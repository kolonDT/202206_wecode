// modules
import Slider from "react-slick";
//styles
import styled from "styled-components";

function LoginMain() {
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
  // const handleShow = () =>{};
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
          <p>OOO님의</p>
          <p>차량 시세를 확인해볼까요?</p>
        </InfoTitle>
        <InfoCar>
          <div>
            차량번호: <span>12가1234</span>
          </div>
          <div>
            모델명: <span>아우디</span>
          </div>
          <div>
            연식: <span>2022년 출시</span>
          </div>
        </InfoCar>
        <InfoButton
        // onClick={handleShow}
        >
          시세확인
        </InfoButton>
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
  padding: 20px;
  border: 1px solid black;
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
  padding: 50px 10px;
  margin-top: 20px;
  border-top: 1px solid #adadad;
`;
const InfoTitle = styled.div`
  margin-bottom: 10px;
  font-size: 34px;
`;
const InfoCar = styled.div`
  margin: 20px 210px 20px 0px;
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
  cursor: pointer;
  font-size: 14px;
  font-weight: 600;
  color: white;
  background-color: #5c1049;
`;

export default LoginMain;
