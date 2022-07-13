import React from 'react';
import styled from 'styled-components';
// import { CgCloseR } from 'react-icons/cg';
import { VscBell, VscBellDot } from 'react-icons/vsc';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { EstimateCarInfo } from '../../atoms';
import {
  AdminAlarmListState,
  AdminAlarmModalState,
} from '../../Pages/Admin/adminAtoms';

const AdminAlarmModal = () => {
  const adminAlarmList = useRecoilValue(AdminAlarmListState);
  const setAlarmModal = useSetRecoilState(AdminAlarmModalState);
  const estimateCarInfoGet = useRecoilValue(EstimateCarInfo);

  return (
    <Background>
      <BodyWrapper>
        <ModalWrapper>
          <ModalTitle>
            {estimateCarInfoGet.car_number}
            <span>견적 진행 사항</span>
          </ModalTitle>
          {adminAlarmList === undefined
            ? '..Loading'
            : adminAlarmList.map(({ content, id, create_at }) => (
                <AlarmList key={id}>
                  <AlarmContent>{content}</AlarmContent>
                  <AlarmDate>{create_at}</AlarmDate>
                </AlarmList>
              ))}
          <ButtonWrapper>
            <CloseBtn onClick={() => setAlarmModal(prev => !prev)} />
          </ButtonWrapper>
        </ModalWrapper>
      </BodyWrapper>
    </Background>
  );
};

export default AdminAlarmModal;

const ModalTitle = styled.h3`
  margin: 1rem 0;
  font-size: large;
  font-weight: 600;

  span {
    margin-left: 0.5rem;
    color: ${({ theme }) => theme.colors.gray};
  }
`;

const AlarmContent = styled.div``;

const AlarmDate = styled.span`
  font-size: x-small;
  color: ${({ theme }) => theme.colors.gray};
`;

const ButtonWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 2.5rem;
  right: 0;
`;

const CloseBtn = styled(VscBell)`
  position: absolute;
  margin: 1rem 0 0.5rem 0;
  font-size: large;
  right: 0;
  color: ${({ theme }) => theme.colors.primaryBlue};
  cursor: pointer;
  transition: ease-in-out 100ms;

  &:hover {
    opacity: 0.5;
  }
`;

const AlarmList = styled.div`
  width: 100%;
  padding: 1rem 0;
  border-bottom: 1px solid #eee;
`;

const Background = styled.div`
  ${({ theme }) => theme.flex.flexBox}
  width: 100vw;
  z-index: 1;
`;

const BodyWrapper = styled.div`
  position: absolute;
  width: 640px;
  z-index: 1;

  @media only screen and (max-width: 640px) {
    width: 90%;
    font-size: 90%;
  }
`;

const ModalWrapper = styled.div`
  position: absolute;
  top: 5%;
  right: 0;
  width: fit-content;
  padding: 3% 5%;
  background-color: white;
  border: 1px solid #eee;
  border-radius: 0.5rem;
  box-shadow: 0px 0px 8px rgba(8, 94, 214, 0.1);
  z-index: 100;
`;
