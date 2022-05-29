import React, { useRef, useState } from "react";
import styled from "styled-components";
import { AiOutlineCheckCircle } from "react-icons/ai";
import { AiFillCheckCircle } from "react-icons/ai";
import { TiDeleteOutline } from "react-icons/ti";

const CarLine = () => {
  //   const [checkedArray, setCheckedArray] = useState([
  //     { step: 1, state: car.quote_requested !== null, },
  //     { step: 2, state: car.dealer_assigned !== null },
  //     { step: 3, state: car.dealer_consulting !== null },
  //     { step: 4, state: car.selling_requested !== null },
  //     { step: 5, state: car.selling_completed !== null },
  //   ]);

  const [checkedArray, setCheckedArray] = useState([
    { step: 1, state: false },
    { step: 2, state: false },
    { step: 3, state: false },
    { step: 4, state: false },
    { step: 5, state: false },
  ]);

  const clickCheckBox = (num, index) => {
    if (num !== 1 && checkedArray[index - 1].state === false) {
      alert("전 단계를 완료해주세요!");
      return;
    }
    setCheckedArray(
      checkedArray.map((checked) =>
        num === checked.step ? { ...checked, state: !checked.state } : checked
      )
    );

    // fetch(`/history?carNumber=${car.car_number}`, {
    //   method: "PATCH",
    //   headers: { "Content-type": "application/json" },
    //   body: JSON.stringify({
    //     progress: checkedArray[index].step,
    //   }),
    // })
    //   .then((res) => res.json())
    //   .then((res) => console.log(res));
  };

  const clickDelete = () => {
    const isDelete = window.confirm("차량 정보를 삭제하시겠습니까?");
    if (isDelete) {
      console.log("삭제되었습니다.");
    }
  };

  return (
    <>
      <OrderNum>
        <Text>1</Text>
      </OrderNum>
      <CarNumber>
        <Text>12가 1234</Text>
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
