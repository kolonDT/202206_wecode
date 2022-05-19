import React from "react";
import styled from "styled-components";
import { GrFormPrevious } from "react-icons/gr";
import { GiHamburgerMenu } from "react-icons/gi";

const Header = () => {
  return (
    <HeaderContainer>
      <HeaderWrapper>
        <PreviousButton>
          <GrFormPrevious size="24" color="#383838" />
        </PreviousButton>
        <HeaderTitle>내 차 팔기</HeaderTitle>
        <HeaderMenu>
          <GiHamburgerMenu size="24" color="#383838" />
        </HeaderMenu>
      </HeaderWrapper>
    </HeaderContainer>
  );
};

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
