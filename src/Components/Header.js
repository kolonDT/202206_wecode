import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { GrFormPrevious } from "react-icons/gr";
import { GiHamburgerMenu } from "react-icons/gi";
import { BsCircleFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { BsBellSlash, BsBell, BsBellFill } from "react-icons/bs";
import { setAlarm } from "../Pages/Api/Api";

const Header = ({ isNew, setNew, page }) => {
  const navigate = useNavigate();
  const settingAlarm = () => {
    if (isNew === 1 || isNew === 0) {
      setAlarm(-1);
      setNew(-1);
    } else {
      setAlarm(0);
      setNew(0);
    }
  };

  function AlarmChange({ isNew }) {
    console.log("test", isNew);
    if (isNew === 1) {
      return (
        <div>
          <BsBell size="24" color="#383838" onClick={settingAlarm} />
          <Alarm>
            <BsCircleFill color="red" size="10" onClick={settingAlarm} />
          </Alarm>
        </div>
      );
    } else if (isNew === 0) {
      return <BsBell size="24" color="#383838" onClick={settingAlarm} />;
    } else {
      return <BsBellSlash size="24" color="#383838" onClick={settingAlarm} />;
    }
  }
  return (
    <HeaderContainer>
      <HeaderWrapper>
        <PreviousButton
          onClick={() => {
            navigate(-1);
          }}
          page={page}
        >
          <GrFormPrevious size="24" color="#383838" />
        </PreviousButton>
        <HeaderTitle>
          {page === "admin" ? "관리 페이지" : "내 차 팔기"}
        </HeaderTitle>
        <HeaderMenu>
          <AlarmChange isNew={isNew} />
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
const Alarm = styled.div`
  position: relative;
  top: -40px;
  right: -20px;
`;
const HeaderContainer = styled.div`
  width: 640px;
  margin: 0px auto;
  @media only screen and (max-width: 640px) {
    width: 95%;
    margin: 0px auto;
  }
`;

const HeaderWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  padding: 20px 20px;
`;

const PreviousButton = styled.div`
  visibility: ${(props) => (props.page === "login" ? "hidden" : "visible")};
  :hover {
    cursor: pointer;
  }
`;

const HeaderTitle = styled.h2`
  font-size: 20px;
  font-weight: 600;
  color: #383838;
`;

const HeaderMenu = styled.div`
  :hover {
    cursor: pointer;
  }
`;
export default Header;
