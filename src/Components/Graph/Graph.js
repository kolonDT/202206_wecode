//module
import { useState } from "react";
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
function Graph() {
  const [add, setAdd] = useState(false);
  const data = [
    { index: 1000, gray: 650 },
    { index: 2600, gray: 730 },
    { index: 5000, gray: 500 },
    { index: 7600, gray: 430 },
    { index: 8000, gray: 260 },
    // Calculation of line of best fit is not included in this demo
    { index: 1000, tomato: 700 },
    { index: 3000, tomato: 620 },
    { index: 5500, tomato: 350 },
    { index: 7000, tomato: 268 },
    { index: 8900, tomato: 128 },
  ];
  return (
    <GraphWrap>
      <GraphTitle>예상 시세는 2,000 만 원 입니다.</GraphTitle>
      <GraphBox>
        <ResponsiveContainer minWidth={750} minHeight={500}>
          <ComposedChart
            width={500}
            height={400}
            data={data}
            margin={{
              top: 20,
              right: 80,
              bottom: 20,
              left: 20,
            }}
          >
            <CartesianGrid stroke="#F5F5F5" />
            <Tooltip />
            <Legend />
            <XAxis
              dataKey="index"
              unit="km"
              type="number"
              // label={{
              //   value: "주행거리",
              //   position: "insideBottomRight",
              //   offset: 0,
              // }}
            />
            <YAxis
              unit="만원"
              type="number"
              // label={{ angle: -90, position: "insideLeft" }}
            />
            {/* <Scatter name="red" dataKey="red" fill="red" /> */}
            <Scatter name="gray" dataKey="gray" fill="gray" />
            <Line
              dataKey="tomato"
              stroke="tomato"
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
      <>{add === true ? <Sellcar active={add} /> : null}</>
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
  width: 640px;
  margin: 30px auto;
`;
const GraphTitle = styled.h1`
  margin-top: 25px;
  font-size: 1.2em;
  font-weight: 800;
  letter-spacing: 1px;
  line-height: 25px;
`;
const GraphBox = styled.div`
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
