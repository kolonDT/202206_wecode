import React, { useEffect } from 'react';
import styled, { css } from 'styled-components/macro';
import { useNavigate } from 'react-router-dom';
import { VscBell, VscBellDot } from 'react-icons/vsc';
import { useRecoilState, useRecoilValue } from 'recoil';
import {
  AdminAlarmModalState,
  selectOpenAlarmState,
  setResponse,
} from '../../Pages/Admin/adminAtoms';
import DealerName from './DealerName';
import AdminAlarmModal from './AdminAlarmModal';
import { IP } from '../../config';

const AdminNav = () => {
  const navigate = useNavigate();

  const Logout = () => {
    navigate(`/dealers/login`);
  };
  const [isOpenAlarmModal, setOpenAlarmModal] =
    useRecoilState(selectOpenAlarmState); // 알람 모달창 열고 닫고
  const [alarmModal, setAlarmModal] = useRecoilState(AdminAlarmModalState); // 데이터를 받아옴
  const responseData = useRecoilValue(setResponse); // 로그인 정보를 받아옴

  const getAlarmModalData = () => {
    fetch('http://10.133.5.8:8000/notifications/admin', {
      method: 'GET',
      headers: { Authorization: responseData.access_token },
    })
      .then(res => res.json())
      .then(data => {
        setAlarmModal(data.results);
      });
  };

  const onClickToggleModal = () => {
    setOpenAlarmModal(!isOpenAlarmModal);
  };

  useEffect(() => {
    getAlarmModalData();
  }, []);

  return (
    <NavBox>
      <NavTypo>코오롱 프리미엄 멤버십 Admin Page</NavTypo>
      <DealerInfo>
        <DealerName />
        <CenterLine>|</CenterLine>
        <DealerLogout onClick={Logout}>로그아웃</DealerLogout>
        {/* // 알람 모달 창
        {alarmModal ? (
          <VscBellDot className="bell" onClick={onClickToggleModal} />
        ) : (
          <VscBell className="bell" onClick={onClickToggleModal} />
        )}
        {isOpenAlarmModal && (
          <AdminAlarmModal onClickToggleModal={onClickToggleModal} />
        )} */}

        <VscBell className="bell" />
      </DealerInfo>
    </NavBox>
  );
};

const rightTypo = css`
  font-size: ${props => props.theme.fontSizes.base};
  font-weight: ${props => props.theme.fontWeights.bold};
`;

const NavBox = styled.div`
  ${props => props.theme.flex.flexBox('row', 'center', 'space-between')};
  width: 100vw;
  height: 3.75rem;
  padding: 0 ${props => props.theme.paddings.xxxl};
  background-color: #c4c4c4;
`;

const NavTypo = styled.span`
  font-size: ${props => props.theme.fontSizes.xxl};
  font-weight: ${props => props.theme.fontWeights.extraBold};
`;

const DealerInfo = styled.div`
  ${props => props.theme.flex.flexBox('row', 'center', 'space-between')};
  width: 9.938rem;
  height: 1.375rem;

  .bell {
    font-size: 20px;
    &:hover {
      cursor: pointer;
    }
  }
`;

const CenterLine = styled.span`
  ${rightTypo}
`;

const DealerLogout = styled.span`
  ${rightTypo}
  cursor: pointer;
`;

export default AdminNav;
