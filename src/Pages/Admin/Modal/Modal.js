import React from 'react';
import styled from 'styled-components/macro';
import { BsXLg } from 'react-icons/bs';
import CustomerInfo from './CustomerInfo';
import CarInfo from './CarInfo';
import Estimate from './Estimate';
import { MdOutlineArrowForwardIos } from 'react-icons/md';

const Modal = ({ onClickToggleModal }) => {
  return (
    <div>
      <ModalContainer>
        <ModalCard>
          <TopBox>
            <BsXLg
              className="xIcon"
              onClick={e => {
                e.preventDefault();
                if (onClickToggleModal) {
                  onClickToggleModal();
                }
              }}
            />
          </TopBox>
          <SectionAll>
            <AlignLeft>
              <SelectMenu>
                <TitleMenu>중고차 매입</TitleMenu>
                <MdOutlineArrowForwardIos />
                <TitleMenu>요청 내역</TitleMenu>
                <MdOutlineArrowForwardIos />
                <TitleMenu>요청 상세</TitleMenu>
              </SelectMenu>
              <RowAlign>
                <AlignLeft>
                  <CustomerInfo />
                  <CarInfo />
                </AlignLeft>
                <CenterAlign>
                  <Estimate />
                  <SaveButton>저장</SaveButton>
                </CenterAlign>
              </RowAlign>
            </AlignLeft>
          </SectionAll>
        </ModalCard>
        <Backdrop />
      </ModalContainer>
    </div>
  );
};

const ModalContainer = styled.div`
  ${props => props.theme.flex.flexBox('column', 'center', '')};
  top: 0;
  width: 100%;
  height: 100%;
  overflow-y: scroll;
`;

const ModalCard = styled.div`
  ${props => props.theme.flex.flexBox('column', 'center', '')};
  position: fixed;
  margin-top: 100px;
  padding-bottom: 50px;
  top: 0;
  left: 10;
  width: 1024px;
  height: auto;
  box-shadow: 0 0 30px rgba(30, 30, 30, 0.185);
  background-color: white;
  z-index: 10000;
  border: 1px solid #eaebec;
  overflow-y: scroll;
  &::-webkit-scrollbar {
    width: 8px;
    height: 8px;
    border-radius: 6px;
    background: rgba(255, 255, 255, 0.4);
  }
  &::-webkit-scrollbar-thumb {
    background: rgba(0, 0, 0, 0.3);
    border-radius: 6px;
  }
`;

const TopBox = styled.div`
  ${props => props.theme.flex.flexBox('', 'center', 'flex-end')};
  margin-bottom: 20px;
  width: 1024px;
  height: 30px;
  background-color: #c4c4c4;

  .xIcon {
    margin-right: 20px;
    :hover {
      cursor: pointer;
    }
  }
`;

const SelectMenu = styled.div`
  ${props => props.theme.flex.flexBox('row', 'cneter', 'flex-start')};
  margin-bottom: 30px;
`;

const TitleMenu = styled.span`
  font-size: ${props => props.theme.fontSizes.xl};
  font-weight: ${props => props.theme.fontWeights.extraBold};
`;

const SectionAll = styled.div`
  ${props => props.theme.flex.flexBox('row', '', 'space-around')};
  width: 900px;
  height: auto;
`;

const AlignLeft = styled.div`
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
  width: 100vw;
  height: 100vh;
  z-index: 9999;
  background-color: rgba(0, 0, 0, 0.2);
`;

export default Modal;
