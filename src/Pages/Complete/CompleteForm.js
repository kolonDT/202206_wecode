import styled from "styled-components";
import { useNavigate } from "react-router-dom";

function CompleteForm() {
  const navigate = useNavigate();
  const gotoRequest = () => {
    navigate("/requestform");
  };
  return (
    <Box>
      <H1>견적 요청이 접수됬습니다.</H1>
      <Wrap>
        <P>딜러 방문 전에 계약을 위한</P>
        <P>필요서류를 준비해 주세요</P>
      </Wrap>
      <Wrap>
        <P>Push 알림 설정을 켜주시면</P>
        <P>진행상황이 업데이트 될 때</P>
        <P> 알림을 받을 수 있습니다.</P>
      </Wrap>
      <OptionField>
        <Button onClick={gotoRequest}>요청내역 보기</Button>
        <Button>Push 알림 설정</Button>
      </OptionField>
    </Box>
  );
}

const Box = styled.div`
  width: 640px;
  border-radius: 20px;
  margin: 0px auto;
  margin-top: 40px;
  text-align: center;
  padding: 10px;
  @media only screen and (max-width: 640px) {
    width: 90%;
    margin: 0px auto;
    justfiy-content: center;
  }
`;

const H1 = styled.h1`
  wdith: 100%;
  font-weight: 600;
  font-size: 2.5em;
  margin-top: 50px;
`;

const P = styled.p`
  wdith: 100%;
  font-weight: 300;
  font-size: 1.6em;
  margin: 10px;
`;
const Wrap = styled.div`
  wdith: 100%;
  margin-top: 70px;
`;

const OptionField = styled.div`
  display: flex;
  justify-content: space-around;
`;

const Button = styled.button`
  width: 30%;
  background-color: #5c1049;
  color: white;
  border: 0px;
  box-shadow: 5px 5px 10px #d8d8d8;
  border-radius: 20px;
  text-align: center;
  padding: 15px;
  margin: 5px;
  margin-top: 40px;
  font-size: 1em;
  cursor: pointer;
  &:hover {
    background-color: #ffffff;
    color: black;
  }
`;
export default CompleteForm;
