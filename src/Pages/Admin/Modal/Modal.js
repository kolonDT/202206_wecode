import React, { useEffect } from 'react';
import styled from 'styled-components/macro';
import CustomerInfo from './CustomerInfo';
import CarInfo from './CarInfo';
import Estimate from './Estimate';
import {
  setInput,
  setModalList,
  setResponse,
  setSelectListDealer,
  setSelectListProgress,
  setSelectModalDealer,
  setSelectProgress,
} from '../adminAtoms';
import { useRecoilState, useRecoilValue } from 'recoil';
import ModalHeader from './ModalHeader';
import ModalMenu from './ModalMenu';

const Modal = ({ onClickToggleModal, id }) => {
  const getProgress = useRecoilValue(setSelectProgress);
  const getDealer = useRecoilValue(setSelectModalDealer);
  const inputEstimate = useRecoilValue(setInput);
  const responseData = useRecoilValue(setResponse);
  const [getModal, setGetModal] = useRecoilState(setModalList);
  const [setNewDealer, setGetNewDealer] = useRecoilState(setSelectListDealer);
  const [setNewProgress, setGetNewProgress] = useRecoilState(
    setSelectListProgress
  );

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
        console.log({ data });
        setGetModal(data.results);
      });
  };

  useEffect(() => {
    getModalData();
  }, []);
  console.log('sadsf', id);
  // backend에 보낼 함수임!
  const onSubmit = e => {
    // fetch(`http://10.133.5.8:8000/dealers/estimate${id}`, {
    //   method: 'POST',
    //   body: JSON.stringify({
    //     progress: getProgress,
    //     dealer: getDealer,
    //     estimate: inputEstimate,
    //   }),
    // }) //덩어리 제이슨을 받아옴
    //   .then(res => res.json()) //덩어리 제이슨을 객체 현태로 변환
    //   .then(data => {
    //     if (data.Access_token) localStorage.setItem('token', data.Access_token);
    //     // setGetNewDealer(getProgress);
    //     // setGetNewProgress(getDealer);
    //   }
    //   );
    setGetNewDealer(getDealer);
    setGetNewProgress(getProgress);
    alert('저장이 완료됐습니다');
    e.preventDefault();
  };

  const handleClick = () => {};
  console.log(getModal);
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
              <SaveButton onClick={onSubmit}>저장</SaveButton>
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
