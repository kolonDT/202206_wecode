// modules
import { useNavigate } from "react-router-dom";
//styles
import styled from "styled-components";

function Reconfirm() {
  const navigate = useNavigate();

  const handleRequest = () => {
    navigate("/complete");
  };

  let options = [
    "네비게이션",
    "선루프",
    "통풍시트",
    "디지털키",
    "옵션명",
    "옵션명",
  ];
  let option = "";
  for (let i = 0; i < JSON.parse(localStorage.getItem("options")).length; i++) {
    option = option.concat(",", options[i]);
  }
  option = option.substr(1);
  console.log(option);

  // const [list, setList] = useState([]);

  // useEffect(() => {
  //   fetch(``, {
  //     method: "POST",
  //   })
  //     .then((res) => res.json())
  //     .then((data) => {
  //       setList(data);
  //     });
  // }, []);

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
          <span>상세주소</span>
        </ReconfirmBoxTitle>
        <ReconfirmBoxInfo>
          <span>{localStorage.getItem("driving_distance")}</span>
          <span>{option}</span>
          <span>{localStorage.getItem("additional_info")}</span>
          <span>{localStorage.getItem("contact")}</span>
          <span>{localStorage.getItem("address")}</span>
          <span>{localStorage.getItem("detailAddress")}</span>
        </ReconfirmBoxInfo>
      </ReconfirmBox>
      <ReconfirmBtn onClick={handleRequest}>견적신청</ReconfirmBtn>
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
