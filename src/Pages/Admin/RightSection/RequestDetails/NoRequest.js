import React from 'react';
import styled from 'styled-components/macro';

const NoRequest = () => {
  return <NoData>❌ 요청 받은 데이터가 없습니다 ❌</NoData>;
};

const NoData = styled.p`
  margin: auto;
  margin-top: 30vh;
  margin-left: 300px;
  text-align: center;
  font-size: ${props => props.theme.fontSizes.titleSize};
  font-weight: ${props => props.theme.fontWeights.bold};
`;

export default NoRequest;
