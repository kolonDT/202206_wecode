import React from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import styled from 'styled-components/macro';
import {
  setOptionBranch,
  setRequestSearchData,
  setResponse,
  setSelectModalDealer,
} from '../../../adminAtoms';

const DealerName = () => {
  const [getDealer, setGetDealer] = useRecoilState(setSelectModalDealer);
  const searchList = useRecoilValue(setRequestSearchData);
  const { branch } = useRecoilValue(setResponse);
  const selectBranch = useRecoilValue(setOptionBranch);

  // const newBranch = searchList.find(({ branch: ele }) => {
  //   return ele === branch;
  // });

  const newBranch = searchList.find(({ branch }) => {
    return selectBranch === branch;
  });

  // const newDealer = newBranch.dealer;

  const handleChange = e => {
    setGetDealer(e.target.value);
  };

  return (
    <DealerContainer>
      <Dealer>
        <DealerTypo>담당자</DealerTypo>
      </Dealer>
      {/* {searchList && (
        <DealerFilter onChange={handleChange}>
          {newDealer.map(idx => (
            <option key={idx}>{idx}</option>
          ))}
        </DealerFilter>
      )} */}
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
