import React, { useEffect } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import styled, { css } from 'styled-components/macro';
import {
  selectIdState,
  selectModalIdState,
  selectOpenState,
  setRequestListData,
  setRequestSearchData,
  setResponse,
} from '../../adminAtoms';
import Modal from '../../Modal/Modal';
import ReaquestTable from './ReaquestTable';
import RequestCardList from './RequestCardList';

const RequestDetails = () => {
  const requestList = useRecoilValue(setRequestListData);
  const searchList = useRecoilValue(setRequestSearchData);
  const [currentId, setCurrentId] = useRecoilState(selectIdState);
  const [isOpenModal, setOpenModal] = useRecoilState(selectOpenState);
  const getModalId = useRecoilValue(selectModalIdState);
  const totalSum = requestList.length.toLocaleString();
  const responseData = useRecoilValue(setResponse);

  const onClickToggleModal = () => {
    setOpenModal(!isOpenModal);
  };

  const onSelectId = id => {
    setCurrentId(id);
  };

  return (
    <RequestContainer>
      <TotalRequest>Total {totalSum}</TotalRequest>
      {requestList.length !== 0 && (
        <ReaquestTable
          onClick={id => {
            onClickToggleModal(id);
            onSelectId(id);
          }}
        />
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
`;

const RequestList = styled.ul`
  ${props => props.theme.flex.flexBox('row', 'center', 'space-between')};
  margin: 10px 10px 0 0;
  padding: 0 155px 0 45px;
  width: 90.188rem;
  height: 2.375rem;
  background-color: #dbdbdb;
`;

const RequestNumber = styled.li`
  padding-right: 5px;
  ${ListTypo}
`;

const RequestName = styled.li`
  padding-right: 20px;
  ${ListTypo}
`;

const PhoneNumber = styled.li`
  padding-right: 20px;
  ${ListTypo}
`;
const CarNumber = styled.li`
  margin-right: -15px;
  ${ListTypo}
`;

const Manufacture = styled.li`
  margin-right: -10px;
  ${ListTypo};
`;

const ModelNumber = styled.li`
  margin-right: -20px;
  ${ListTypo}
`;
const CarYear = styled.li`
  margin-left: 20px;
  margin-right: -15px;
  ${ListTypo}
`;
const RequestDate = styled.li`
  padding-right: 20px;
  ${ListTypo}
`;

const Branch = styled.li`
  padding-right: 20px;
  ${ListTypo}
`;

const Dealer = styled.li`
  margin-right: -20px;
  ${ListTypo}
`;

const Status = styled.li`
  margin-left: -5px;
  ${ListTypo}
`;

const RequestListDetails = styled.li`
  list-style: none;
  font-size: ${props => props.theme.fontSizes.base};
  font-weight: ${props => props.theme.fontWeights.bold};
`;

export default RequestDetails;
