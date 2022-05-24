import React, { useState } from "react";
import AddInfo from "./AddInfo";
import ContactInfo from "./ContactInfo";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import WarningModal from "../../Components/Modal/WarningModal";

const Sellcar = () => {
  const [modal, setModal] = useState();
  const navigate = useNavigate();
  const gotoReconfirm = () => {
    if (
      localStorage.getItem("driving_distance") &&
      localStorage.getItem("additional_info") &&
      localStorage.getItem("address") &&
      localStorage.getItem("detailAddress") &&
      localStorage.getItem("contact")
    ) {
      navigate("/reconfirm");
    } else setModal(true);
  };
  return (
    <>
      <AddInfo />
      <ContactInfo />
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
    width: 90%;
    margin: 0px auto;
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
