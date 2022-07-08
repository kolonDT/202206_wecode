import React, { useEffect } from 'react';
import styled from 'styled-components/macro';
import CustomerInfo from './CustomerInfo';
import CarInfo from './CarInfo';
import Estimate from './Estimate';
import { selectIdState, setModalList } from '../adminAtoms';
import { useRecoilState, useRecoilValue } from 'recoil';
import ModalHeader from './ModalHeader';
import ModalMenu from './ModalMenu';

const Modal = ({ onClickToggleModal }) => {
  const [getModal, setGetModal] = useRecoilState(setModalList);

  const getModalData = () => {
    fetch('Data/Sunshine/ModalData.json', {
      method: 'GET',
    })
      .then(res => res.json())
      .then(data => {
        setGetModal(data.results);
      });
  };

  useEffect(() => {
    getModalData();
  }, []);

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
              <Estimate />
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
