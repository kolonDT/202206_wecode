import React from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';
import styled, { css } from 'styled-components';
import {
  currentEstimateState,
  lastEstimateState,
  userEstimateProcessState,
  essentialPhotoState,
  morePhotoState,
} from '../../../atoms';
import {
  ButtonSet,
  NextButton,
  PrevButton,
  ContentBox,
  ContentTitle,
} from '../Style';
import { IP } from '../../../Hooks/Fetch';

const Photo = ({ prevProcess }) => {
  const [currentEstimate, setCurrentEstimate] =
    useRecoilState(currentEstimateState);
  const [lastEstimate, setLastEstimate] = useRecoilState(lastEstimateState);
  const setUserEstimateProcess = useSetRecoilState(userEstimateProcessState);

  const goToContact = () => {
    setUserEstimateProcess('사진등록');

    const formData = new FormData();
    // formData.append('정면', frontPhoto);
    // formData.append('후면', backPhoto);
    // formData.append('후면');
    // formData.append('후면');

    // formData.append('추가1');
    // formData.append('추가2');
    // formData.append('추가3');
    // formData.append('추가3');

    fetch(`${IP}estimates`, {
      method: 'POST',
      headers: {
        Authorization: localStorage.getItem('access_token'),
      },
      body: formData,
    })
      .then(res => res.json())
      .then(data => {
        if (data.message === 'SUCCESS') {
          setCurrentEstimate(prev => prev + 1);
          lastEstimate <= currentEstimate &&
            setLastEstimate(currentEstimate + 1);
        } else {
          alert(data.message);
        }
      });
  };

  const [essentialPhoto, setEssentialPhoto] =
    useRecoilState(essentialPhotoState);
  const [morePhoto, setMorePhoto] = useRecoilState(morePhotoState);

  const uploadEssentialPhoto = e => {
    const imageLists = e.target.files;
    let photoArr = [...essentialPhoto];
    for (let i = 0; i < imageLists.length; i++) {
      const currentImageUrl = URL.createObjectURL(imageLists[i]);
      photoArr.push(currentImageUrl);
    }
    if (photoArr.length > 10) {
      photoArr = photoArr.slice(0, 10);
    }
    setEssentialPhoto(photoArr);
  };

  const uploadMorePhoto = e => {
    const imageLists = e.target.files;
    let photoArr = [...morePhoto];
    for (let i = 0; i < imageLists.length; i++) {
      const currentImageUrl = URL.createObjectURL(imageLists[i]);
      photoArr.push(currentImageUrl);
    }
    if (photoArr.length > 10) {
      photoArr = photoArr.slice(0, 10);
    }
    setMorePhoto(photoArr);
  };

  const removeEssentialPhoto = id => {
    setEssentialPhoto(essentialPhoto.filter((_, index) => index !== id));
  };

  const removeMorePhoto = id => {
    setMorePhoto(essentialPhoto.filter((_, index) => index !== id));
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
            <PhotoCardWrapper>
              <p>정면</p>
              <PhotoCard
                multiple
                name="필수"
                type="file"
                accept="image/*"
                onChange={e => uploadEssentialPhoto(e)}
              />
            </PhotoCardWrapper>
            <PhotoPreviewWrapper>
              {essentialPhoto.map((image, id) => (
                <div key={id}>
                  <img src={image} alt={`${image}-${id}`} />
                  <span onClick={() => removeEssentialPhoto(id)}>삭제</span>
                </div>
              ))}
            </PhotoPreviewWrapper>
          </PhotoInputLine>
        </PhotoInputWrapper>
        <ContentSubTitle>참고 사진</ContentSubTitle>
        <ContentSubInfo>
          옵션이나 사고부위 등 참고가 될 만한 사진을 올려주세요
        </ContentSubInfo>
        <PhotoInputWrapper>
          <PhotoInputLine>
            <PhotoCardWrapper>
              <p>추가</p>
              <PhotoCard
                multiple
                name="추가"
                type="file"
                accept="image/*"
                onChange={e => uploadMorePhoto(e)}
              />
            </PhotoCardWrapper>
            <PhotoPreviewWrapper>
              {morePhoto.map((image, id) => (
                <div key={id}>
                  <img src={image} alt={`${image}-${id}`} />
                  <span onClick={() => removeMorePhoto(id)}>삭제</span>
                </div>
              ))}
            </PhotoPreviewWrapper>
          </PhotoInputLine>
        </PhotoInputWrapper>
      </PhotoInputContainer>
      <ButtonSet>
        <PrevButton onClick={prevProcess} variant="primary">
          이전
        </PrevButton>
        <NextButton onClick={goToContact} variant="primary">
          다음
        </NextButton>
      </ButtonSet>
    </ContentBox>
  );
};

export default Photo;

const PhotoPreviewWrapper = styled.div`
  ${({ theme }) => theme.flex.flexBox}

  img {
    width: 5rem;
  }

  span {
    border: 1px solid black;
  }
`;

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
