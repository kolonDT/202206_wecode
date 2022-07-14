import React from 'react';
import styled from 'styled-components/macro';
import { MdOutlineArrowForwardIos } from 'react-icons/md';

const ModalMenu = () => {
  return (
    <SelectMenu>
      <TitleMenu>중고차 매입</TitleMenu>
      <MdOutlineArrowForwardIos />
      <TitleMenu>요청 내역</TitleMenu>
      <MdOutlineArrowForwardIos />
      <TitleMenu>요청 상세</TitleMenu>
    </SelectMenu>
  );
};

const SelectMenu = styled.div`
  ${props => props.theme.flex.flexBox('row', 'cneter', 'flex-start')};
  margin-bottom: 30px;
`;

const TitleMenu = styled.span`
  font-size: ${props => props.theme.fontSizes.xl};
  font-weight: ${props => props.theme.fontWeights.extraBold};
`;

export default ModalMenu;
