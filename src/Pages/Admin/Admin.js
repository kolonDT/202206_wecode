import React, { useEffect, useState } from "react";
import styled from "styled-components";
import CarCard from "./CarCard";

const Admin = () => {
  const [cars, setCars] = useState([]);

  useEffect(() => {
    fetch(`/car/myCars`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setCars(data);
      });
    console.log("cars", cars);
  }, []);
  return (
    <CarContainer>
      <CarWrapper>
        {cars.map((car) => {
          return <CarCard key={car.id} car={car} />;
        })}
      </CarWrapper>
    </CarContainer>
  );
};

const CarContainer = styled.div`
  width: 640px;
  margin: 0px auto;
  margin-top: 30px;
  padding: 10px;
  box-sizing: border-box;
  @media only screen and (max-width: 640px) {
    width: 90%;
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
