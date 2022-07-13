import React, { useEffect } from 'react';
import styled from 'styled-components/macro';
import CustomerInfo from './CustomerInfo';
import CarInfo from './CarInfo';
import Estimate from './Estimate/Estimate';
import {
  setInput,
  setModalList,
  setResponse,
  saveModalDealerState,
  setSelectListProgress,
  selectModalDealerState,
  setSelectProgress,
} from '../adminAtoms';
import { useRecoilState, useRecoilValue } from 'recoil';
import ModalHeader from './ModalHeader';
import ModalMenu from './ModalMenu';

const Modal = ({ onClickToggleModal, id }) => {
  const getProgress = useRecoilValue(setSelectProgress);
  const getDealer = useRecoilValue(selectModalDealerState);
  const responseData = useRecoilValue(setResponse);
  const [inputEstimate, setInputEstimate] = useRecoilState(setInput);
  const [getModal, setGetModal] = useRecoilState(setModalList);
  const [newDealer, setNewDealer] = useRecoilState(saveModalDealerState);
  const [setNewProgress, setGetNewProgress] = useRecoilState(
    setSelectListProgress
  );

  const { name } = useRecoilValue(setResponse);
  const consulting = getModal?.consulting || [''];
  const currentModalDealer = consulting[0].dealer || '';

  const sales_process = getModal?.sales_process || [''];
  const process = sales_process[0].process_state || '';
  // const getModalData = () => {
  //   setGetModalID(id);
  //   fetch('Data/Sunshine/ModalData.json', {
  //     method: 'GET',
  //   })
  //     .then(res => res.json())
  //     .then(res => {
  //       setGetModal(res.results);
  //     });
  // };

  // useEffect(() => {
  //   getModalData();
  // }, []);

  // 서버 열렸을때 가져올거임
  const getModalData = () => {
    fetch(`http://10.133.5.8:8000/dealers/estimate/${id}`, {
      method: 'GET',
      headers: { Authorization: responseData.access_token },
    })
      .then(res => res.json())
      .then(data => {
        setGetModal(data.results);
        setInputEstimate(data.results.consulting[0].content);
      });
  };

  useEffect(() => {
    getModalData();
  }, []);
  // backend에 보낼 함수임!
  const handlePostDealer = e => {
    fetch(`http://10.133.5.8:8000/dealers/consulting`, {
      method: 'POST',
      headers: { Authorization: responseData.access_token },
      body: JSON.stringify({
        dealer_name: getDealer,
        estimate_id: id,
      }),
    }) //덩어리 제이슨을 받아옴
      .then(res => res.json()) //덩어리 제이슨을 객체 현태로 변환
      .then(data => {
        setNewDealer(getDealer === '선택' ? '' : getDealer);
        alert('저장이 완료됐습니다');
        e.preventDefault();
      });

    setGetNewProgress(getProgress);
    alert('저장이 완료됐습니다');
  };

  const handleSave = e => {
    // 로그인 정보랑 딜러랑 비교 if 같지 않으면 alert return;
    if (name !== currentModalDealer) {
      alert('담당딜러가 아닙니다.');
    } else {
      fetch(`http://10.133.5.8:8000/dealers/consulting`, {
        method: 'PATCH',
        headers: { Authorization: responseData.access_token },
        body: JSON.stringify({
          estimate_id: id,
          status: getProgress,
          content: inputEstimate, //안써도 됨
        }),
      }) //덩어리 제이슨을 받아옴
        .then(res => res.json()) //덩어리 제이슨을 객체 현태로 변환
        .then(data => {
          console.log(data);
          setGetNewProgress(getProgress);
          alert('저장이 완료됐습니다');
          e.preventDefault();
        });
    }
  };

  return (
    <ModalContainer>
      <ModalCard>
        <ModalHeader onClickToggleModal={onClickToggleModal} />
        <AlignLeft>
          <ModalMenu />
          <RowAlign>
            <AlignLeft>
              <CustomerInfo />
              <CarInfo />
            </AlignLeft>
            <CenterAlign>
              {getModal.length !== 0 && <Estimate />}
              <SaveButton
                onClick={process === '대기' ? handlePostDealer : handleSave}
              >
                저장
              </SaveButton>
            </CenterAlign>
          </RowAlign>
        </AlignLeft>
      </ModalCard>
      <Backdrop />
    </ModalContainer>
  );
};

const ModalContainer = styled.div`
  ${props => props.theme.flex.flexBox('column', 'center', '')};
  top: 0;
`;

const ModalCard = styled.div`
  ${props => props.theme.flex.flexBox('column', 'center', '')};
  position: fixed;
  margin-top: 100px;
  padding-bottom: 50px;
  top: 0;
  left: 10;
  width: 1024px;
  height: 700px;
  box-shadow: 0 0 30px rgba(30, 30, 30, 0.185);
  background-color: white;
  z-index: 10000;
  border: 1px solid #eaebec;
  overflow-x: hidden;
  overflow-y: auto;
`;

const AlignLeft = styled.div`
  width: 900px;
  ${props => props.theme.flex.flexBox('column', '', '')};
`;

const RowAlign = styled.div`
  ${props => props.theme.flex.flexBox('row', '', '')};
`;

const CenterAlign = styled.div`
  ${props => props.theme.flex.flexBox('column', 'center', '')};
`;

const SaveButton = styled.button`
  margin-top: 30px;
  width: 83px;
  height: 31px;
  border: 1px solid #eaebec;
  background-color: #dbdbdb;
  &:hover {
    cursor: pointer;
    background-color: #a2a2a2;
  }
`;

const Backdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 9999;
  background-color: rgba(0, 0, 0, 0.2);
`;

export default Modal;
