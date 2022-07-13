import React, { Component } from 'react';
import styled, { css } from 'styled-components/macro';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { useRecoilValue } from 'recoil';
import { setModalList } from '../adminAtoms';

const ImageInfo = () => {
  const getModal = useRecoilValue(setModalList);
  const { estimate_image } = getModal;

  return (
    <Container>
      <Slidetitle>자동차 상태 사진</Slidetitle>
      <StyledSlider {...Settings}>
        {estimate_image?.map(({ image_id, image, image_info }) => {
          return (
            <CardBox key={image_id}>
              <CardImg image={image} alt="자동차 사진" />
              <CardText>{image_info}</CardText>
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
  font-size: ${props => props.theme.fontSizes.small};
  font-weight: ${props => props.theme.fontWeights.extraBold};
  margin-bottom: 10px;
  margin-top: 30px;
`;

const Container = styled.div`
  margin-right: 25px;
`;

// 슬라이드 CSS
const StyledSlider = styled(Slider)`
  display: flex;
  align-items: center;
  background-color: #dbdbdb;
  .slick-list {
    width: 450px;
    margin: 0 auto;
  }

  .slick-slide div {
    cursor: pointer;
  }

  .slick-dots {
    bottom: 10px;
    margin-top: 20px;
  }

  .slick-track {
    overflow-x: hidden;
  }
  width: 420px;
  height: 450px;
`;

const CardBox = styled.div`
  cursor: pointer;
`;

const CardImg = styled.div`
  margin: 0 auto;
  width: 350px;
  height: 350px;

  ${({ image }) =>
    css`
      background-image: url(http://10.133.5.8:8000/${image});
      background-position: center;
      background-size: cover;
      background-repeat: no-repeat;
    `}
`;

const CardText = styled.p`
  padding: 10px;
  margin-top: 5px;
  font-size: 15px;
  font-weight: bolder;
  text-align: center;
`;

export default ImageInfo;
