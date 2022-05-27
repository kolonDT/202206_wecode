//module
import { useState } from "react";
import Sellcar from "../Sellcar/Sellcar";
// import { ResponsiveLine } from "@nivo/line";
import { ResponsiveSwarmPlot } from "@nivo/swarmplot";
//styles
import styled from "styled-components";

const data = [
  {
    id: "0.0",
    group: "group A",
    price: 375,
    volume: 18,
  },
  {
    id: "0.1",
    group: "group A",
    price: 135,
    volume: 20,
  },
  {
    id: "0.2",
    group: "group A",
    price: 351,
    volume: 7,
  },
  {
    id: "0.3",
    group: "group A",
    price: 446,
    volume: 10,
  },
  {
    id: "0.4",
    group: "group A",
    price: 205,
    volume: 13,
  },
  {
    id: "0.5",
    group: "group A",
    price: 228,
    volume: 9,
  },
  {
    id: "0.6",
    group: "group A",
    price: 97,
    volume: 7,
  },
  {
    id: "0.7",
    group: "group A",
    price: 376,
    volume: 9,
  },
  {
    id: "0.8",
    group: "group A",
    price: 331,
    volume: 16,
  },
  {
    id: "0.9",
    group: "group A",
    price: 308,
    volume: 12,
  },
];

const MyResponsiveSwarmPlot = ({ data /* see data tab */ }) => (
  <ResponsiveSwarmPlot
    data={data}
    groups={["group A", "group B", "group C"]}
    identity="id"
    value="price"
    valueFormat="$.2f"
    valueScale={{ type: "linear", min: 0, max: 500, reverse: false }}
    size={{
      key: "volume",
      values: [4, 20],
      sizes: [6, 20],
    }}
    forceStrength={4}
    simulationIterations={100}
    borderColor={{
      from: "color",
      modifiers: [
        ["darker", 0.6],
        ["opacity", 0.5],
      ],
    }}
    margin={{ top: 80, right: 100, bottom: 80, left: 100 }}
    axisTop={{
      orient: "top",
      tickSize: 10,
      tickPadding: 5,
      tickRotation: 0,
      legend: "group if vertical, price if horizontal",
      legendPosition: "middle",
      legendOffset: -46,
    }}
    axisRight={{
      orient: "right",
      tickSize: 10,
      tickPadding: 5,
      tickRotation: 0,
      legend: "price if vertical, group if horizontal",
      legendPosition: "middle",
      legendOffset: 76,
    }}
    axisBottom={{
      orient: "bottom",
      tickSize: 10,
      tickPadding: 5,
      tickRotation: 0,
      legend: "group if vertical, price if horizontal",
      legendPosition: "middle",
      legendOffset: 46,
    }}
    axisLeft={{
      orient: "left",
      tickSize: 10,
      tickPadding: 5,
      tickRotation: 0,
      legend: "price if vertical, group if horizontal",
      legendPosition: "middle",
      legendOffset: -76,
    }}
  />
);

function Graph() {
  const [add, setAdd] = useState(false);

  return (
    <GraphWrap>
      <GraphTitle>예상 시세는 2,000 만 원 입니다.</GraphTitle>
      <GraphBox>
        <div style={{ width: 480, height: 350 }}>
          <ResponsiveSwarmPlot data={data} />
        </div>
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
