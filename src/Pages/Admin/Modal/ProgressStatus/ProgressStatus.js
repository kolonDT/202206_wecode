import React from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import styled from 'styled-components/macro';
import {
  setModalList,
  setRequestListData,
  setSelectProgress,
} from '../../adminAtoms';
import { PROGRESS_STATUS } from './ProgressStatusData';

const ProgressStatus = () => {
  const [getProgress, setGetProgress] = useRecoilState(setSelectProgress);
  const handleChange = e => {
    setGetProgress(e.target.value);
  };
  const { sales_process } = useRecoilValue(setModalList);
  const process = sales_process[0].process_state;
  const processId = PROGRESS_STATUS.find(ele => ele.progress === process).id;
  const processState = PROGRESS_STATUS.filter(ele => processId <= ele.id);

  return (
    <ProgressContainer>
      <Progress>
        <ProgressTypo>진행상태</ProgressTypo>
      </Progress>
      <ProgressFilter
        onChange={e => {
          handleChange(e);
        }}
      >
        {processState.map(({ id, progress }) => (
          <option key={id}>{progress}</option>
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
