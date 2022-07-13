import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled, { css } from 'styled-components';
import { ContentBox, ContentTitle, InputButton } from '../Estimate/Style';
import { useRecoilState, useRecoilValue } from 'recoil';
import {
  GetCarInfoState,
  GetUserInputInfoState,
  GetUserInputPhotoState,
  AlarmListState,
} from '../../atoms';
import { IP } from '../../config';

const MyState = () => {
  const [getEstimateInfo, setGetEstimateInfo] = useRecoilState(GetCarInfoState);
  const [getUserInputInfo, setGetUserInputInfo] = useRecoilState(
    GetUserInputInfoState
  );
  const [getUserInputPhoto, setGetUserInputPhoto] = useRecoilState(
    GetUserInputPhotoState
  );

  const alarmList = useRecoilValue(AlarmListState);

  useEffect(() => {
    fetch(`${IP}estimates/detail`, {
      headers: {
        Authorization: localStorage.getItem('access_token'),
      },
    })
      .then(res => res.json())
      .then(data => {
        setGetEstimateInfo(data.results);
        setGetUserInputInfo(data.results.estimate[0]);
        setGetUserInputPhoto(data.results.estimate[0].image);
      });
  }, []);

  const {
    car_number,
    manufacturer,
    car_name,
    trim,
    engine,
    transmission,
    model_year,
    color,
  } = getEstimateInfo;

  const {
    address,
    phone_number,
    mileage,
    sunroof,
    navigation,
    ventilation_seat,
    heated_seat,
    electric_seat,
    smart_key,
    leather_seat,
    electric_folding_mirror,
    accident_status,
    spare_key,
    wheel_scratch,
    outer_plate_scratch,
    other_maintenance_repair,
    other_special,
    process_state,
  } = getUserInputInfo;

  const ESTIMATE_INFO = [
    {
      id: 0,
      type: 'processState',
      title: '진행상태',
      content: `${process_state}`,
    },
    {
      id: 3,
      type: 'carInfo',
      title: '차량정보',
      content: `${manufacturer} ${car_name} ${trim}`,
    },
    { id: 4, type: 'carInfo', title: '연식', content: `${model_year}년형` },
    {
      id: 5,
      type: 'carInfo',
      title: '엔진/변속기',
      content: `${engine} ${transmission}`,
    },
    { id: 6, type: 'carInfo', title: '색상', content: `${color}` },
    { id: 9, type: 'userInputInfo', title: '주행거리', content: `${mileage}` },
    {
      id: 10,
      type: 'userSelectedOption',
      title: '선루프',
      content: `${sunroof}`,
    },
    {
      id: 11,
      type: 'userSelectedOption',
      title: '내비게이션',
      content: `${navigation}`,
    },
    {
      id: 12,
      type: 'userSelectedOption',
      title: '통풍시트',
      content: `${ventilation_seat}`,
    },
    {
      id: 13,
      type: 'userSelectedOption',
      title: '열선시트',
      content: `${heated_seat}`,
    },
    {
      id: 14,
      type: 'userSelectedOption',
      title: '전동시트',
      content: `${electric_seat}`,
    },
    {
      id: 15,
      type: 'userSelectedOption',
      title: '스마트키',
      content: `${smart_key}`,
    },
    {
      id: 16,
      type: 'userSelectedOption',
      title: '가죽시트',
      content: `${leather_seat}`,
    },
    {
      id: 17,
      type: 'userSelectedOption',
      title: '전동접이미러',
      content: `${electric_folding_mirror}`,
    },
    {
      id: 18,
      type: 'userInputInfo',
      title: '사고이력',
      content: `${accident_status}`,
    },
    { id: 19, type: 'userInputInfo', title: '보조키', content: `${spare_key}` },
    {
      id: 20,
      type: 'userInputInfo',
      title: '휠스크래치',
      content: `${wheel_scratch}`,
    },
    {
      id: 21,
      type: 'userInputInfo',
      title: '외판스크래치',
      content: `${outer_plate_scratch}`,
    },
    {
      id: 22,
      type: 'userInputInfo',
      title: '정비필요사항',
      content: `${other_maintenance_repair}`,
    },
    {
      id: 23,
      type: 'userInputInfo',
      title: '특이사항',
      content: `${other_special}`,
    },
  ];

  const navigate = useNavigate();
  const goToMain = () => {
    navigate('/');
  };

  return (
    <Background>
      <BodyWrapper>
        <EstimateWrapper>
          <ContentsBox>
            <ContentsTitle>{car_number}</ContentsTitle>
            {alarmList.length && (
              <SubTitle>{alarmList[alarmList.length - 1].content}</SubTitle>
            )}
            <CarInfoWrapper>
              <CarInfoTable>
                {ESTIMATE_INFO.map(
                  ({ id, type, title, content }) =>
                    type === 'carInfo' && (
                      <InfoWrapper key={id}>
                        <InfoElement>{title}</InfoElement>
                        <InfoDescription>{content}</InfoDescription>
                      </InfoWrapper>
                    )
                )}
                <InfoWrapper>
                  <InfoElement>추가옵션</InfoElement>
                  <InfoDescription>
                    {ESTIMATE_INFO.map(
                      ({ id, type, title, content }) =>
                        type === 'userSelectedOption' &&
                        content === 'true' && <span key={id}>{title} </span>
                    )}
                  </InfoDescription>
                </InfoWrapper>
                {ESTIMATE_INFO.map(
                  ({ id, type, title, content }) =>
                    type === 'userInputInfo' && (
                      <InfoWrapper key={id}>
                        <InfoElement>{title}</InfoElement>
                        {title === '주행거리' ? (
                          <InfoDescription>
                            {`${content
                              .toString()
                              .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                          km`}
                          </InfoDescription>
                        ) : (
                          <InfoDescription>{content}</InfoDescription>
                        )}
                      </InfoWrapper>
                    )
                )}
                {getUserInputPhoto.length && (
                  <PhotoInfoWrapper>
                    <InfoElement>차량 사진</InfoElement>
                    {getUserInputPhoto.map(({ image_info, image }) => (
                      <InfoDescription key={image_info}>
                        <PhotoCard preview={image} />
                      </InfoDescription>
                    ))}
                  </PhotoInfoWrapper>
                )}
                <InfoWrapper>
                  <InfoElement>방문 장소</InfoElement>
                  <InfoDescription>{address}</InfoDescription>
                </InfoWrapper>
                <InfoWrapper>
                  <InfoElement>연락처</InfoElement>
                  <InfoDescription>{phone_number}</InfoDescription>
                </InfoWrapper>
              </CarInfoTable>
            </CarInfoWrapper>
            <InputButton onClick={goToMain} variant="primary">
              메인 화면으로 이동
            </InputButton>
          </ContentsBox>
        </EstimateWrapper>
      </BodyWrapper>
    </Background>
  );
};

