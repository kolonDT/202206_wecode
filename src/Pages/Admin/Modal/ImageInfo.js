import React, { Component } from 'react';
import styled from 'styled-components/macro';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { useRecoilValue } from 'recoil';
import { setModalList } from '../adminAtoms';

const ImageInfo = () => {
  const getModal = useRecoilValue(setModalList);
  const { car_image } = getModal;

  return (
    <Container>
      <Slidetitle>인기 서비스</Slidetitle>
      <StyledSlider {...Settings}>
        {car_image?.map(({ name, img }) => {
          return (
            <CardBox key={name}>
              <CardImg alt="자동차 사진" src={img} />
              <CardText>{name}</CardText>
            </CardBox>
          );
        })}
      </StyledSlider>
    </Container>
  );
};

const Settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  centerPadding: '0px',
};

const Slidetitle = styled.h2`
  padding: 10px 0 10px 0;
  text-align: center;
  font-size: 20px;
`;

const Container = styled.div`
  margin-right: 25px;
`;

// 슬라이드 CSS
const StyledSlider = styled(Slider)`
  .slick-list {
    width: 420px;
    margin: 0 auto;
  }

  .slick-slide div {
    cursor: pointer;
  }

  .slick-dots {
    bottom: -10px;
    margin-top: 20px;
  }

  .slick-track {
    overflow-x: hidden;
  }
`;

const CardBox = styled.div`
  cursor: pointer;
`;

const CardImg = styled.p`
  width: 400px;
  height: 500px;
`;

const CardText = styled.p`
  padding: 20px;
  font-size: 10px;
  font-weight: bolder;
  text-align: center;
`;

export default ImageInfo;
