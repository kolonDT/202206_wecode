import React from 'react';
import styled from 'styled-components/macro';

const DealerName = () => {
  return (
    <div>
      <DealerInfo></DealerInfo>
    </div>
  );
};

export default DealerName;

const DealerInfo = styled.span`
  font-size: ${props => props.theme.fontSizes.base};
  font-weight: ${props => props.theme.fontWeights.bold};
`;
