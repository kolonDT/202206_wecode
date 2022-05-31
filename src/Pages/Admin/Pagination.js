import React, { useState } from "react";
import styled from "styled-components";
import { GrFormNext } from "react-icons/gr";
import { GrFormPrevious } from "react-icons/gr";

const Pagination = ({ total, limit, pageNum, setPageNum }) => {
  const numpageNums = Math.ceil(total / limit);
  return (
    <ButtonWrapper>
      <Button onClick={() => setPageNum(pageNum - 1)} disabled={pageNum === 1}>
        <GrFormPrevious />
      </Button>
      {Array(numpageNums)
        .fill()
        .map((_, i) => (
          <Button
            key={i + 1}
            onClick={() => setPageNum(i + 1)}
            aria-current={pageNum === i + 1 ? "pageNum" : null}
          >
            {i + 1}
          </Button>
        ))}
      <Button
        onClick={() => setPageNum(pageNum + 1)}
        disabled={pageNum === numpageNums}
      >
        <GrFormNext />
      </Button>
    </ButtonWrapper>
  );
};

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

const Button = styled.div`
  margin: 20px 10px;
  padding: 10px 15px;
  border-radius: 20px;
  text-align: center;
  :hover {
    cursor: pointer;
    background-color: rgba(92, 16, 73, 0.2);
  }
`;

export default Pagination;
