import React, { useState } from "react";
import styled from "styled-components";
import { GrFormNext } from "react-icons/gr";
import { GrFormPrevious } from "react-icons/gr";

const Pagination = ({ total, limit, page, setPage }) => {
  const numPages = Math.ceil(total / limit);
  return (
    <ButtonWrapper>
      <Button onClick={() => setPage(page - 1)} disabled={page === 1}>
        <GrFormPrevious />
      </Button>
      {Array(numPages)
        .fill()
        .map((_, i) => (
          <Button
            key={i + 1}
            onClick={() => setPage(i + 1)}
            aria-current={page === i + 1 ? "page" : null}
          >
            {i + 1}
          </Button>
        ))}
      <Button onClick={() => setPage(page + 1)} disabled={page === numPages}>
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
