//module
import { useState, useEffect } from "react";
import Sellcar from "../../Pages/Sellcar/Sellcar";
import React from "react";
//styles
import styled from "styled-components";
import {
  ComposedChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Scatter,
  ResponsiveContainer,
} from "recharts";
import { GRAPH_API } from "../../config";

function Graph({ setPage }) {
  const [add, setAdd] = useState(false);
  const [graph, setGraph] = useState(true);
  const [price, setPrice] = useState("");
  
  const graphCarDB = (carNumber) => {
    // Graph 통신
    // fetch(`${GRAPH_API}?carNumber=${carNumber}`, {
    //   method: "GET",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    // })
    //   .then((res) => res.json())
    //   .then((data) => {
    //     const price = data["priceByDistance"];
    //     price.map((data) => {
    //       if (data.price_used !== undefined) {
    //         data.price_used = data.price_used / 10000;
    //       }
    //       if (data.tomato !== undefined) {
    //         data.tomato = data.tomato / 10000;
    //       }
    //     });
    //     setGraph(price);
    //     setPrice(price[0].price_used);
    //   });

    // MockDB : start
    fetch('http://localhost:3000/Data/Dino/graphData.json', {
      method: 'GET',
    })                      
      .then((res) => res.json())
      .then((data) => {
        console.log(data)
        const price = data;
        // price.map((data) => {
        //   if (data.price_used !== undefined) {
        //     data.price_used = data.price_used / 10000;
        //   }
        //   if (data.tomato !== undefined) {
        //     data.tomato = data.tomato / 10000;
        //   }
        // });
        setGraph(price);
        setPrice(price[0].price_used);
        console.log(price)
        console.log(price[0])
      });
      // MockDB : end
  };

  useEffect(() => {
    graphCarDB(localStorage.getItem("carNumber"));
  }, []);

  const screenWidth=window.screen.width

  return (
    <GraphWrap>
      <GraphTitle>
        내 차의 예상 시세는 <br/>
        {price} ∼ {price} 만 원 입니다.
      </GraphTitle>
      <GraphBox>
        <ResponsiveContainer minWidth={screenWidth<600?375:500} minHeight={screenWidth<600?375:500}>
          <ComposedChart
            width={500}
            height={400}
            data={graph}
            margin={{
              top: 20,
              right: 80,
              bottom: 20,
              left: 20,
            }}
            setPage={setPage}
          >
            <CartesianGrid stroke="#F5F5F5" strokeDasharray="5 5" />
            <Tooltip />
            <Legend />
            {/* TODO : x 축 km → 연식 */}
            <XAxis dataKey="index" unit="연식" type="number" />
            <YAxis dataKey="price_used" unit="만원" type="number" />
            <Scatter name="내 차" dataKey="myCar" fill="#5c1049" />
            <Line
              type="monotone"
              dataKey="tomato"
              stroke="#5c1049"
              dot={false}
              activeDot={false}
              legendType="none"
            />
          </ComposedChart>
        </ResponsiveContainer>
      </GraphBox>
      <GraphButton
        onClick={() => {
          setAdd(!add);
        }}
        style={{ display: add === false ? "block" : "none" }}
      >
        <>추가 정보 입력</>
      </GraphButton>
      <>{add === true ? <Sellcar active={add} setPage={setPage} /> : null}</>
    </GraphWrap>
  );
}
const GraphWrap = styled.div`
  border-top: 1px dotted #adadad;
  display: flex;
  flex-direction: column;
  align-items: center;
  @media only screen and (max-width: 640px) {
    width: 90%;
    margin: 30px auto;
  }
  width: 40rem;
  margin: 30px auto;
`;
const GraphTitle = styled.h1`
  margin: 55px 0px 10px 0px;
  font-size: 1.2em;
  font-weight: 800;
  letter-spacing: 1px;
  line-height: 25px;
`;
const GraphBox = styled.div`
font-size: small;
  margin: 10px 0px 30px 0px;
`;

const GraphButton = styled.button`
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
export default Graph;
