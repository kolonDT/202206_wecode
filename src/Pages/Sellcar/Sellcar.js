import React, { useEffect, useState } from "react";
// import { Routes, Route } from "react-router-dom";
// import LoginMain from "../Login/LoginMain";
import AddInfo from "./AddInfo";
import ContactInfo from "./ContactInfo";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import WarningModal from "../../Components/Modal/WarningModal";

const Sellcar = ({ setPage }) => {
  const [modal, setModal] = useState("");

  //사진 관리하는 상태값
  const [carImages, setCarImages] = useState([]);
  //썸네일 사진 관리하는 상태값
  const [thumbnails, setThumbnails] = useState([]);

  const navigate = useNavigate();
  const gotoReconfirm = () => {
    const carNumber = localStorage.getItem("carNumber");
    const driving_distance =localStorage.getItem(`${carNumber}_driving_distance`) 
    const additional_info = localStorage.getItem(`${carNumber}_additional_info`) 
    const address =  localStorage.getItem(`${carNumber}_address`) 
    const detailAddress =  localStorage.getItem(`${carNumber}_detailAddress`) 
    const contact = localStorage.getItem(`${carNumber}_contact`)
    

    if (
      !carNumber
    ) {
      setModal('차량번호')
      return
    }
    if (
      !driving_distance
    ) {
      setModal('주행거리')
      return
    }
    if (
      !additional_info
    ) {
      setModal('추가정보')
      return
    }
    if (
      !address
    ) {
      setModal('주소')
      return
    }
    if (
      !detailAddress
    ) {
      setModal('상세주소')
      return
    }
    if (
      !contact
    ) {
      setModal('전화번호')
      return
    }

    if(thumbnails.length!==4){
      setModal('사진을 모두 등록해주세요.')
      return
    }

      navigate("/reconfirm", {
        state: { carImages: carImages, thumbnails: thumbnails },
      });
  };

  useEffect(() => {
    setPage("default");
  }, []);

  return (
    <>
      {/* <Routes>
        <Route element={<LoginMain setPage={setPage} />} />
      </Routes> */}
      {/* <MainWrap>{modal ? <WarningModal setModal={setModal} /> : null}</MainWrap> */}
      <AddInfo
        setCarImages={setCarImages}
        carImages={carImages}
        setThumbnails={setThumbnails}
        thumbnails={thumbnails}
      />
      <ContactInfo carImages={carImages} />
      <Wrap>
        <Button onClick={gotoReconfirm}>견적 받기</Button>
        {Boolean(modal) ? <WarningModal modalText={modal} setModal={setModal} /> : null}
      </Wrap>
    </>
  );
};

// const MainWrap = styled.div`
//   margin: 0px auto;
//   width: 640px;
//   text-align: center;
//   @media only screen and (max-width: 640px) {
//     margin: 0px auto;
//     width: 90%;
//   }
// `;
const Wrap = styled.div`
  margin: 0px auto;
  width: 640px;
  text-align: center;
  @media only screen and (max-width: 640px) {
    margin: 0px auto;
    width: 90%;
  }
`;
const Button = styled.button`
margin-top: 20px;
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

export default Sellcar;
