import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { AiOutlineCheckCircle } from "react-icons/ai";
import { AiFillCheckCircle } from "react-icons/ai";
import { TiDeleteOutline } from "react-icons/ti";
import { setAlarmByCarNumber, getAlarmByCarNumber } from "../Api/Api";

const CarLine = ({ car, isNew, setNew }) => {
  const [checkedArray, setCheckedArray] = useState([
    { step: "quote_requested", state: car.quote_requested !== null },
    { step: "dealer_assigned", state: car.dealer_assigned !== null },
    { step: "dealer_consulting", state: car.dealer_consulting !== null },
    { step: "selling_requested", state: car.selling_requested !== null },
    { step: "selling_completed", state: car.selling_completed !== null },
  ]);

  const clickCheckBox = async (num, index) => {
    let ret = await getAlarmByCarNumber(setNew, car.car_number);

    if (num !== 1 && checkedArray[index - 1].state === false) {
      alert("전 단계를 완료해주세요!");
      return;
    }
    setCheckedArray(
      checkedArray.map((checked) =>
        num === checked.step ? { ...checked, state: !checked.state } : checked
      )
    );
    console.log("progress", checkedArray[index].step);
    fetch(`/history?carNumber=${car.car_number}`, {
      method: "PATCH",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({
        progress: checkedArray[index].step,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        if (ret !== -1) setAlarmByCarNumber(1, car.car_number);
      });
  };

  const clickDelete = () => {
    const isDelete = window.confirm("차량 정보를 삭제하시겠습니까?");
    if (isDelete) {
      console.log("삭제되었습니다.");
      //삭제 API 완료되면 연결
    }
  };

  return (
    <>
      <OrderNum>
        <Text>{car.id}</Text>
      </OrderNum>
      <CarNumber>
        <Text>{car.car_number}</Text>
        <DeleteButton>
          <TiDeleteOutline size="18" onClick={clickDelete} />
        </DeleteButton>
      </CarNumber>
      {checkedArray.map((checked, index) => (
        <CheckWrapper key={checked.step}>
          {!checked.state ? (
            <CheckBox value={index}>
              <AiOutlineCheckCircle
                size={24}
                color="gray"
                onClick={() => {
                  clickCheckBox(checked.step, index);
                }}
              />
            </CheckBox>
          ) : (
            <DoneBox>
              <AiFillCheckCircle size={24} color="green" />
            </DoneBox>
          )}
        </CheckWrapper>
      ))}
    </>
  );
};

const OrderNum = styled.td``;

const Text = styled.p`
  text-align: center;
  margin-right: 5px;
  :hover {
    cursor: pointer;
  }
`;

const DeleteButton = styled.div`
  visibility: hidden;
  color: gray;
  font-weight: 600;
  :hover {
    color: black;
  }
`;

const CarNumber = styled.td`
  display: flex;
  justify-content: center;
  align-items: center;
  :hover ${DeleteButton} {
    visibility: visible;
    cursor: pointer;
  }
`;

const CheckWrapper = styled.td``;

const CheckBox = styled.li`
  padding: 10px;
  text-align: center;
  list-style: none;
  :hover {
    cursor: pointer;
  }
`;
const DoneBox = styled.li`
  padding: 10px;
  text-align: center;
  list-style: none;
`;

export default CarLine;
