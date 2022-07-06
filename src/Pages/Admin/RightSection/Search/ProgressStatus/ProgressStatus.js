import React from 'react';
import styled from 'styled-components/macro';
import { PROGRESS_STATUS } from './ProgressStatusData';

const ProgressStatus = () => {
  const handleChange = e => {
    // event handler
    console.log(e.target.value);
  };
  return (
    <ProgressContainer>
      <Progress>
        <ProgressTypo>진행상태</ProgressTypo>
      </Progress>
      <ProgressFilter onChange={handleChange}>
        {PROGRESS_STATUS.map(({ id, porgress }) => (
          <option key={id}>{porgress}</option>
        ))}
      </ProgressFilter>
    </ProgressContainer>
  );
};

const ProgressContainer = styled.div`
  ${props => props.theme.flex.flexBox('row', 'center', '')};
  margin-top: 15px;
  border: 1px solid #eaebec;
`;

const Progress = styled.div`
  ${props => props.theme.flex.flexBox('row', 'center', '')};
  width: 120px;
  height: 30px;
  background-color: #dbdbdb;
`;

const ProgressTypo = styled.span`
  padding-left: 5px;
  font-size: ${props => props.theme.fontSizes.small};
  font-weight: ${props => props.theme.fontWeights.bold};
`;

const ProgressFilter = styled.select`
  ${props => props.theme.flex.flexbox}
  width: 300px;
  height: 30px;
  border: none;
  font-size: ${props => props.theme.fontSizes.small};
  font-weight: ${props => props.theme.fontWeights.bold};
`;

export default ProgressStatus;
