import React from 'react';
import styled from 'styled-components';
import {
  ButtonSet,
  NextButton,
  PrevButton,
  ContentBox,
  ContentTitle,
} from './CarInfoStyle';
import PhotoCard from '../../Sellcar/PhotoCard';

const StateFive = ({ nextProcess, prevProcess }) => {
  return (
    <ContentBox>
      <ContentTitle>차량 사진을 올려주세요</ContentTitle>
      <PhotoInputContainer>
        <ContentSubTitle>필수 사진</ContentSubTitle>
        <ContentSubInfo>
          정면, 후면, 측면, 계기판 사진을 올려주세요
        </ContentSubInfo>
        <PhotoInputWrapper>
          <PhotoInputLine>
            {['정면', '후면', '측면', '계기판'].map((value, index) => (
              <PhotoCard
                key={index}
                index={index}
                value={value}
                // setCarImages={setCarImages}
                // carImages={carImages}
                // setThumbnails={setThumbnails}
                // thumbnails={thumbnails}
              />
            ))}
          </PhotoInputLine>
        </PhotoInputWrapper>
        <ContentSubTitle>참고 사진</ContentSubTitle>
        <ContentSubInfo>
          옵션이나 사고부위 등 참고가 될 만한 사진을 올려주세요
        </ContentSubInfo>
        <PhotoInputWrapper>
          <PhotoInputLine>
            {['+', '+', '+', '+'].map((value, index) => (
              <PhotoCard
                key={index}
                index={index}
                value={value}
                // setCarImages={setCarImages}
                // carImages={carImages}
                // setThumbnails={setThumbnails}
                // thumbnails={thumbnails}
              />
            ))}
          </PhotoInputLine>
        </PhotoInputWrapper>
      </PhotoInputContainer>
      <ButtonSet>
        <PrevButton onClick={prevProcess} variant="primary">
          이전
        </PrevButton>
        <NextButton onClick={nextProcess} variant="primary">
          다음
        </NextButton>
      </ButtonSet>
    </ContentBox>
  );
};

export default StateFive;

const ContentSubTitle = styled.h3`
  font-size: medium;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.darkGray};
`;

const ContentSubInfo = styled.div`
  font-size: small;
  margin-top: 0.3rem;
  color: ${({ theme }) => theme.colors.darkGray};
`;

const PhotoInputContainer = styled.div`
  /* border: 1px solid black; */
`;

const PhotoInputWrapper = styled.div`
  margin: 1rem 0;
  /* border: 1px solid black; */
`;

const PhotoInputLine = styled.div`
  ${({ theme }) => theme.flex.flexBox}
`;
