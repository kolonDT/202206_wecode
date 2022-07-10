import React from 'react';
import styled from 'styled-components';
import { CgCloseR } from 'react-icons/cg';
import { useSetRecoilState } from 'recoil';
import { isLoginModalState } from '../../atoms';

const LoginModal = () => {
  const setIsLoginModal = useSetRecoilState(isLoginModalState);

  const closeModal = () => {
    setIsLoginModal(false);
  };

  return (
    <Background>
      <BodyWrapper>
        <ModalWrapper>
          <ModalTitle>등록되어 있지 않은 회원입니다</ModalTitle>
          <ButtonWrapper>
            <CloseBtn onClick={closeModal} />
          </ButtonWrapper>
        </ModalWrapper>
      </BodyWrapper>
    </Background>
  );
};

export default LoginModal;

const ModalTitle = styled.h3`
  margin: 1rem 0;
  font-size: large;
  text-align: center;
  font-weight: 600;
`;

// const AlarmContent = styled.div``;

// const AlarmDate = styled.span`
//   font-size: x-small;
//   color: ${({ theme }) => theme.colors.gray};
// `;

const ButtonWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 2.5rem;
  right: 0;
`;

const CloseBtn = styled(CgCloseR)`
  position: absolute;
  margin: 1rem 0 0.5rem 0;
  font-size: large;
  right: 0;
  color: ${({ theme }) => theme.colors.primaryBlue};
  cursor: pointer;
  transition: ease-in-out 100ms;

  &:hover {
    opacity: 0.5;
  }
`;

// const AlarmList = styled.div`
//   width: 100%;
//   padding: 1rem 0;
//   border-bottom: 1px solid #eee;
// `;

const ModalWrapper = styled.div`
  /* position: relative; */
  /* top: 20%; */
  width: 80%;
  padding: 3% 5%;
  background-color: white;
  border: 1px solid #eee;
  border-radius: 0.5rem;
  box-shadow: 0px 0px 8px rgba(8, 94, 214, 0.1);
  z-index: 100;
`;

const BodyWrapper = styled.div`
  ${({ theme }) => theme.flex.flexBox}
  /* position: absolute; */
  width: 640px;
  height: 100%;
  z-index: 1;

  @media only screen and (max-width: 640px) {
    width: 90%;
    font-size: 90%;
  }
`;

const Background = styled.div`
  ${({ theme }) => theme.flex.flexBox}
  width: 100vw;
  z-index: 1;
`;
