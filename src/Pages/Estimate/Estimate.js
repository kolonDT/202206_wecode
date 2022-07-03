import React, { useEffect } from 'react';
import { ProgressBar, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useRecoilState } from 'recoil';
import {
  currentEstimateState,
  lastEstimateState,
  EstimateCarInfo,
  UserInputOwnerState,
} from '../../atoms';
import { MdOutlineNavigateNext } from 'react-icons/md';
import styled, { css } from 'styled-components';
import Graph from '../Graph/Graph';

const Estimate = () => {
  useEffect(() => {
    fetch('http://localhost:3000/Data/Dino/carData.json')
      .then(res => res.json())
      .then(data => {
        setEstimateCarInfo(data);
      });
  }, []);

  const [currentEstimate, setCurrentEstimate] =
    useRecoilState(currentEstimateState);
  const [estimateCarInfo, setEstimateCarInfo] = useRecoilState(EstimateCarInfo);
  const [userInputOwner, setUserInputOwner] =
    useRecoilState(UserInputOwnerState);
  const [lastEstimate, setLastEstimate] = useRecoilState(lastEstimateState);
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

  const getUserInputOwner = e => {
    setUserInputOwner(e.target.value);
  };

  const checkOwner = () => {
    userInputOwner === owner
      ? setCurrentEstimate(prev => prev + 1)
      : alert('소유자명을 확인해주세요');
    lastEstimate <= currentEstimate && setLastEstimate(currentEstimate + 1);
  };

  const nextProcess = () => {
    setCurrentEstimate(prev => prev + 1);
    lastEstimate <= currentEstimate && setLastEstimate(currentEstimate + 1);
  };

  const prevProcess = () => {
    setCurrentEstimate(prev => prev - 1);
  };

  const goToProcess = id => {
    id <= lastEstimate && setCurrentEstimate(id);
  };

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
    <Background>
      <BodyWrapper>
        <EstimateWrapper>
          <ProcessBox>
            <ProcessState>
              {PROCESS_STATE.map(({ id, text }) => (
                <CurrentProcess
                  key={id}
                  active={currentEstimate + 1 === id}
                  onClick={() => goToProcess(id - 1)}
                >
                  {text}
                  {id !== PROCESS_STATE.length && <NextIcon />}
                </CurrentProcess>
              ))}
            </ProcessState>
            <PercentageBar
              now={5 + (currentEstimate / PROCESS_STATE.length) * 100}
            />
          </ProcessBox>
          {/* STATE 0 : 소유자명 입력 */}
          {currentEstimate === 0 && (
            <ContentBox>
              <ContentTitle>소유자명을 입력해주세요</ContentTitle>
              <InputBox
                placeholder="홍길동"
                onChange={e => getUserInputOwner(e)}
                value={userInputOwner}
              />
              <InputButton onClick={checkOwner} variant="primary">
                확인
              </InputButton>
            </ContentBox>
          )}
          {/* STATE 1 : 차량정보 확인 */}
          {currentEstimate === 1 && (
            <ContentBox currentEstimate={currentEstimate}>
              <ContentTitle>차량 정보를 확인해주세요</ContentTitle>
              <CarInfoWrapper>
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
              <ButtonSet>
                <PrevButton onClick={prevProcess} variant="primary">
                  이전
                </PrevButton>
                <NextButton onClick={nextProcess} variant="primary">
                  다음
                </NextButton>
              </ButtonSet>
            </ContentBox>
          )}
          {/* STATE 2 : 예상시세 표출 */}
          {currentEstimate === 2 && (
            <ContentBox>
              <ContentTitle>
                <OwnerTag>{owner}</OwnerTag>님의 <CarTag>{car_name}</CarTag> 🚙
                <br />
                예상시세는 다음과 같습니다.
              </ContentTitle>
              <Graph />
              <ButtonSet>
                <PrevButton onClick={prevProcess} variant="primary">
                  이전
                </PrevButton>
                <NextButton onClick={nextProcess} variant="primary">
                  다음
                </NextButton>
              </ButtonSet>
            </ContentBox>
          )}
          {/* STATE 3 : 주행거리 입력 */}
          {currentEstimate === 3 && (
            <ContentBox>
              <ContentTitle>
                보다 정확한 견적을 위해
                <br /> 주행거리를 입력해주세요
              </ContentTitle>
              <InputBox
                placeholder="12,345 km"
                // onChange={e => getUserInputOwner(e)}
                // value={userInputOwner}
              />
              <ButtonSet>
                <PrevButton onClick={prevProcess} variant="primary">
                  이전
                </PrevButton>
                <NextButton onClick={nextProcess} variant="primary">
                  다음
                </NextButton>
              </ButtonSet>
            </ContentBox>
          )}
          {/* STATE 4 : 추가옵션 입력 */}
          {currentEstimate === 4 && (
            <ContentBox>
              <ContentTitle>
                차량에 포함 된
                <br /> 옵션을 선택해주세요
              </ContentTitle>
              추가옵션 List
              <ButtonSet>
                <PrevButton onClick={prevProcess} variant="primary">
                  이전
                </PrevButton>
                <NextButton onClick={nextProcess} variant="primary">
                  다음
                </NextButton>
              </ButtonSet>
            </ContentBox>
          )}
          {/* STATE 5 : 추가정보 입력 */}
          {currentEstimate === 5 && (
            <ContentBox>
              <ContentTitle>
                보험 외 사고 처리를
                <br /> 하신 적이 있다면 알려주세요
              </ContentTitle>
              <InputBox
                placeholder="추가입력 사항"
                // onChange={e => getUserInputOwner(e)}
                // value={userInputOwner}
              />
              <ButtonSet>
                <PrevButton onClick={prevProcess} variant="primary">
                  이전
                </PrevButton>
                <NextButton onClick={nextProcess} variant="primary">
                  다음
                </NextButton>
              </ButtonSet>
            </ContentBox>
          )}
          {/* STATE 6 : 사진등록 */}
          {currentEstimate === 6 && (
            <ContentBox>
              <ContentTitle>차량 사진을 올려주세요</ContentTitle>
              사진 등록 Form
              <ButtonSet>
                <PrevButton onClick={prevProcess} variant="primary">
                  이전
                </PrevButton>
                <NextButton onClick={nextProcess} variant="primary">
                  다음
                </NextButton>
              </ButtonSet>
            </ContentBox>
          )}
        </EstimateWrapper>
      </BodyWrapper>
    </Background>
  );
};

