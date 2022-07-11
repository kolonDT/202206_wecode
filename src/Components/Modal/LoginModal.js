import React from 'react';
import styled from 'styled-components';
import { CgCloseR } from 'react-icons/cg';
import { useSetRecoilState } from 'recoil';
import { isLoginModalState } from '../../atoms';
import { RiKakaoTalkFill } from 'react-icons/ri';
import { KAKAO_AUTH_URL } from '../../Pages/Login/Kakao/KakaoLoginData';

const LoginModal = () => {
  const setIsLoginModal = useSetRecoilState(isLoginModalState);

  const closeModal = () => {
    setIsLoginModal(false);
  };

  return (
    <Background>
      <BodyWrapper>
        <ModalWrapper>
          <ModalTitle>
            <ModalSubTitle>등록되어 있지 않은 회원입니다</ModalSubTitle>
            카카오톡으로 회원 등록하고
            <br /> 간편하게 시세조회 해보세요!
          </ModalTitle>
          <LoginButton href={KAKAO_AUTH_URL}>
            <RiKakaoTalkFill />
            <span>카카오톡으로 로그인</span>
          </LoginButton>
          <ButtonWrapper>
            <CloseBtn onClick={closeModal} />
          </ButtonWrapper>
        </ModalWrapper>
      </BodyWrapper>
    </Background>
  );
};

export default LoginModal;

const LoginButton = styled.a`
  ${({ theme }) => theme.flex.flexBox}
  width: 100%;
  height: 3rem;
  border-radius: 0.5rem;
  background-color: #fee500;
  color: #000000 85%;
  cursor: pointer;
  font-weight: 500;
  margin: 4rem 0 1.2rem 0;
  font-size: medium;

  span {
    margin-left: 0.5rem;
  }

  &:hover {
    color: rgba(0, 0, 0, 0.5);
    transition: all ease-in-out 150ms;
  }
`;

const ModalTitle = styled.h3`
  margin: 1rem 0;
  font-size: large;
  line-height: 1.6rem;
  color: ${({ theme }) => theme.colors.gray};
`;

const ModalSubTitle = styled.div`
  font-size: x-large;
  font-weight: 600;
  margin-bottom: 2rem;
  color: black;
`;

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

const ModalWrapper = styled.div`
  position: absolute;
  top: 20%;
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
