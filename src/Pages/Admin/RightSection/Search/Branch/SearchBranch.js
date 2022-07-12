import React from 'react';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components/macro';
import { setRequestSearchData, setResponse } from '../../../adminAtoms';
import { BRANCH_LIST } from './SearchData';

const SearchBranch = () => {
  const searchList = useRecoilValue(setRequestSearchData);
  const handleChange = e => {
    // event handler
  };

  const { branch } = useRecoilValue(setResponse);
  const newArr = searchList.map(({ branch }) => {
    return branch;
  });
  // console.log(`브랜치임 ${newArr}`);

  return (
    <BranchContainer>
      <Branch>
        <BranchTypo>지점</BranchTypo>
      </Branch>
      <BranchFilter onChange={handleChange}>
        {newArr.map(ele => (
          <option>{ele}</option>
        ))}
      </BranchFilter>
    </BranchContainer>
  );
};

const BranchContainer = styled.div`
  ${props => props.theme.flex.flexBox('row', 'center', '')};
  border: 1px solid #eaebec;
`;

const Branch = styled.div`
  ${props => props.theme.flex.flexBox('row', 'center', '')};
  width: 120px;
  height: 30px;
  background-color: #dbdbdb;
`;

const BranchTypo = styled.span`
  padding-left: 5px;
  font-size: ${props => props.theme.fontSizes.small};
  font-weight: ${props => props.theme.fontWeights.bold};
`;

const BranchFilter = styled.select`
  ${props => props.theme.flex.flexbox}
  width: 300px;
  height: 30px;
  border: none;
  font-size: ${props => props.theme.fontSizes.small};
  font-weight: ${props => props.theme.fontWeights.bold};
`;
export default SearchBranch;
