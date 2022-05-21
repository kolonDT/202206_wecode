//styles
import styled from "styled-components";

function Graph() {
  return (
    <GraphWrap>
      <GraphTitle>
        <p>예상 시세는</p>
        <p> 2,000 만 원 입니다.</p>
      </GraphTitle>
      <GraphBox>그래프 들어갈자리</GraphBox>
      <GraphButton>추가 정보 입력</GraphButton>
    </GraphWrap>
  );
}
const GraphWrap = styled.div`
  @media only screen and (max-width: 640px) {
    width: 90%;
    margin: 30px auto;
  }
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 640px;
  margin: 30px auto;
  padding: 10px;
`;

const GraphTitle = styled.div`
  p {
    font-size: 20px;
    font-weight: 500;
    margin-bottom: 5px;
  }
`;

const GraphBox = styled.div`
  margin: 30px 0px;
  padding: 100px;
  border: 1px solid gray;
`;

const GraphButton = styled.button`
  width: 180px;
  padding: 12px 15px;
  border-radius: 5px;
  border: 1px solid #adadad;
  cursor: pointer;
  font-size: 14px;
  font-weight: 600;
  color: white;
  background-color: #5c1049;
  box-shadow: 3px 3px 5px #d8d8d8;
`;
export default Graph;
