import React from "react";
import styled from "styled-components";

function WarningModal({ setModal }) {
  return (
    <Overlay>
      <Content>
        <P>입력이 완료되지 않았습니다</P>
        <Button
          onClick={() => {
            setModal(false);
          }}
        >
          확인
        </Button>
        <Button
          onClick={() => {
            setModal(false);
          }}
        >
          취소
        </Button>
      </Content>
    </Overlay>
  );
}
const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 20;
`;
const Content = styled.div`
  z-index: 30;
  width: 300px;
  padding: 1em;
  background: #fff;
  text-align: center;
`;
const P = styled.p`
  margin-top: 25px;
`;
const Button = styled.button`
  margin: 0px auto;
  margin-top: 20px;
  margin-left: 10px;
  margin-right: 10px;
  width: 40%;
  background-color: #5c1049;
  border: 0px;
  padding: 15px;
  color: white;
  font-weight: bold;
  font-size: 0.9em;
  border-radius: 5%;
`;

export default WarningModal;
