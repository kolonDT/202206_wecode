// modules
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import Slider from 'react-slick';
//styles
import styled from 'styled-components';
// import { useEffect, useState } from "react";
import { CAR_API, IMAGE_API } from '../../config';

function Reconfirm({ setPage }) {
  const navigate = useNavigate();
  const carImages = useLocation().state.carImages;
  const thumbnails = useLocation().state.thumbnails;
  const handleRequest = () => {
    setCarDB();
    navigate('/complete');
  };

  //DB에 넣을 사진을 변환하는 함수
  const handleUrls = () => {
    const formData = new FormData();
    for (let i in carImages) {
      formData.append('image', carImages[i].src);
    }
    return formData;
  };

  const handleRevise = () => {
    navigate('/sellcar');
  };

  let options = [
    '네비게이션',
    '선루프',
    '통풍시트',
    '디지털키',
    '후방카메라',
    '블랙박스',
  ];

  const carNumber = localStorage.getItem(`carNumber`);
  const option = JSON.parse(
    localStorage.getItem(`${carNumber}_options`) || '[]'
  );
  let result = '';
  for (let i = 0; i < option.length; i++) {
    result = result.concat(', ', options[i]);
  }

  result = option.length === 0 ? '없음' : result.slice(1);

  const commaNumber = localStorage
    .getItem(`${carNumber}_driving_distance`)
    .replace(/\B(?=(\d{3})+(?!\d))/g, ',');

  const distanceDB = Number(
    localStorage.getItem(`${carNumber}_driving_distance`)
  );
  const setCarDB = () => {
    const imageResult = handleUrls();

    const option = localStorage.getItem(`${carNumber}_options`) || '[]';

    fetch(`${CAR_API}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },

      body: JSON.stringify({
        image: localStorage.getItem(`${thumbnails}_image`),
        carNumber: carNumber,
        additionalInfo: localStorage.getItem(`${carNumber}_additional_info`),
        distance: distanceDB,
        optionIdList: JSON.parse(option),
        contact: localStorage.getItem(`${carNumber}_contact`),
        address: localStorage.getItem(`${carNumber}_address`),
        addressDetail: localStorage.getItem(`${carNumber}_detailAddress`),
        lat: '37.49929244623464',
        lon: '127.0293917149315',
      }),
    })
      .then(res => res.json())
      .then(res => {
        fetch(`${IMAGE_API}?carNumber=${carNumber}`, {
          method: 'POST',
          body: imageResult,
        });
      });
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <ReconfirmWrap>
      <ReconfirmTitle>입력하신 추가 정보를 확인해주세요.</ReconfirmTitle>
      <ReconfirmImage>
        <Slider {...settings}>
          {thumbnails.map((url, index) => {
            return (
              <div key={index}>
                <Img src={url} width={370} alt="car_image" />
              </div>
            );
          })}
        </Slider>
      </ReconfirmImage>
      <ReconfirmBox>
        <ReconfirmBoxTitle>
          <span>주행거리</span>
          <span>옵션</span>
          <span>추가정보</span>
          <span>연락처</span>
          <span>주소</span>
          <span>상세주소</span>
        </ReconfirmBoxTitle>
        <ReconfirmBoxInfo>
          <span>{commaNumber}</span>
          <span>{result}</span>
          <span>{localStorage.getItem(`${carNumber}_additional_info`)}</span>
          <span>{localStorage.getItem(`${carNumber}_contact`)}</span>
          <span>{localStorage.getItem(`${carNumber}_address`)}</span>
          <span>{localStorage.getItem(`${carNumber}_detailAddress`)}</span>
          {/* <span>{localStorage.getItem("lat")}</span>
          <span>{localStorage.getItem("lon")}</span> */}
        </ReconfirmBoxInfo>
      </ReconfirmBox>
      <AllButton>
        <ReviseBtn onClick={handleRevise}>수정하기</ReviseBtn>
        <ReconfirmBtn onClick={handleRequest}>견적신청</ReconfirmBtn>
      </AllButton>
    </ReconfirmWrap>
  );
}

const Img = styled.img`
  max-height: 400px; ;
`;

const ReconfirmWrap = styled.div`
  @media only screen and (max-width: 640px) {
    width: 90%;
    padding: 0px;
    margin: 30px auto;
    padding-left: 0;
  }
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 640px;
  margin: 30px auto;
  padding: 10px;
  box-sizing: border-box;
`;

const ReconfirmTitle = styled.span`
  margin-bottom: 25px;
  font-size: 20px;
  font-weight: 500;
`;

const ReconfirmBox = styled.div`
  padding: 35px 10px 40px 40px;
  border-top: 1px dotted #adadad;
`;

const ReconfirmBoxTitle = styled.div`
  float: left;
  display: flex;
  flex-direction: column;
  span {
    margin-bottom: 22px;
    font-weight: 500;
    color: gray;
  }
`;

const ReconfirmImage = styled.div`
  margin: 20px auto;
  width: 375px;
  height: 400px;
`;

const ReconfirmBoxInfo = styled.div`
  display: flex;
  flex-direction: column;
  padding-left: 60px;
  span {
    margin-bottom: 22px;
  }
`;

const AllButton = styled.div`
  margin-bottom: 10px;
`;

const ReviseBtn = styled.button`
  width: 180px;
  padding: 12px 15px;
  margin: 0px 40px 0px 0px;
  border-radius: 5px;
  border: 1px solid #adadad;
  cursor: pointer;
  font-size: 14px;
  font-weight: 600;
  color: #5c1049;
  background-color: white;
  box-shadow: 3px 3px 4px #d8d8d8;

  @media only screen and (max-width: 640px) {
    width: 140px;
    padding: 12px 10px;
  }
`;
const ReconfirmBtn = styled.button`
  width: 180px;
  padding: 12px 15px;
  border-radius: 5px;
  border: 1px solid #adadad;
  cursor: pointer;
  font-size: 14px;
  font-weight: 600;
  color: white;
  background-color: #5c1049;
  box-shadow: 3px 3px 4px #d8d8d8;
  @media only screen and (max-width: 640px) {
    width: 140px;
    padding: 12px 10px;
  }
`;
export default Reconfirm;
