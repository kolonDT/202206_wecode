import { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { GetEstimateInfoState } from '../../atoms';

export const [getEstimateInfo, setGetEstimateInfo] =
  useRecoilState(GetEstimateInfoState);

useEffect(() => {
  fetch('http://localhost:3000/Data/Dino/estimateData.json')
    .then(res => res.json())
    .then(data => {
      setGetEstimateInfo(data.results);
    });
}, []);

export const {
  car_number,
  owner,
  manufacturer,
  car_name,
  trim,
  engine,
  transmission,
  body_shape,
  model_year,
  color,
  first_registration_year,
} = getEstimateInfo;

export const {
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
} = getEstimateInfo.estimate[0];

export const ESTIMATE_INFO = [
  { id: 1, type: 'carInfo', title: '차량번호', content: `${car_number}` },
  { id: 2, type: 'carInfo', title: '소유주명', content: `${owner}` },
  {
    id: 3,
    type: 'carInfo',
    title: '차량정보',
    content: `${manufacturer} ${car_name} ${trim}`,
  },
  {
    id: 3,
    type: 'carInfo',
    title: '엔진/변속기',
    content: `${engine} ${transmission}`,
  },
  { id: 3, type: 'carInfo', title: '차체형태', content: `${body_shape}` },
  { id: 3, type: 'carInfo', title: '연식', content: `${model_year}년형` },
  { id: 6, type: 'carInfo', title: '색상', content: `${color}` },
  {
    id: 7,
    type: 'carInfo',
    title: '최초등록',
    content: `${first_registration_year}`,
  },

  { id: 13, type: 'userInputInfo', title: '주행거리', content: `${mileage}` },

  { id: 13, type: 'userInputInfo', title: '선루프', content: `${sunroof}` },
  {
    id: 13,
    type: 'userInputInfo',
    title: '내비게이션',
    content: `${navigation}`,
  },
  {
    id: 13,
    type: 'userInputInfo',
    title: '통풍시트',
    content: `${ventilation_seat}`,
  },
  {
    id: 13,
    type: 'userInputInfo',
    title: '열선시트',
    content: `${heated_seat}`,
  },
  {
    id: 13,
    type: 'userInputInfo',
    title: '전동시트',
    content: `${electric_seat}`,
  },
  {
    id: 13,
    type: 'userInputInfo',
    title: '스마트키',
    content: `${smart_key}`,
  },
  {
    id: 13,
    type: 'userInputInfo',
    title: '가죽시트',
    content: `${leather_seat}`,
  },
  {
    id: 13,
    type: 'userInputInfo',
    title: '전동접이미러',
    content: `${electric_folding_mirror}`,
  },

  {
    id: 13,
    type: 'userInputInfo',
    title: '사고이력',
    content: `${accident_status}`,
  },
  { id: 13, type: 'userInputInfo', title: '보조키', content: `${spare_key}` },
  {
    id: 13,
    type: 'userInputInfo',
    title: '휠스크래치',
    content: `${wheel_scratch}`,
  },
  {
    id: 13,
    type: 'userInputInfo',
    title: '외판스크래치',
    content: `${outer_plate_scratch}`,
  },
  {
    id: 13,
    type: 'userInputInfo',
    title: '기타정비필요사항',
    content: `${other_maintenance_repair}`,
  },
  {
    id: 13,
    type: 'userInputInfo',
    title: '특이사항',
    content: `${other_special}`,
  },

  {
    id: 13,
    type: 'processState',
    title: '진행상태',
    content: `${process_state}`,
  },
];
