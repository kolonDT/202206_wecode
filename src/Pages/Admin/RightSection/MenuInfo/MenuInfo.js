import React from 'react';
import styled, { css } from 'styled-components/macro';
import { MdOutlineArrowForwardIos } from 'react-icons/md';

const MenuInfo = () => {
  return (
    <div>
      <MenuInfoContainer>
        <TitleMenu>중고차 매입</TitleMenu>
        <MdOutlineArrowForwardIos />
        <SubMenu>요청 내역</SubMenu>
      </MenuInfoContainer>
    </div>
  );
};

const MenuInfoTypo = css`
  font-size: ${props => props.theme.fontSizes.xl};
  font-weight: ${props => props.theme.fontWeights.extraBold};
`;

const MenuInfoContainer = styled.div`
  width: 358px;
  height: 41px;
`;

const TitleMenu = styled.span`
  ${MenuInfoTypo}
`;

const SubMenu = styled.span`
  ${MenuInfoTypo}
`;

export default MenuInfo;
