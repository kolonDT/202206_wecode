import React from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import styled, { css } from 'styled-components/macro';
import {
  setInput,
  setModalList,
  saveModalDealerState,
  selectModalDealerState,
} from '../../adminAtoms';
import DealerSelect from './DealerSelect';
import ProgressStatus from '../ProgressStatus/ProgressStatus';

const Estimate = () => {
  const setInputEatimate = useSetRecoilState(setInput);
  const handleInputEstimate = e => {
    e.preventDefault();
    setInputEatimate(e.target.value);
  };

  const getModal = useRecoilValue(setModalList);

  const setNewDealer = useSetRecoilState(selectModalDealerState);

  const handleSelectDealer = ({ target: { value } }) => {
    setNewDealer(value);
  };

  return (
    <EstimateContainer>
      <EstimateBox>
        <EstimateTitle>처리내용</EstimateTitle>
        <BranchContainer>
          <BranchTypo>지점</BranchTypo>
          <BranchDetailsTypo>{getModal.branch}</BranchDetailsTypo>
        </BranchContainer>
        <DealerSelect
          branch={getModal.branch}
          handleSelectDealer={handleSelectDealer}
        />
        <ProgressStatus />
        <InputEstimate
          type="textarea"
          cols="50"
          rows="10"
          placeholder="상담내용을 입력하세요"
          onChange={() => handleInputEstimate}
        />
      </EstimateBox>
    </EstimateContainer>
  );
};

const BoxAlign = css`
  ${props => props.theme.flex.flexBox('column', '', 'center')};
  height: 30px;
  padding-left: 5px;
  font-size: ${props => props.theme.fontSizes.small};
  font-weight: ${props => props.theme.fontWeights.bold};
`;

const EstimateBox = styled.div`
  width: 420px;
  height: auto;
  margin-left: 30px;
`;

const EstimateContainer = styled.div`
  ${props => props.theme.flex.flexBox('column', 'center', '')};
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

const BranchTypo = styled.div`
  ${BoxAlign}
  width: 120px;
  background-color: #dbdbdb;
`;

const BranchDetailsTypo = styled.div`
  ${BoxAlign}
  width: 300px;
  background-color: white;
`;

const InputEstimate = styled.textarea`
  margin-top: 15px;
  width: 420px;
  height: 300px;
  border: 1px solid #eaebec;
  padding: 15px 15px;
`;

export default Estimate;
