import React, { useEffect } from 'react';
import styled from 'styled-components';
import { GrFormPrevious } from 'react-icons/gr';
import { useNavigate } from 'react-router-dom';
// import { setAlarm } from "../Pages/Api/Api";
import { useLocation } from 'react-router-dom';
import { MdNotifications, MdNotificationImportant } from 'react-icons/md';
import { isAlarmState, AlarmListState, AlarmModalState } from '../atoms';
import { useRecoilState, useSetRecoilState } from 'recoil';
import AlarmModal from './Modal/AlarmModal';

const Header = ({ isNew, setNew, page }) => {
  const [isAlarm, setIsAlarm] = useRecoilState(isAlarmState);
  const setAlarmList = useSetRecoilState(AlarmListState);
  const [alarmModal, setAlarmModal] = useRecoilState(AlarmModalState);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    fetch('http://localhost:3000/Data/Dino/alarmData.json')
      .then(res => res.json())
      .then(data => {
        setAlarmList(data);
        data.map(({ read }) => (read ? setIsAlarm(true) : setIsAlarm(false)));
      });
  }, []);

  const checkAlarm = () => {
    setAlarmModal(prev => !prev);
    setAlarmList(prevState => {
      const newState = prevState.map(list => ({ ...list, read: true }));
      return newState;
    });
    setIsAlarm(false);
    // TODO : 변경 된 state 서버에 POST 필요
  };

  const readAlarm = () => {
    setAlarmModal(prev => !prev);
  };

  const goToHome = () => {
    navigate('/');
  };

  return (
    <>
      <HeaderContainer page={page}>
        <HeaderWrapper page={page}>
          {page === 'default' && (
            <PreviousButton
              onClick={() => {
                if (location.pathname === '/requestform') {
                  navigate('/');
                  return;
                }
                navigate(-1);
              }}
              page={page}
            >
              <GrFormPrevious size="24" color="#383838" />
            </PreviousButton>
          )}
          {page === 'admin' && (
            <PreviousButton
              onClick={() => {
                navigate('/');
              }}
              page={page}
            >
              <GrFormPrevious size="24" color="#383838" />
            </PreviousButton>
          )}
          <HeaderTitle onClick={goToHome}>
            {page === 'admin' ? '관리 페이지' : '내 차 팔기'}
          </HeaderTitle>
          <HeaderMenu>
            {isAlarm ? (
              <TrueAlarmBtn onClick={checkAlarm} />
            ) : (
              <FalseAlarmBtn onClick={readAlarm} />
            )}
          </HeaderMenu>
        </HeaderWrapper>
      </HeaderContainer>
      {alarmModal && <AlarmModal />}
    </>
  );
};

const TrueAlarmBtn = styled(MdNotificationImportant)`
  font-size: x-large;
  color: ${({ theme }) => theme.colors.heartPink};
  transition: ease-in-out 100ms;

  &:hover {
    opacity: 0.5;
  }
`;

const FalseAlarmBtn = styled(MdNotifications)`
  font-size: x-large;
  color: ${({ theme }) => theme.colors.gray};
  transition: ease-in-out 100ms;

  &:hover {
    opacity: 0.5;
  }
`;

const HeaderContainer = styled.div`
  width: ${props => (props.page === 'admin' ? '1100px' : '640px')};
  margin: 0px auto;

  @media only screen and (max-width: 640px) {
    width: 90%;
  }
`;

const HeaderWrapper = styled.div`
  ${({ theme }) => theme.flex.flexBox}
  position: relative;
  padding: 20px 0;
`;

const PreviousButton = styled.div`
  visibility: ${props => (props.page === 'login' ? 'hidden' : 'visible')};
  position: absolute;
  left: 0;

  :hover {
    cursor: pointer;
  }
`;

const HeaderTitle = styled.h2`
  font-size: 20px;
  font-weight: 600;
  color: #383838;
  cursor: pointer;
`;

const HeaderMenu = styled.div`
  position: absolute;
  right: 0;
  :hover {
    cursor: pointer;
  }
`;
export default Header;
