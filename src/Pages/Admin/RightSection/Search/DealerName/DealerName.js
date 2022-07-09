import React from 'react';
import { useRecoilState } from 'recoil';
import styled from 'styled-components/macro';
import { setSelectDealer } from '../../../adminAtoms';
import { DEALER_NAME } from './DealerData';

const DealerName = () => {
  const [getDealer, setGetDealer] = useRecoilState(setSelectDealer);
  const handleChange = e => {
    // event handler
    setGetDealer(e.target.value);
  };

  return (
    <DealerContainer>
      <Dealer>
        <DealerTypo>담당자</DealerTypo>
      </Dealer>
      <DealerFilter onChange={handleChange}>
        {DEALER_NAME.map(({ id, dealer }) => (
          <option key={id}>{dealer}</option>
        ))}
      </DealerFilter>
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
