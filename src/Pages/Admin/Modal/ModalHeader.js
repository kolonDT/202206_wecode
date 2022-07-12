import React from 'react';
import styled from 'styled-components/macro';
import { BsXLg } from 'react-icons/bs';

const ModalHeader = ({ onClickToggleModal }) => {
  return (
    <>
      <TopBox>
        <BsXLg
          className="xIcon"
          onClick={e => {
            e.preventDefault();
            if (onClickToggleModal) {
              onClickToggleModal();
            }
          }}
        />
      </TopBox>
    </>
  );
};

const TopBox = styled.div`
  ${props => props.theme.flex.flexBox('', 'center', 'flex-end')};
  margin-bottom: 20px;
  padding: 10px 0;
  width: 1024px;
  height: 30px;
  background-color: #c4c4c4;

  .xIcon {
    margin-right: 20px;
    :hover {
      cursor: pointer;
    }
  }
`;

export default ModalHeader;
