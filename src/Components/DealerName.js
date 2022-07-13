import React, { Children } from 'react';
import styled from 'styled-components/macro';

const DealerName = ({ handleSelectDealer, children, isFilter = 'true' }) => {
  return (
    <DealerContainer>
      <Dealer>
        <DealerTypo>담당자</DealerTypo>
      </Dealer>
      {isFilter ? (
        <DealerFilter onChange={handleSelectDealer}>{children}</DealerFilter>
      ) : (
        <DealerFilter> {children}</DealerFilter>
      )}
    </DealerContainer>
  );
};

const DealerContainer = styled.div`
  ${props => props.theme.flex.flexBox('row', 'center', '')};
  border: 1px solid #eaebec;
`;

const Dealer = styled.div`
  ${props => props.theme.flex.flexBox('row', 'center', '')};
  width: 120px;
  height: 30px;
  background-color: #dbdbdb;
`;

const DealerTypo = styled.span`
  padding-left: 5px;
  font-size: ${props => props.theme.fontSizes.small};
  font-weight: ${props => props.theme.fontWeights.bold};
`;

const DealerFilter = styled.select`
  ${props => props.theme.flex.flexbox}
  width: 300px;
  height: 30px;
  border: none;
  font-size: ${props => props.theme.fontSizes.small};
  font-weight: ${props => props.theme.fontWeights.bold};
`;

export default DealerName;
