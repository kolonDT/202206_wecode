import React from 'react';
import styled, { css } from 'styled-components/macro';
import DealerName from '../RightSection/Search/DealerName/DealerName';
import ProgressStatus from './ProgressStatus/ProgressStatus';

const Estimate = () => {
  return (
    <div>
      <EstimateContainer>
        <EstimateTitle>처리내용</EstimateTitle>
        <BranchContainer>
          <Branch>
            <BranchTypo>지점</BranchTypo>
          </Branch>
          <BranchName>
            <BranchTypo>삼성전시장 코오롱모터스</BranchTypo>
          </BranchName>
        </BranchContainer>
        <DealerName />
        <ProgressStatus />
        <InputEstimate
          type="textarea"
          cols="50"
          rows="10"
          placeholder="상담내용을 입력하세요"
        />
      </EstimateContainer>
      <SaveButton>저장</SaveButton>
    </div>
  );
};

const BoxAlign = css`
  ${props => props.theme.flex.flexBox('column', '', 'center')};
  height: 30px;
`;

const EstimateContainer = styled.div`
  width: 420px;
  height: auto;
  margin-left: 30px;
`;

const EstimateTitle = styled.span`
  font-size: ${props => props.theme.fontSizes.small};
  font-weight: ${props => props.theme.fontWeights.extraBold};
  margin-bottom: 30px;
`;

const BranchContainer = styled.div`
  ${props => props.theme.flex.flexBox('row', 'center', '')};
  border: 1px solid #eaebec;
  margin: 15px 0;
`;

const Branch = styled.div`
  ${BoxAlign}
  width: 120px;
  background-color: #dbdbdb;
`;

const BranchName = styled.div`
  ${BoxAlign}
  width: 300px;
  background-color: white;
`;

const BranchTypo = styled.span`
  padding-left: 5px;
  font-size: ${props => props.theme.fontSizes.small};
  font-weight: ${props => props.theme.fontWeights.bold};
`;

const InputEstimate = styled.textarea`
  margin-top: 15px;
  width: 420px;
  height: 300px;
  border: 1px solid #eaebec;
  padding: 15px 15px;
`;

const SaveButton = styled.button`
  margin-top: 30px;
  width: 83px;
  height: 31px;
  border: 1px solid #eaebec;
  background-color: #dbdbdb;
  &:hover {
    cursor: pointer;
    background-color: #a2a2a2;
  }
`;

export default Estimate;
