import React, { useRef } from 'react';
import { useRecoilValue } from 'recoil';
import { currentEstimateState, EstimateCarInfo } from '../../../atoms';
import {
  ButtonSet,
  NextButton,
  PrevButton,
  ContentBox,
  ContentTitle,
  CarInfoWrapper,
  CarInfoTable,
  CarInfoElement,
  CarInfoTitle,
  CarInfoDescription,
} from './CarInfoStyle';

const StateOne = ({ nextProcess, prevProcess }) => {
  const currentEstimate = useRecoilValue(currentEstimateState);
  const estimateCarInfo = useRecoilValue(EstimateCarInfo);

  const tableSection = useRef(null);

  // TO DO : table scroll 구현
  // const scrollToBottom = ref => {
  //   ref.current.scrollIntoView({ behavior: 'smooth' });
  // };

  const {
    owner,
    number,
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
    { id: 1, title: '차량번호', content: `${number}` },
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
    <div>
      {currentEstimate === 1 && (
        <ContentBox currentEstimate={currentEstimate}>
          <ContentTitle>차량 정보를 확인해주세요</ContentTitle>
          {/* TO DO : table scroll 구현
          <div onClick={() => scrollToBottom(tableSection)}>scroll</div> */}
          <CarInfoWrapper ref={tableSection}>
            <CarInfoTable>
              {CAR_INFO.map(({ id, title, content }) => {
                if (title === '거래이력') {
                  content = transaction_history.join('\n');
                }
                if (title === '보험이력') {
                  content = insurance_history.join('\n');
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
          <ButtonSet currentEstimate={currentEstimate}>
            <PrevButton onClick={prevProcess} variant="primary">
              이전
            </PrevButton>
            <NextButton onClick={nextProcess} variant="primary">
              다음
            </NextButton>
          </ButtonSet>
        </ContentBox>
      )}
    </div>
  );
};

export default StateOne;

// ** Replaced by CarInfoStyle.js
// const CarInfoWrapper = styled.div`
//   max-height: 70%;
//   overflow: scroll;

//   .test {
//     border: 1px solid black;
//   }
// `;

// const CarInfoTable = styled.table`
//   border-top: 1px solid ${({ theme }) => theme.colors.disabled};
//   border-bottom: 1px solid ${({ theme }) => theme.colors.disabled};
//   /* TODO : 내용 overflow 됐을 때 알려줄 요소 필요 */
//   /* background: linear-gradient(
//     0deg,
//     rgba(8, 94, 214, 0.1) 0%,
//     rgba(8, 94, 214, 0) 10%
//   ); */
//   margin: 0 auto;
//   width: 90%;
//   padding: 3% 0;
//   border-collapse: separate;
//   border-spacing: 0.2rem 0.9rem;
//   color: ${({ theme }) => theme.colors.gray};
//   white-space: pre-line;
//   vertical-align: bottom;
// `;

// const CarInfoElement = styled.tr`
//   text-align: left;
// `;

// const CarInfoTitle = styled.th`
//   width: 5rem;
//   text-align: left;
//   font-weight: 500;
//   color: ${({ theme }) => theme.colors.darkGray};
// `;

// const CarInfoDescription = styled.td`
//   margin-left: 1rem;
// `;
