import React, { useState, useEffect } from 'react';
import styled, { css } from 'styled-components';
import {
  ButtonSet,
  NextButton,
  PrevButton,
  ContentBox,
  ContentTitle,
} from '../Style';

const Photo = ({ nextProcess, prevProcess }) => {
  const [file, setFile] = useState([]);
  const [previewURL, setPreviewURL] = useState([]);

  useEffect(() => {
    if (file !== '') setPreviewURL(' (reader.result) ');
  }, [file]);

  const handleFileOnChange = e => {
    e.preventDefault();
    const file = e.target.files[0];
    const reader = new FileReader();
    const formData = new FormData();

    formData.append('files', setFile);
    setFile(file);

    reader.onload = () => {
      setPreviewURL(reader.result);
    };

    if (file) reader.readAsDataURL(file);
  };

  const removeImg = () => {
    setFile('');
    setPreviewURL('');
  };

  console.log('file', file);
  console.log('previewURL', previewURL);

  const checkID = id => {
    console.log(id);
  };

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
            {PHOTO_LIST.map(
              ({ id, type, content }) =>
                type === '필수' && (
                  <>
                    <PhotoCardWrapper key={id}>
                      <p>{content}</p>
                      <PhotoCard
                        previewURL={previewURL}
                        name={content}
                        type="file"
                        accept="image/*"
                        // style={{ display: 'none' }}
                        onChange={handleFileOnChange}
                        onClick={() => checkID(id)}
                      />
                    </PhotoCardWrapper>
                    <PhotoRemoveBtn onClick={removeImg}>x</PhotoRemoveBtn>
                  </>
                )
            )}
          </PhotoInputLine>
        </PhotoInputWrapper>
        <ContentSubTitle>참고 사진</ContentSubTitle>
        <ContentSubInfo>
          옵션이나 사고부위 등 참고가 될 만한 사진을 올려주세요
        </ContentSubInfo>
        <PhotoInputWrapper>
          <PhotoInputLine>
            {PHOTO_LIST.map(
              ({ id, type, content }) =>
                type === '참고' && (
                  <PhotoCardWrapper key={id}>
                    <p>{content}</p>
                    <PhotoCard
                      name={content}
                      type="file"
                      // accept="image/*"
                      // style={{ display: 'none' }}
                      // onClick={handleFileOnChange}
                    />
                  </PhotoCardWrapper>
                )
            )}
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

export default Photo;

const PhotoCardWrapper = styled.div`
  ${({ theme }) => theme.flex.flexBox}
  border: 1px solid rgba(8, 94, 214, 0.2);
  border-radius: 0.5rem;
  width: 23%;
  margin: 0 1.5% 1.5% 0;
  padding: 11% 0;
  color: rgba(0, 0, 0, 0.5);
  overflow: hidden;
  cursor: pointer;
  text-align: center;
  transition: border ease-in-out 150ms;

  :hover {
    border: 1px solid ${({ theme }) => theme.colors.primaryBlue};
  }

  @media only screen and (max-width: 640px) {
    font-size: 80%;
  }

  p {
    position: absolute;
    color: rgba(8, 94, 214, 0.5);
    font-weight: 600;
    padding: 0;
  }
`;

const PhotoRemoveBtn = styled.div`
  /* position: relative; */
  bottom: 0;
  border: 1px solid black;
  cursor: pointer;
`;

const PhotoCard = styled.input`
  border: 1px solid black;
  height: 5rem;
  width: 5rem;

  ${({ previewURL }) => css`
    background-image: url(${previewURL});
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
  `}
`;

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

const PhotoInputContainer = styled.div``;

const PhotoInputWrapper = styled.div`
  margin: 1rem 0;
`;

const PhotoInputLine = styled.div`
  ${({ theme }) => theme.flex.flexBox}
`;

const PHOTO_LIST = [
  { id: 1, type: '필수', content: '정면' },
  { id: 2, type: '필수', content: '후면' },
  { id: 3, type: '필수', content: '측면' },
  { id: 4, type: '필수', content: '계기판' },
  { id: 5, type: '참고', content: '추가1' },
  { id: 6, type: '참고', content: '추가2' },
  { id: 7, type: '참고', content: '추가3' },
  { id: 8, type: '참고', content: '추가4' },
];
