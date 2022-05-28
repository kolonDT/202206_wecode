import React from "react";
import { RiArrowDropDownLine } from "react-icons/ri";
import { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./slide.css";
import styled from "styled-components";
import { Map, MapMarker } from "react-kakao-maps-sdk";
import moment from "moment";
let PORT = process.env.REACT_APP_PORT;

function RequestForm({ isNew, setNew, setPage }) {
  const [fold, setFold] = useState(false);
  const [data, setData] = useState();
  let process = {
    "판매 완료": "",
    "판매 요청": "",
    "딜러 방문 상담": "",
    "담당 딜러 배정": "",
    "견적요청 접수": "",
  };

  const getData = () => {
    fetch(`/car/myCar?carNumber=${localStorage.getItem("carNumber")}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setData(data["registeredCarInfo"][0]);
      });
  };
  const getAlarm = async () => {
    await fetch(`/car/myCar?carNumber=${localStorage.getItem("carNumber")}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setNew(data["registeredCarInfo"][0].is_new);
      });
  };
  const setAlarm = (status) => {
    fetch(
      `/history/notification?carNumber=${localStorage.getItem("carNumber")}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ notificationStatus: status }),
      }
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      });
  };

  useEffect(() => {
    getData();
    getAlarm();
    if (isNew === 1) {
      setNew(0);
      setAlarm(0);
    }
    setPage("default");
  }, [isNew]);

  if (data === undefined) return null;
  process["견적요청 접수"] = moment(data.quote_requested)
    .utc()
    .format("YYYY-MM-DD"); //HH:mm:ss
  process["담당 딜러 배정"] = moment(data.dealer_assigned)
    .utc()
    .format("YYYY-MM-DD");
  process["딜러 방문 상담"] = moment(data.dealer_consulting)
    .utc()
    .format("YYYY-MM-DD");
  process["판매 요청"] = moment(data.selling_requested)
    .utc()
    .format("YYYY-MM-DD");
  process["판매 완료"] = moment(data.selling_completed)
    .utc()
    .format("YYYY-MM-DD");
  console.log(data);
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
            <div>
              내 요청내용 보기
              <RiArrowDropDownLine />
            </div>
          ) : null}
        </Folding>
        <Detail active={fold}>
          <HR />
          <ImageSlide data={data} />
          <DetailLine>
            <TextTitle>차량번호</TextTitle>
            <Text>{data.car_number}</Text>
          </DetailLine>
          <DetailLine>
            <TextTitle>모델명</TextTitle>
            <Text>{data.model_name}</Text>
          </DetailLine>
          <DetailLine>
            <TextTitle>연식</TextTitle>
            <Text>{data.model_year}년형</Text>
          </DetailLine>
          <DetailLine>
            <TextTitle>주행거리</TextTitle>
            <Text>{data.driving_distance}km</Text>
          </DetailLine>
          <DetailOption>
            <OptionText>옵션</OptionText>
            {data.options.split(",").map((opt, index) => {
              return <Option>{opt}</Option>;
            })}
          </DetailOption>
          <DetailLine>
            <TextTitle>연락처</TextTitle>
            <Text>{data.contact}</Text>
          </DetailLine>
          <DetailLine>
            <TextTitle>지역</TextTitle>
            <Text>
              {data.address} {data.address_detail}
            </Text>
          </DetailLine>

          {/* <Map
            center={{
              lat: Number(data.lat),
              lng: Number(data.lon),
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
                lat: Number(data.lat),
                lng: Number(data.lon),
              }}
            />
          </Map> */}
        </Detail>
      </Box>
    </>
  );
}

function ProcessArray({ process }) {
  return Object.entries(process).map(([key, value]) =>
    value !== "Invalid date" ? (
      <Line>
        <P>{key}</P>
        <P>{value}</P>
      </Line>
    ) : (
      <Line>
        <P active={1}>{key}</P>
        <P></P>
      </Line>
    )
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
  if (data.image === null) return null;
  return (
    <Wrap>
      <Slider {...settings}>
        {data.image.split(",").map((imgUrl, index) => {
          imgUrl = PORT.concat(imgUrl);
          console.log(imgUrl);
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
const TextTitle = styled.p`
  font-size: 1.2em;
  font-weight: 600;
  margin-top: 10px;
  margin-bottom: 10px;
  @media only screen and (max-width: 640px) {
    font-size: 0.8em;
    font-weight: 600;
  }
`;

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
  color: ${(props) => (props.active ? "#adadad" : "black")};
  margin-top: 10px;
  margin-bottom: 20px;
  @media only screen and (max-width: 640px) {
    font-size: 1em;
  }
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
  @media only screen and (max-width: 640px) {
    font-size: 0.8em;
  }
`;
const HR = styled.hr`
  color: #d8d8d8;
  margin-bottom: 20px;
  border: 1px dotted #adadad;
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
  font-weight: 600;
  margin-top: 10px;
  margin-bottom: 10px;
  width: 100%;
  @media only screen and (max-width: 640px) {
    font-size: 0.8em;
    font-weight: 600;
  }
`;
const Option = styled.div`
  box-shadow: 5px 5px 10px #d8d8d8;
  border-radius: 20px;
  text-align: center;
  padding: 15px;
  margin: 5px;
  @media only screen and (max-width: 640px) {
    font-size: 0.8em;
  }
`;
const DetailOption = styled.div`
  margin: 0px auto;
  width: 90%;
  display: flex;
  flex-wrap: wrap;
`;

export default RequestForm;
