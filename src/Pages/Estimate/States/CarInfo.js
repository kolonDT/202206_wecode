import React, { useRef } from 'react';
import styled from 'styled-components';
import { useRecoilValue, useRecoilState } from 'recoil';
import { currentEstimateState, EstimateCarInfo } from '../../../atoms';
import { InputButton, ContentBox, ContentTitle } from '../Style';

const CarInfo = ({ nextProcess }) => {
  const currentEstimate = useRecoilValue(currentEstimateState);
  const [estimateCarInfo, setEstimateCarInfo] = useRecoilState(EstimateCarInfo);
  const tableSection = useRef(null);

  // fetch(`http://172.30.1.11:8000/cars/info`, {
  //   header: {
  //     Authorization: localStorage.getItem('ACCESS_TOKEN'),
  //   },
  // })
  //   .then(res => res.json())
  //   .then(data => {
  //     console.log(data);
  //     console.log(data.results);
  //     setEstimateCarInfo(data.results);
  //   });

  const {
    owner,
    car_number,
    car_name,
    trim,
    model_year,
    color,
    first_registration_year,
    body_shape,
    transmission,
    engine,
    manufacturer,
    factory_price,
    transaction_history,
    insurance_history,
  } = estimateCarInfo;

  const CAR_INFO = [
    { id: 1, title: '차량번호', content: `${car_number}` },
    { id: 2, title: '소유자명', content: `${owner}` },
    { id: 3, title: '모델명', content: `${car_name}` },
    { id: 4, title: '출고등급', content: `${trim}` },
    { id: 5, title: '연식', content: `${model_year}` },
    { id: 6, title: '색상', content: `${color}` },
    { id: 7, title: '최초등록', content: `${first_registration_year}` },
    { id: 8, title: '차체형태', content: `${body_shape}` },
    { id: 9, title: '변속기', content: `${transmission}` },
    { id: 10, title: '엔진', content: `${engine}` },
    { id: 11, title: '제조사', content: `${manufacturer}` },
    { id: 12, title: '출고가격', content: `${factory_price}` },
    { id: 13, title: '거래이력', content: `${transaction_history}` },
    { id: 14, title: '보험이력', content: `${insurance_history}` },
  ];

  return (
    <ContentBox currentEstimate={currentEstimate}>
      <ContentTitle>차량 정보를 확인해주세요</ContentTitle>
      <CarInfoWrapper ref={tableSection}>
        <CarInfoTable>
          {CAR_INFO.map(({ id, title, content }) => {
            if (title === '거래이력') {
              // content = transaction_history.join('\n');
            }
            if (title === '보험이력') {
              // content = insurance_history.join('\n');
            }
            return (
              <CarInfoElement key={id}>
                <CarInfoTitle>{title}</CarInfoTitle>
                <CarInfoDescription>{content}</CarInfoDescription>
              </CarInfoElement>
            );
          })}
        </CarInfoTable>
      </CarInfoWrapper>
      <InputButton onClick={nextProcess} variant="primary">
        다음
      </InputButton>
    </ContentBox>
  );
};

export default CarInfo;

const CarInfoWrapper = styled.div`
  height: 70%;
  overflow: scroll;
`;

const CarInfoTitle = styled.th`
  width: 5rem;
  text-align: left;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.darkGray};
`;

const CarInfoDescription = styled.td`
  margin-left: 1rem;
`;

const CarInfoTable = styled.table`
  border-top: 1px solid ${({ theme }) => theme.colors.disabled};
  border-bottom: 1px solid ${({ theme }) => theme.colors.disabled};
  margin: 0 auto;
  width: 90%;
  padding: 3% 0;
  border-collapse: separate;
  border-spacing: 0.2rem 0.9rem;
  color: ${({ theme }) => theme.colors.gray};
  white-space: pre-line;
  vertical-align: bottom;
`;

const CarInfoElement = styled.tr`
  text-align: left;
`;
