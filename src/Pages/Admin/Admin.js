import React, { useEffect, useState } from "react";
import styled from "styled-components";
// import CarCard from "./CarCard";
import CarLine from "./CarLine";

const Admin = ({ isNew, setNew, setPage }) => {
  const [cars, setCars] = useState([]);

  // useEffect(() => {
  //   fetch("/car/myCars", {
  //     method: "GET",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //   })
  //     .then((res) => res.json())
  //     .then((data) => {
  //       setCars(data.myCarsInfo);
  //     });
  //   setPage("admin");
  // }, []);

  return (
    <CarContainer>
      <CarWrapper>
        {/* {cars.length !== 0 &&
          cars.map((car) => {
            return (
              <CarCard key={car.id} car={car} isNew={isNew} setNew={setNew} />
            );
          })} */}
        {/* <CarCard key={1} isNew={isNew} setNew={setNew} /> */}
        <CarTable>
          <TableRow>
            <TableHead>순서</TableHead>
            <TableHead>차량 번호</TableHead>
            <TableHead>견적 요청 접수</TableHead>
            <TableHead>담당 딜러 배정</TableHead>
            <TableHead>딜러 방문 상담</TableHead>
            <TableHead>판매 요청</TableHead>
            <TableHead>판매 완료</TableHead>
          </TableRow>
          {/* 여기서 맵 시작 */}
          <TableRow>
            <CarLine />
          </TableRow>
          <TableRow>
            <CarLine />
          </TableRow>
          <TableRow>
            <CarLine />
          </TableRow>
          <TableRow>
            <CarLine />
          </TableRow>
          <TableRow>
            <CarLine />
          </TableRow>
          {/* 여기서 맵 끝 */}
        </CarTable>
        <PaginationWrapper>
          <Pagination></Pagination>
        </PaginationWrapper>
      </CarWrapper>
    </CarContainer>
  );
};

const PaginationWrapper = styled.div``;

const Pagination = styled.div``;

const CarTable = styled.table`
  margin: 0 auto;
  width: 80%;
  border-radius: 0 0 25px 25px;
  tr:first-child {
    background-color: #5c1049;
    color: white;
    font-weight: 600;
  }
  tr:nth-child(even) {
    background-color: #f2f2f2;
  }
`;

const TableRow = styled.tr`
  width: 100%;
`;

const TableHead = styled.th`
  width: 13%;
  padding: 15px;
  font-size: 15px;
`;

const CarContainer = styled.div`
  width: 100%;
  margin: 0px auto;
  margin-top: 30px;
  padding: 10px;
  box-sizing: border-box;
  @media only screen and (max-width: 640px) {
    width: 580px;
    padding: 0px;
    margin: 20px auto;
    padding-left: 0;
  }
`;
const CarWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
`;

export default Admin;
