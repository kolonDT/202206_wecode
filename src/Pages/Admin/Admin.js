<<<<<<< HEAD
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { MYCARS_API, PORT } from '../../config';
import CarLine from './CarLine';
import Pagination from './Pagination';

const Admin = ({ isNew, setNew, setPage }) => {
  const [cars, setCars] = useState([]);

  //한 페이지 당 보여줄 차 목록의 개수
  const limit = 10;
  //현재 페이지 번호
  const [pageNum, setPageNum] = useState(1);
  //현재 페이지의 첫 게시물 위치
  const offset = (pageNum - 1) * limit;

  useEffect(() => {
    fetch(`${MYCARS_API}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(res => res.json())
      .then(data => {
        setCars(data.myCarsInfo);
      });
    setPage('admin');
  }, []);
=======
import React from 'react';
import styled from 'styled-components/macro';
import AdminNav from '../../Components/AdminNav/AdminNav';
import AdminMenu from './Menu/AdminMenu';
import RightSection from './RightSection/RightSection';
>>>>>>> f22a604256353517be0ec840e7cd0ef6a6b9d6e9

const Admin = () => {
  return (
<<<<<<< HEAD
    <CarContainer>
      <CarWrapper>
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
          {cars.length !== 0 &&
            cars.slice(offset, offset + limit).map(car => {
              return (
                <TableRow key={car.id}>
                  <CarLine
                    car={car}
                    isNew={isNew}
                    setNew={setNew}
                    carId={car.id}
                    setCars={setCars}
                    cars={cars}
                    PORT={PORT}
                  />
                </TableRow>
              );
            })}
        </CarTable>
      </CarWrapper>
      <Pagination
        total={cars.length}
        limit={limit}
        pageNum={pageNum}
        setPageNum={setPageNum}
      />
    </CarContainer>
=======
    <div>
      <AdminNav />
      <SectionAlign>
        <AdminMenu />
        <RightSection />
      </SectionAlign>
    </div>
>>>>>>> f22a604256353517be0ec840e7cd0ef6a6b9d6e9
  );
};

const SectionAlign = styled.div`
  ${props => props.theme.flex.flexBox('row', '', '')};
`;

export default Admin;
