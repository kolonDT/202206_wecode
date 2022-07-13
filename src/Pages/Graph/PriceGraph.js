import React, { useEffect } from 'react';
import 'zingchart/es6';
import ZingChart from 'zingchart-react';
import 'zingchart/modules-es6/zingchart-depth.min.js';
import styled from 'styled-components';
import { IP } from '../../Hooks/Fetch';
import { useRecoilState } from 'recoil';
import { priceGraphDataState } from '../../atoms';

const PriceGraph = () => {
  const [priceGraphData, setPriceGraphData] =
    useRecoilState(priceGraphDataState);

  useEffect(() => {
    fetch(`${IP}cars/price`, {
      headers: {
        Authorization: localStorage.getItem('access_token'),
      },
    })
      .then(res => res.json())
      .then(data => {
        setPriceGraphData(data.transaction);
      });
  }, []);

  const myData = {
    type: 'mixed',
    scaleX: {
      mirrored: true,
    },
    series: [
      {
        type: 'scatter',
        tooltip: { visible: false },
        marker: {
          'background-color': '#cee3ff',
          'border-color': 'none',
          'background-repeat': 'no-repeat',
          shadow: false,
          size: 35,
        },
        values: [[2007, 750]],
      },
      {
        type: 'scatter',
        tooltip: { visible: false },
        marker: {
          'background-color': '#e8f1fc',
          'border-color': 'none',
          'background-repeat': 'no-repeat',
          shadow: false,
          size: 8,
        },
        values: priceGraphData,
        // [
        //   [2002, 400],
        //   [2002, 300],
        //   [2003, 360],
        //   [2003, 350],
        //   [2003, 290],
        //   [2004, 580],
        //   [2005, 500],
        //   [2005, 520],
        //   [2005, 590],
        //   [2005, 510],
        //   [2005, 620],
        //   [2006, 700],
        //   [2006, 520],
        //   [2006, 570],
        //   [2007, 710],
        //   [2007, 700],
        //   [2007, 750],
        //   [2008, 900],
        //   [2008, 820],
        //   [2008, 850],
        //   [2008, 830],
        //   [2009, 880],
        //   [2009, 850],
        //   [2009, 820],
        //   [2009, 950],
        // ],
      },
      {
        type: 'line',
        tooltip: { visible: false },
        aspect: 'spline',
        marker: {
          visible: false,
        },
        'line-width': 1,
        'line-style': '',
        'line-color': '#afcff7',
        values: [
          [2001, 300],
          [2010, 950],
        ],
      },
    ],
  };

  return (
    <GraphWrapper>
      <ZingChart width="600px" height="300px" data={myData} />
    </GraphWrapper>
  );
};

export default PriceGraph;

const GraphWrapper = styled.div`
  ${({ theme }) => theme.flex.flexBox};
`;
