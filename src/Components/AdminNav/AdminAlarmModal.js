import React from 'react';
import styled from 'styled-components/macro';
import AdminAlarmList from './AdminAlarmList';
import AdminAlramModalHeader from './AdminAlarmModalHeader';

const AdminAlarmModal = ({ onClickToggleModal }) => {
  return (
    <AdminAlarm>
      <AlarmModalCard>
        <AdminAlramModalHeader onClickToggleModal={onClickToggleModal} />
        <AdminAlarmList />
      </AlarmModalCard>
    </AdminAlarm>
  );
};

const AdminAlarm = styled.div`
  ${props => props.theme.flex.flexBox('column', 'center', '')};
  top: 0;
`;

const AlarmModalCard = styled.div`
  ${props => props.theme.flex.flexBox('column', 'center', '')};
  position: fixed;
  margin-top: 120px;
  margin-right: 500px;
  padding-bottom: 50px;
  top: 0;
  width: 500px;
  height: 500px;
  box-shadow: 0 0 30px rgba(30, 30, 30, 0.185);
  background-color: white;
  z-index: 10000;
  border: 1px solid #eaebec;
  overflow-x: hidden;
  overflow-y: auto;
`;

export default AdminAlarmModal;