export default MyState;

const SubTitle = styled.h4`
  font-size: medium;
  margin-bottom: 2.5rem;
  color: ${({ theme }) => theme.colors.darkGray};
`;

const CarInfoWrapper = styled.div`
  height: 70%;
  overflow: scroll;
`;

const ContentsBox = styled(ContentBox)`
  height: 85vh;
  overflow: scroll;
`;

const CarInfoTable = styled.table`
  font-size: 90%;
  border-top: 1px solid ${({ theme }) => theme.colors.disabled};
  border-bottom: 1px solid ${({ theme }) => theme.colors.disabled};
  margin: 0 auto;
  width: 90%;
  padding: 8% 0;
  border-collapse: separate;
  border-spacing: 0.2rem 0;
  color: ${({ theme }) => theme.colors.gray};
  table-layout: fixed;

  @media only screen and (max-width: 640px) {
    width: 95%;
  }
`;

const InfoElement = styled.th`
  min-width: 7.5rem;
  text-align: left;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.darkGray};
`;

const InfoDescription = styled.td`
  word-break: keep-all;
  word-wrap: break-word;
  margin-left: 1rem;
  line-height: 1rem;

  span {
    margin-right: 0.1rem;
  }
`;

const PhotoCard = styled.div`
  height: 10rem;

  ${({ preview }) => css`
    background-image: url(${IP}${preview});
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
    border-radius: 0.5rem;
    width: 10rem;
  `}
`;

const InfoWrapper = styled.div`
  margin-bottom: 1rem;

  &:last-child {
    margin-bottom: 0;
  }
`;

const PhotoInfoWrapper = styled.div`
  display: flex;
  align-items: flex-start;
  overflow-y: hidden;
  overflow-x: scroll;
  margin-bottom: 1rem;
`;

const ContentsTitle = styled(ContentTitle)`
  font-size: xx-large;
  margin-bottom: 0.8rem;
`;

const EstimateWrapper = styled.section`
  width: 100%;
  height: fit-content;
  position: absolute;
  top: 5vh;
  box-shadow: 0px 0px 8px rgba(8, 94, 214, 0.05);
`;

const BodyWrapper = styled.div`
  ${({ theme }) => theme.flex.flexBox('column')}
  position: relative;
  width: 640px;
  height: 100%;

  @media only screen and (max-width: 640px) {
    width: 90%;
  }
`;

const Background = styled.div`
  ${({ theme }) => theme.flex.flexBox('column')}
  width: 100vw;
  height: 95vh;
  background: aliceblue;
`;
