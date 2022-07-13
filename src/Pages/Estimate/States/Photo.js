import React from 'react';
import { useSetRecoilState, useRecoilState, useRecoilValue } from 'recoil';
import styled from 'styled-components';
import {
  MainImageState,
  SubImageState,
  currentEstimateState,
  lastEstimateState,
  userEstimateProcessState,
} from '../../../atoms';
import {
  ButtonSet,
  NextButton,
  PrevButton,
  ContentBox,
  ContentTitle,
} from '../Style';
import { IP } from '../../../Hooks/Fetch';
import EssentialPhoto from './EssentialPhoto';
import MorePhoto from './MorePhoto';

const Photo = ({ prevProcess }) => {
  const [currentEstimate, setCurrentEstimate] =
    useRecoilState(currentEstimateState);
  const [lastEstimate, setLastEstimate] = useRecoilState(lastEstimateState);
  const setUserEstimateProcess = useSetRecoilState(userEstimateProcessState);
  const mainImage = useRecoilValue(MainImageState);
  const subImage = useRecoilValue(SubImageState);

  const goToContact = () => {
    setUserEstimateProcess('사진등록');
    const formData = new FormData();
    formData.append('image', mainImage.file[0]);
    formData.append('image', mainImage.file[1]);
    formData.append('image', mainImage.file[2]);
    formData.append('image', mainImage.file[3]);
    formData.append('image', subImage.file[0]);
    formData.append('image', subImage.file[1]);
    formData.append('image', subImage.file[2]);
    formData.append('image', subImage.file[3]);

    fetch(`${IP}estimates/image`, {
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

  return (
    <ContentBox>
      <PhotoFormWrapper>
        <ContentTitle>차량 사진을 올려주세요</ContentTitle>
        <PhotoInputContainer>
          <ContentSubTitle>필수 사진</ContentSubTitle>
          <ContentSubInfo>
            정면, 후면, 측면, 계기판 사진을 올려주세요
          </ContentSubInfo>
          <EssentialPhoto />
          <ContentSubTitle>참고 사진</ContentSubTitle>
          <ContentSubInfo>
            옵션이나 사고부위 등 참고가 될 만한 사진을 올려주세요
          </ContentSubInfo>
          <MorePhoto />
        </PhotoInputContainer>

        <ButtonSet>
          <PrevButton onClick={prevProcess} variant="primary">
            이전
          </PrevButton>
          <NextButton
            encType="multipart/form-data"
            onClick={goToContact}
            variant="primary"
          >
            다음
          </NextButton>
        </ButtonSet>
      </PhotoFormWrapper>
    </ContentBox>
  );
};

export default Photo;

const PhotoFormWrapper = styled.form``;

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
