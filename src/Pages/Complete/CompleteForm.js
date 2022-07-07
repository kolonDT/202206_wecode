import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getAlarm } from '../Api/Api';
import { PrevButton, ContentBox, ContentTitle } from '../Estimate/Style';

function CompleteForm({ isNew, setNew, setPage }) {
  const navigate = useNavigate();
  const goToMyState = () => {
    navigate('/estimate');
  };
  const [toastStatus, setToastStatus] = useState(false);
  // const [alarmStatus, setAlarmStatus] = useState(false);

  // const handleToast = () => {
  //   setToastStatus(true);
  //   setAlarmStatus(!alarmStatus);
  //   if (alarmStatus) {
  //     setAlarm(1);
  //     setNew(1);
  //   } else {
  //     setAlarm(-1);
  //     setNew(-1);
  //   }
  // };

  useEffect(() => {
    getAlarm(setNew);
  }, []);

  // useEffect(() => {
  //   if (isNew === 1 || isNew === 0) {
  //     setAlarmStatus(false);
  //   } else {
  //     setAlarmStatus(true);
  //   }
  // }, [isNew]);

  // useEffect(() => {
  //   setPage('default');
  // }, []);

  useEffect(() => {
    if (toastStatus) {
      setTimeout(() => setToastStatus(false), 1000);
    }
  }, [toastStatus]);

  return (
    <Background>
      <BodyWrapper>
        <EstimateWrapper>
          <ContentBox>
            <ContentTitle>견적 요청이 접수되었습니다!</ContentTitle>
            <SubTitle>
              <p>
                담당 SC 배정 후 방문 상담과 <br /> 판매 절차가 진행 됩니다.
              </p>
              <p>
                진행 상황이 업데이트 될 때 <br /> 알려드릴게요!
              </p>
            </SubTitle>
            <GoToConfirmBtn onClick={goToMyState} variant="primary">
              내 견적 확인하러 가기
            </GoToConfirmBtn>
          </ContentBox>
        </EstimateWrapper>
      </BodyWrapper>
    </Background>

    // <Box>
    //   <H1>견적 요청이 접수되었습니다.</H1>
    //   <Wrap>
    //     <P>딜러 방문 전에 계약을 위한</P>
    //     <P>필요서류를 준비해 주세요.</P>
    //   </Wrap>
    //   {alarmStatus ? (
    //     <Wrap>
    //       <P>Push 알림 설정을 켜주시면</P>
    //       <P>진행상황이 업데이트 될 때</P>
    //       <P> 알림을 받을 수 있습니다.</P>
    //     </Wrap>
    //   ) : (
    //     <Wrap>
    //       <P>진행상황 업데이트 알림을</P>
    //       <P>받고싶지 않으시다면</P>
    //       <P>푸시알림 설정을 해제해 주세요</P>
    //     </Wrap>
    //   )}
    //   <OptionField>
    //     <Button onClick={gotoRequest}>요청내역 보기</Button>
    //     {!alarmStatus ? (
    //       <Button onClick={handleToast}>Push 알림 해제</Button>
    //     ) : (
    //       <Button onClick={handleToast}>Push 알림 설정</Button>
    //     )}
    //   </OptionField>
    //   {toastStatus && (
    //     <>
    //       {!alarmStatus ? (
    //         <Toast>알람 설정 되었습니다 </Toast>
    //       ) : (
    //         <Toast>알람 해제 되었습니다 </Toast>
    //       )}
    //     </>
    //   )}
    // </Box>
  );
}

const SubTitle = styled.h4`
  font-size: 21px;
  line-height: 1.8rem;

  p {
    color: ${({ theme }) => theme.colors.darkGray};
    margin-bottom: 1.5rem;
  }
`;

const GoToConfirmBtn = styled(PrevButton)`
  margin-top: 4rem;
  width: 100%;
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

const EstimateWrapper = styled.section`
  width: 100%;
  height: fit-content;
  position: absolute;
  top: 5vh;
  box-shadow: 0px 0px 8px rgba(8, 94, 214, 0.05);
`;

export default CompleteForm;
