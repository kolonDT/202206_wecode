import React, { useEffect, useState } from "react";
// import { Routes, Route } from "react-router-dom";
// import LoginMain from "../Login/LoginMain";
import AddInfo from "./AddInfo";
import ContactInfo from "./ContactInfo";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import WarningModal from "../../Components/Modal/WarningModal";

const Sellcar = ({ setPage }) => {
  const [modal, setModal] = useState();

  // const [images, setImages] = useState({
  //   carImages: [],
  //   urlImages: [],
  // });

  //사진 관리하는 상태값
  const [carImages, setCarImages] = useState([]);
  //썸네일 사진 관리하는 상태값
  const [thumbnails, setThumbnails] = useState([]);

  const navigate = useNavigate();
  const gotoReconfirm = () => {
    let carNumber = localStorage.getItem("carNumber");
    if (
      localStorage.getItem(`${carNumber}_driving_distance`) &&
      localStorage.getItem(`${carNumber}_additional_info`) &&
      localStorage.getItem(`${carNumber}_address`) &&
      localStorage.getItem(`${carNumber}_detailAddress`) &&
      localStorage.getItem(`${carNumber}_contact`)
    ) {
      navigate("/reconfirm", {
        state: { carImages: carImages, thumbnails: thumbnails },
      });
    } else setModal(true);
  };

  useEffect(() => {
    setPage("default");
  }, []);

  return (
    <>
      {/* <Routes>
        <Route element={<LoginMain setPage={setPage} />} />
      </Routes> */}
      <AddInfo setCarImages={setCarImages} carImages={carImages} />
      <AddInfo
        setCarImages={setCarImages}
        carImages={carImages}
        setThumbnails={setThumbnails}
        thumbnails={thumbnails}
      />
      <ContactInfo carImages={carImages} />
      <Wrap>
        <Button onClick={gotoReconfirm}>견적 받기</Button>
        {modal ? <WarningModal setModal={setModal} /> : null}
      </Wrap>
    </>
  );
};
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