export default Estimate;

const OwnerTag = styled.span`
  color: ${({ theme }) => theme.colors.primaryBlue};
  /* text-decoration: underline; */
`;

const CarTag = styled.span`
  background-color: ${({ theme }) => theme.colors.primaryBlue};
  color: ${({ theme }) => theme.colors.white};
  border-radius: 0.2rem;
  padding: 0 0.3rem;
  font-size: 22px;
`;

const CarInfoWrapper = styled.div`
  max-height: 70%;
  overflow: scroll;
`;

const CarInfoTable = styled.table`
  border-top: 1px solid ${({ theme }) => theme.colors.disabled};
  border-bottom: 1px solid ${({ theme }) => theme.colors.disabled};
  /* TODO : 내용 overflow 됐을 때 알려줄 요소 필요 */
  /* background: linear-gradient(
    0deg,
    rgba(8, 94, 214, 0.1) 0%,
    rgba(8, 94, 214, 0) 10%
  ); */
  margin: 0 auto;
  width: 90%;
  padding: 3% 0;
  border-collapse: separate;
  border-spacing: 0.2rem 1rem;
  color: ${({ theme }) => theme.colors.gray};
  white-space: pre-line;
  vertical-align: bottom;
`;

const CarInfoElement = styled.tr`
  text-align: left;
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

const InputBox = styled.input`
  width: 100%;
  height: 3rem;
  border: 1px solid ${({ theme }) => theme.colors.disabled};
  border-radius: 5px;
  padding: 1em;
`;

const InputButton = styled(Button)`
  width: 100%;
  height: 3rem;
  border-radius: 100rem;
  margin-top: 5rem;
  font-weight: 600;
`;

const ButtonSet = styled.div`
  ${({ theme }) => theme.flex.flexBox('', '', 'space-between')}
  margin-top: 4rem;
`;

const NextButton = styled(Button)`
  width: 49%;
  height: 3rem;
  border-radius: 100rem;
  font-weight: 600;
`;

const PrevButton = styled(Button)`
  background-color: white;
  border: 1px solid ${({ theme }) => theme.colors.primaryBlue};
  color: ${({ theme }) => theme.colors.primaryBlue};
  width: 49%;
  height: 3rem;
  border-radius: 100rem;
  font-weight: 600;
`;

const ProcessBox = styled.section`
  ${({ theme }) => theme.flex.flexBox('column')}
  height: 5rem;
  padding: 1rem;
  background-color: ${({ theme }) => theme.colors.white};
  position: relative;
`;

const ProcessState = styled.div`
  ${({ theme }) => theme.flex.flexBox}
`;

const CurrentProcess = styled.button`
  ${({ theme }) => theme.flex.flexBox}
  border: 0;
  background: 0;
  padding: 0;
  font-size: medium;
  cursor: pointer;

  color: ${({ theme }) => theme.colors.gray};

  &:last-child {
    margin-right: 0;
  }

  ${({ active }) =>
    active &&
    css`
      color: ${({ theme }) => theme.colors.primaryBlue};
      font-weight: bold;
    `}
`;

const NextIcon = styled(MdOutlineNavigateNext)`
  font-size: medium;
  margin: 0 0.3rem;
  cursor: auto;
`;

const PercentageBar = styled(ProgressBar)`
  width: 100%;
  height: 5px;
  border-radius: 0;
  position: absolute;
  bottom: 0;
`;

const ContentBox = styled.section`
  width: 100%;
  height: ${({ currentEstimate }) =>
    currentEstimate === 1 ? '95%' : 'fit-content'};
  padding: 10%;
  background-color: white;
  position: absolute;
`;

const ContentTitle = styled.h2`
  font-size: x-large;
  font-weight: 600;
  line-height: 1.9rem;
  margin-bottom: 2.3rem;
  color: ${({ theme }) => theme.colors.blackC};
`;

const EstimateWrapper = styled.div`
  width: 100%;
  height: 80%;
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
  ${({ theme }) => theme.flex.flexBox}
  width: 100vw;
  height: 100vh;
  background-color: aliceblue;
`;

const PROCESS_STATE = [
  {
    id: 1,
    text: '소유자명',
  },
  {
    id: 2,
    text: '차량정보',
  },
  {
    id: 3,
    text: '예상시세',
  },
  {
    id: 4,
    text: '주행거리',
  },
  {
    id: 5,
    text: '추가옵션',
  },
  {
    id: 6,
    text: '추가입력',
  },
  {
    id: 7,
    text: '사진등록',
  },
];
