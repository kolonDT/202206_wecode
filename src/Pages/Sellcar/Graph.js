//module
import { useState } from "react";
import Sellcar from "../Sellcar/Sellcar";
import { ResponsiveLine } from "@nivo/line";
//styles
import styled from "styled-components";

const data = [
  {
    id: "All",
    color: "hsl(89, 70%, 50%)",
    data: [
      {
        x: "0",
        y: 2000,
      },
      {
        x: "5만km",
        y: 1500,
      },
      {
        x: "10만km",
        y: 1000,
      },
      {
        x: "15만km",
        y: 500,
      },
      {
        x: "20만km",
        y: 0,
      },
    ],
  },
];

const MyResponsiveLine = ({ data }) => (
  <ResponsiveLine
    data={data}
    margin={{ top: 30, right: 60, bottom: 50, left: 60 }}
    xScale={{ type: "point" }}
    yScale={{
      type: "linear",
      min: "auto",
      max: "auto",
      stacked: true,
      reverse: false,
    }}
    yFormat=" >-.2f"
    axisTop={null}
    axisRight={null}
    axisBottom={{
      orient: "bottom",
      tickSize: 5,
      tickPadding: 5,
      tickRotation: 0,
    }}
    axisLeft={{
      orient: "left",
      tickSize: 5,
      tickPadding: 5,
      tickRotation: 0,
    }}
    pointSize={5}
    pointColor={{ theme: "background" }}
    pointBorderWidth={2}
    pointBorderColor={{ from: "serieColor" }}
    pointLabelYOffset={-12}
    useMesh={true}
    legends={[
      {
        anchor: "bottom-right",
        direction: "column",
        justify: false,
        translateX: 100,
        translateY: 0,
        itemsSpacing: 0,
        itemDirection: "left-to-right",
        itemWidth: 80,
        itemHeight: 20,
        itemOpacity: 0.75,
        symbolSize: 12,
        symbolShape: "circle",
        symbolBorderColor: "rgba(0, 0, 0, .5)",
        effects: [
          {
            on: "hover",
            style: {
              itemBackground: "rgba(0, 0, 0, .03)",
              itemOpacity: 1,
            },
          },
        ],
      },
    ]}
  />
);

function Graph() {
  const [add, setAdd] = useState(false);

  return (
    <GraphWrap>
      <GraphTitle>
        <p>예상 시세는</p>
        <span> 2,000 만 원 입니다.</span>
      </GraphTitle>
      <GraphArea>
        <GraphBox>
          <div style={{ width: 500, height: 350 }}>
            <MyResponsiveLine data={data} />
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
      </GraphArea>
    </GraphWrap>
  );
}
const GraphWrap = styled.div`
  @media only screen and (max-width: 640px) {
    width: 90%;
    margin: 30px auto;
  }
  width: 640px;
  margin: 30px auto;
`;

const GraphTitle = styled.div`
  font-size: 20px;
  font-weight: 500;
  margin-bottom: 5px;
`;
const GraphArea = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
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
