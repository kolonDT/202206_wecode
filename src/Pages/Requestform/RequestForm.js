import React from "react";
import { RiArrowDropDownLine } from "react-icons/ri";
import { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./slide.css";
import styled from "styled-components";
import moment from "moment";
import { setAlarm, getAlarm } from "../Api/Api";
let PORT = process.env.REACT_APP_PORT;

function RequestForm({ isNew, setNew, setPage }) {
  const [fold, setFold] = useState(false);
  const [data, setData] = useState();
  let optionList = "";

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

  useEffect(() => {
    getData();
    setPage("default");
  }, []);

  useEffect(() => {
    getAlarm(setNew);
    if (isNew === 1) {
      setNew(0);
      setAlarm(0);
    }
  }, [isNew]);

  if (data === undefined) return null;
  optionList = data.options.split(",").map((opt, index) => {
    return optionList.concat(opt);
  });
  optionList = optionList.join(",");
  console.log("t------------------", isNew);
  return (
    <>
      <Box>
        <ProcessArray data={data} />
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
        <DetailList
          fold={fold}
          data={data}
          optionList={optionList}
        ></DetailList>
      </Box>
    </>
  );
}
const DetailList = React.memo(function DetailList({ fold, data, optionList }) {
  return (
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
      <DetailLine>
        <TextTitle>옵션</TextTitle>
        <Text>{optionList}</Text>
      </DetailLine>
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
    </Detail>
  );
});

const ProcessArray = React.memo(function ProcessArray({ data }) {
  let process = {
    "판매 완료": "",
    "판매 요청": "",
    "딜러 방문 상담": "",
    "담당 딜러 배정": "",
    "견적요청 접수": "",
  };
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
});

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
          console.log("imgUrl", imgUrl);
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
  width: 20%;
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
const DetailOption = styled.div`
  margin: 0px auto;
  width: 90%;
  display: flex;
  flex-wrap: wrap;
`;

export default RequestForm;
