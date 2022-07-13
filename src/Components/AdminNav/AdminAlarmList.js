import React from 'react';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';
import { AdminAlarmModalState } from '../../Pages/Admin/adminAtoms';

const AdminAlarmList = () => {
  const alarmModal = useRecoilValue(AdminAlarmModalState);

  return (
    <AlarmListContainer>
      <AlarmTitle>요청받은 견적서 목록</AlarmTitle>
      {alarmModal?.map(({ car_number }) => {
        return (
          <TypoRowAlign>
            <AlarmListTypo>새로운 견적 요청이 들어왔습니다.</AlarmListTypo>
            <AlarmCarListTypo>{car_number}</AlarmCarListTypo>
            <AlarmListTypo>🚙</AlarmListTypo>
          </TypoRowAlign>
        );
      })}
    </AlarmListContainer>
  );
};

const AlarmListContainer = styled.div`
  ${props => props.theme.flex.flexBox('column', 'center', '')};
`;
const AlarmTitle = styled.p`
  font-size: ${props => props.theme.fontSizes.xxl};
  font-weight: ${props => props.theme.fontWeights.bold};
  margin-bottom: 30px;
`;

const TypoContainerAlign = styled.div`
  ${props => props.theme.flex.flexBox('column', 'center', 'center')};
  margin: 0;
`;

const TypoRowAlign = styled.div`
  ${props => props.theme.flex.flexBox('row', '', 'center')};
  margin-bottom: 30px;
  padding: 0;
  width: 430px;
  height: 50px;
  background-color: #efefef;
  border-radius: 10px;
  padding: 15px 0;
`;

const AlarmListTypo = styled.p`
  font-size: ${props => props.theme.fontSizes.base};
  font-weight: ${props => props.theme.fontWeights.base};
  padding-bottom: 10px;
`;

const AlarmCarListTypo = styled.p`
  font-size: ${props => props.theme.fontSizes.lg};
  font-weight: ${props => props.theme.fontWeights.bold};
  color: #00a4f5;
  margin: 0 10px;
`;

export default AdminAlarmList;
