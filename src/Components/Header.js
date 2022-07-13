import React from 'react';
import styled from 'styled-components';
import { GrFormPrevious } from 'react-icons/gr';
// import { GiHamburgerMenu } from "react-icons/gi";
// import { BsCircleFill } from "react-icons/bs";
import { useNavigate } from 'react-router-dom';
// import { BsBellSlash, BsBell } from "react-icons/bs";
// import { setAlarm } from "../Pages/Api/Api";
import { useLocation } from 'react-router-dom';
import { MdNotifications, MdNotificationImportant } from 'react-icons/md';
import {
  LoginProcessState,
  isAlarmState,
  AlarmListState,
  AlarmModalState,
} from '../atoms';
import { useRecoilState, useSetRecoilState } from 'recoil';
import AlarmModal from './Modal/AlarmModal';
import { IP } from '../config';

const Header = ({ isNew, setNew, page }) => {
  const setLoginProcess = useSetRecoilState(LoginProcessState);
  const [isAlarm, setIsAlarm] = useRecoilState(isAlarmState);
  const setAlarmList = useSetRecoilState(AlarmListState);
  const [alarmModal, setAlarmModal] = useRecoilState(AlarmModalState);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    fetch(`${IP}notifications`, {
      headers: {
        Authorization: localStorage.getItem('access_token'),
      },
    })
      .then(res => res.json())
      .then(data => {
        setAlarmList(data.results) &&
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

  // function AlarmChange({ isNew }) {
  //   console.log("test", isNew);
  //   if (isNew === 1) {
  //     return (
  //       <div>
  //         <BsBell size="24" color="#383838" onClick={settingAlarm} />
  //         <Alarm>
  //           <BsCircleFill color="red" size="10" onClick={settingAlarm} />
  //         </Alarm>
  //       </div>
  //     );
  //   } else if (isNew === 0) {
  //     return <BsBell size="24" color="#383838" onClick={settingAlarm} />;
  //   } else {
  //     return <BsBellSlash size="24" color="#383838" onClick={settingAlarm} />;
  //   }
  // }
  return (
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
        <HeaderTitle>
          {page === 'admin' ? '관리 페이지' : '내 차 팔기'}
        </HeaderTitle>
        <HeaderMenu>
          {/* {page === "default" && <AlarmChange isNew={isNew} />} */}
          {/* <GiHamburgerMenu size="24" color="#383838" />
          {isNew === 1 ? (
            <Alarm>
              <BsCircleFill color="red" size="10" />
            </Alarm>
          ) : null} */}
        </HeaderMenu>
      </HeaderWrapper>
    </HeaderContainer>
  );
};

const HeaderContainer = styled.div`
  width: ${props => (props.page === 'admin' ? '1100px' : '640px')};
  margin: 0px auto;

  @media only screen and (max-width: 640px) {
    width: 90%;
  }
`;

const HeaderWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: ${props =>
    props.page === 'default' || props.page === 'admin'
      ? 'space-between'
      : 'center'};
  padding: 20px 20px;
`;

const PreviousButton = styled.div`
  visibility: ${props => (props.page === 'login' ? 'hidden' : 'visible')};
  :hover {
    cursor: pointer;
  }
`;

const HeaderTitle = styled.h2`
  font-size: medium;
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
