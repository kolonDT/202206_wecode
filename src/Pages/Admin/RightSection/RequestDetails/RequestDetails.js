import React, { useEffect } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import styled, { css } from 'styled-components/macro';
import {
  selectIdState,
  selectOpenState,
  setRequestListData,
} from '../../adminAtoms';
import Modal from '../../Modal/Modal';
import NoRequest from './NoRequest';
import ReaquestTable from './ReaquestTable';

const RequestDetails = () => {
  const requestList = useRecoilValue(setRequestListData);
  const [currentId, setCurrentId] = useRecoilState(selectIdState);
  const [isOpenModal, setOpenModal] = useRecoilState(selectOpenState);
  const totalSum = requestList.length.toLocaleString();

  const onClickToggleModal = () => {
    setOpenModal(!isOpenModal);
  };

  const onSelectId = id => {
    setCurrentId(id);
  };

  return (
    <RequestContainer>
      <TotalRequest>Total {totalSum}</TotalRequest>
      {requestList.length !== 0 ? (
        <ReaquestTable
          onClick={id => {
            onClickToggleModal(id);
            onSelectId(id);
          }}
        />
      ) : (
        <NoRequest />
      )}

      {isOpenModal && (
        <Modal onClickToggleModal={onClickToggleModal} id={currentId} />
      )}
    </RequestContainer>
  );
};
const ListTypo = css`
  font-size: ${props => props.theme.fontSizes.base};
  font-weight: ${props => props.theme.fontWeights.bold};
`;

const RequestContainer = styled.div`
  height: auto;
`;

const TotalRequest = styled.span`
  ${ListTypo}
  margin-bottom:10px;
`;

export default RequestDetails;
