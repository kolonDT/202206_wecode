import styled from "styled-components";
import { useEffect, useState } from "react";
import DaumPostcode from "react-daum-postcode";

function ContactInfo() {
  const [phone, setPhone] = useState("");
  const [addr, setAddr] = useState("");
  const [isFindAddr, setFindAddr] = useState(false);
  const [detailAddr, setDetailAddr] = useState("");

  let carNumber = localStorage.getItem("carNumber");
  const handleInput = ({target}) => {
    const text = target.value
    let regPhone = /^01([0|1|6|7|8|9])-?([0-9]{3,4})-?([0-9]{4})$/;
    if (regPhone.test(text) === true) {
      setPhone(text);
      localStorage.setItem(`${carNumber}_contact`, text);
    } else {
      if (phone) setPhone();
    }
  };
  const onChange = (e) => {
    setDetailAddr(e.target.value);
    localStorage.setItem(`${carNumber}_detailAddress`, e.target.value);
  };

  useEffect(() => {
    setDetailAddr(localStorage.getItem(`${carNumber}_detailAddress`));
    setPhone(localStorage.getItem(`${carNumber}_contact`));
  }, []);

  // useEffect(() => {
  //   console.log("1")
  //   if (
  //     localStorage.getItem(`${carNumber}_address`) === undefined ||
  //     localStorage.getItem(`${carNumber}_address`) === null ||
  //     localStorage.getItem(`${carNumber}_address`) === "undefined"
  //   ) {

  //     if (addr !== undefined)
  //      { localStorage.setItem(`${carNumber}_address`, addr);
  // }
  //   } else if (postcodeAddr !== "undefined" && postcodeAddr !== undefined) {
  //     localStorage.setItem(`${carNumber}_address`, postcodeAddr);
  //     setAddr(postcodeAddr);
  //   } else {
  //     if (
  //       localStorage.getItem(`${carNumber}_address`) !== undefined &&
  //       localStorage.getItem(`${carNumber}_address`) !== "undefined"
  //     ) {

  //       setAddr(localStorage.getItem(`${carNumber}_address`));
  //       setPostcodeAddr(localStorage.getItem(`${carNumber}_address`));
  //     }
  //   }
  // }, [postcodeAddr, addr]);

  useEffect(()=>{
    if (
         Boolean(localStorage.getItem(`${carNumber}_address`)&&localStorage.getItem(`${carNumber}_detailAddress`)) 
        ){
          setAddr(localStorage.getItem(`${carNumber}_address`));
        setDetailAddr(localStorage.getItem(`${carNumber}_detailAddress`));
        }
  },[])

  return (
    <Box>
      <P>딜러의 방문상담을 위해</P>
      <P>연락처와 지역을 확인해 주세요.</P>
      <Contact>
        <Text>연락처</Text>
        <Input
          active={phone ? true : false}
          placeholder="010-0000-0000"
          onChange={
            handleInput
          }
          value={phone}
        ></Input>
      </Contact>
      <Location>
        {/* <FindBtn
          onClick={() => {
            setModal(true);
            setShowMap(!showMap);
          }}
        >
          주소 찾기
        </FindBtn> */}
      </Location>
     
          <Address>
          <Contact>
            <Text>주소</Text>
            <FindBtn placeholder="주소" onClick={() => {
                  setFindAddr((prev)=>!prev);
                  setAddr("")
                  setDetailAddr("")
    localStorage.setItem(`${carNumber}_detailAddress`, "");
    localStorage.setItem(`${carNumber}_address`, "");


                }}>검색</FindBtn>
          </Contact>
      {isFindAddr && (<div>
         <Postcode carNumber={carNumber} setFindAddr={setFindAddr} setAddr={setAddr} />
         </div>
            ) }
           {Boolean(addr) &&
           (<div>
           <AddrText>{addr}</AddrText>
            <Text>상세주소</Text>
            <AddrInput onChange={onChange} value={detailAddr||""} />
            </div>)
            }
         
          
          </Address>
   
    </Box>
  );
}
const Postcode = ({ setAddr,setFindAddr,carNumber }) => {
  const handleComplete = (data) => {
    let fullAddress = data.address;
    let extraAddress = "";
    if (data.addressType === "R") {
      if (data.bname !== "") {
        extraAddress += data.bname;
      }
      if (data.buildingName !== "") {
        extraAddress +=
          extraAddress !== "" ? `, ${data.buildingName}` : data.buildingName;
      }
      fullAddress += extraAddress !== "" ? ` (${extraAddress})` : "";
    }
    setAddr(fullAddress);
    localStorage.setItem(`${carNumber}_address`, fullAddress);
    setFindAddr(false);
  };

  return <DaumPostcode onComplete={handleComplete} />;
};

const AddrText = styled.p`
font-weight: 100%;
  margin-right: 1.4em;
  letter-spacing: 0.7px;
  text-align: left;
  margin-right: 50px;
  margin-bottom: 20px;
`;
const Address = styled.div`
  align-items: center;
  margin-top: 20px;
`;
const AddrInput = styled.input`
  padding: 0px;
  font-size: 1.3em;
  height: 1.3em;
  width: 100%;
  margin-top: 20px;
  margin-bottom: 20px;
  border: 0px;
  border-top: 0px;
  border-left: 0px;
  border-right: 0px;
  border-bottom: 1px;
  border-bottom-style: solid;
  border-color: black;
  &:focus {
    outline: none;
    border-top: 0px;
    border-left: 0px;
    border-right: 0px;
    border-bottom: 1px;
    border-bottom-style: solid;
    border-color: red;
  }
`;
const FindBtn = styled.button`
   /* 
  font-weight: 600;
  text-align: center;
  margin-bottom: 20px; */
  border: 0px;
  font-size: 1em;
  padding: 5px 15px;
  border-radius: 5px;
  background-color: white;
  border: 1px solid #5c1049;;
  margin-left: 1em;
  letter-spacing: 0.7px;
  cursor: pointer;
 
`;

const Location = styled.div`
  display: flex;
  align-items: center;
  margin-top: 20px;
`;

const Input = styled.input`
  padding: 0px;
  margin: 0px;
  font-size: 1em;
  height: 1.3em;
  width: 110px;
  border: 0px;
  &:focus {
    outline: none;
    border-top: 0px;
    border-left: 0px;
    border-right: 0px;
    border-bottom: 2px;
    border-bottom-style: solid;
    border-color: ${(props) => (props.active === true ? "green" : "red")};
  }
`;
const Contact = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  margin: 1.4em 0;
`;
const Text = styled.p`
  margin-right: 1.4em;
  letter-spacing: 0.7px;
  text-align: left;
`;

const P = styled.p`
  font-size: 1.2em;
  font-weight: 800;
  letter-spacing: 1px;
  line-height: 25px;

  text-align: left;
`;

const Box = styled.div`
  border-top: 1px dotted #adadad;
  padding-top: 55px;
  width: 640px;
  box-sizing: border-box;
  margin: 0px auto;
  margin-top: 40px;
  text-align: center;
  @media only screen and (max-width: 640px) {
    width: 90%;
    padding: 0px;
    margin: 0px auto;
    margin-top: 40px;
    justfiy-content: center;
  }
`;
export default ContactInfo;
