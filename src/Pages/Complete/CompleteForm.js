import React from "react";
import { RiArrowDropDownLine } from "react-icons/ri";
import { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./slide.css";
import styled from "styled-components";
import { Map, MapMarker } from "react-kakao-maps-sdk";

function CompleteForm() {
  const [fold, setFold] = useState(false);
  const [data, setData] = useState();
  let process = {
    "판매 완료": "",
    "판매 요청": "",
    "딜러 방문 상담": "",
    "담당 딜러 배정": "",
    "견적 요청 접수": "",
  };

  const getData = () => {
    fetch(`/Data/Lisa/RequestForm.json`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setData(data);
      });
  };

  useEffect(() => {
    getData();
  }, []);

  if (data === undefined) return null;
  for (let i = 0; i < data.progress.length; i++) {
    process[data.progress[i]] = data.updateDate[i];
  }

  return (
    <>
      <Box>
        <ProcessArray process={process} />
        <Folding
          onClick={() => {
            setFold(!fold);
          }}
        >
          {fold === false ? (
            <>
              내 요청내용 보기
              <RiArrowDropDownLine />
            </>
          ) : null}
        </Folding>
        <Detail active={fold}>
          <HR />
          <ImageSlide data={data} />
          <DetailLine>
            <Text>차량번호</Text>
            <Text>{data.car_number}</Text>
          </DetailLine>
          <DetailLine>
            <Text>모델명</Text>
            <Text>{data.model_name}</Text>
          </DetailLine>
          <DetailLine>
            <Text>연식</Text>
            <Text>{data.model_year}년형</Text>
          </DetailLine>
          <DetailLine>
            <Text>주행거리</Text>
            <Text>{data.driving_distance}km</Text>
          </DetailLine>
          <DetailLine>
            <Text>연락처</Text>
            <Text>{data.contact}</Text>
          </DetailLine>
          <DetailLine>
            <Text>지역</Text>
            <Text>{data.address}</Text>
          </DetailLine>
          <DetailOption>
            <OptionText>옵션</OptionText>
            {data.option.map((opt, index) => {
              return <Option>{opt}</Option>;
            })}
          </DetailOption>

          <Map
            center={{
              lat: data.lat,
              lng: data.long,
            }}
            style={{
              width: "90%",
              height: "250px",
              margin: "0px auto",
              marginTop: "20px",
            }}
            level={6}
          >
            <MapMarker
              position={{
                lat: data.lat,
                lng: data.long,
              }}
            />
          </Map>
        </Detail>
      </Box>
    </>
  );
}

function ProcessArray({ process }) {
  return Object.entries(process).map(([key, value]) =>
    value !== "" ? (
      <Line>
        <P>{key}</P>
        <P>{value}</P>
      </Line>
    ) : null
  );
}

function ImageSlide({ data }) {
  const settings = {
    dots: true,
    dotsClass: "slick-dots slick-thumb",
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
  };
  if (!data.hasOwnProperty("image")) {
    return null;
  }
  return (
    <Wrap>
      <Slider {...settings}>
        {data.image.map((imgUrl, index) => {
          return (
            <ImgDiv>
              <Img src={imgUrl} alt="car_image" />
            </ImgDiv>
          );
        })}
      </Slider>
    </Wrap>
  );
}

const Box = styled.div`
  width: 640px;
  border-radius: 20px;
  margin: 0px auto;
  margin-top: 40px;
  text-align: center;
  box-shadow: 5px 5px 10px #d8d8d8;
  padding: 10px;
  @media only screen and (max-width: 640px) {
    width: 90%;
    margin: 0px auto;
    justfiy-content: center;
  }
`;

const P = styled.p`
  font-size: 1.4em;
  font-weight: bold;
  margin-top: 10px;
  margin-bottom: 20px;
`;
const Line = styled.p`
  width: 86%;
  margin: 0px auto;
  display: flex;
  justify-content: space-between;
`;
const Folding = styled.p`
  font-size: 1.2em;
  font-weight: 500;
  cursor: pointer;
`;
const DetailLine = styled.p`
  margin: 0px auto;
  width: 90%;
  display: flex;
  justify-content: space-between;
`;
const Text = styled.p`
  font-size: 1.2em;
  font-weight: 400;
  margin-top: 10px;
  margin-bottom: 10px;
`;
const HR = styled.hr`
  color: #d8d8d8;
`;
const ImgDiv = styled.div``;
const Img = styled.img`
  width: 100%;
`;
const Wrap = styled.div`
  width: 90%;
  margin: 0px auto;
`;

const Detail = styled.div`
  opacity: ${(props) => (props.active ? "1" : "0")};
  max-height: ${(props) => (props.active ? "100%" : "0")};
  overflow: hidden;
  padding: ${(props) => (props.active ? "15px" : "0 15px")};
  transition: all 0.5s;
`;

const OptionText = styled.div`
  text-align: left;
  font-size: 1.2em;
  font-weight: 400;
  margin-top: 10px;
  margin-bottom: 10px;
  width: 100%;
`;
const Option = styled.div`
  box-shadow: 5px 5px 10px #d8d8d8;
  border-radius: 20px;
  text-align: center;
  padding: 15px;
  margin: 5px;
`;
const DetailOption = styled.div`
  margin: 0px auto;
  width: 90%;
  display: flex;
  flex-wrap: wrap;
`;

export default CompleteForm;
