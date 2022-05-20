// modules

//styles
import styled from "styled-components";

function Reconfirm() {
  return (
    <ReconfirmWrap>
      <ReconfirmTitle>입력하신 추가 정보를 확인해주세요.</ReconfirmTitle>
      <ReconfirmBox>
        <ReconfirmBoxTitle>
          <span>주행거리</span>
          <span>옵션</span>
          <span>추가정보</span>
          <span>연락처</span>
          <span>지역</span>
        </ReconfirmBoxTitle>
        <ReconfirmBoxInfo>
          <span>1,500km</span>
          <span>네비게이션</span>
          <span>좌측 사이드미러 교체 필요</span>
          <span>010-1234-5678</span>
          <span>서울시 강남구</span>
        </ReconfirmBoxInfo>
      </ReconfirmBox>
      <ReconfirmBtn>견적신청</ReconfirmBtn>
    </ReconfirmWrap>
  );
}
const ReconfirmWrap = styled.div`
  @media only screen and (max-width: 640px) {
    width: 90%;
    padding: 0px;
    margin: 30px auto;
    padding-left: 0;
  }
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 640px;
  margin: 30px auto;
  padding: 10px;
  box-sizing: border-box;
`;

const ReconfirmTitle = styled.span`
  margin-bottom: 25px;
  font-size: 20px;
  font-weight: 500;
`;

const ReconfirmBox = styled.div`
  padding: 30px 40px;
  margin-bottom: 30px;
  border: 1px solid rgba(0, 0, 0, 0.3);
  border-radius: 10px;
`;

const ReconfirmBoxTitle = styled.div`
  float: left;
  display: flex;
  flex-direction: column;
  span {
    margin-bottom: 20px;
    font-weight: 500;
    color: gray;
  }
`;

const ReconfirmBoxInfo = styled.div`
  display: flex;
  flex-direction: column;
  padding-left: 80px;
  span {
    margin-bottom: 20px;
  }
`;

const ReconfirmBtn = styled.button`
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

export default Reconfirm;
