import React, { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import styled, { css } from 'styled-components/macro';
import {
  selectIdState,
  selectOpenState,
  setRequestListData,
} from '../../adminAtoms';
import Modal from '../../Modal/Modal';
import RequestCardList from './RequestCardList';
// import { REQUEST_LIST } from './RequestData';

const RequestDetails = () => {
  const [requestList, setRequestList] = useRecoilState(setRequestListData);
  const [currentId, setCurrentId] = useRecoilState(selectIdState);
  const [isOpenModal, setOpenModal] = useRecoilState(selectOpenState);

  const totalSum = requestList.length.toLocaleString();

  // 서버 안열렸을때 가져올거임
  const getRequestCardData = () => {
    fetch('Data/Sunshine/RequestCardData.json', {
      method: 'GET',
    })
      .then(res => res.json())
      .then(data => {
        setRequestList(data.results);
      });
  };

  useEffect(() => {
    getRequestCardData();
  }, []);

  // 서버 열렸을때!
  // const getRequestCardData = () => {
  //   fetch('http://10.133.4.172:8000/dealers/estimates', {
  //     method: 'GET',
  //   })
  //     .then(res => res.json())
  //     .then(data => {
  //       setRequestList(data.results);
  //     });
  // };

  // useEffect(() => {
  //   getRequestCardData();
  // }, []);

  const onClickToggleModal = id => {
    setCurrentId(id);
    console.log(`여기는? 뭐들어옴? ${id}`);
    setOpenModal(!isOpenModal);
  };

  const onSelectId = id => {
    setCurrentId(id);
    console.log(`여기에 뭐가 들어오냐! ${id}`);
  };

  return (
    <RequestContainer>
      <TotalRequest>Total {totalSum}</TotalRequest>
      <RequestList>
        {/* {REQUEST_LIST.map(({ id, title }) => (
            <RequestListDetails key={id}>{title}</RequestListDetails>
          ))} */}
        <RequestNumber>No</RequestNumber>
        <RequestName>이름</RequestName>
        <PhoneNumber>휴대폰</PhoneNumber>
        <CarNumber>차량번호</CarNumber>
        <Manufacture>브랜드</Manufacture>
        <ModelNumber>모델명</ModelNumber>
        <CarYear>연식</CarYear>
        <RequestDate>견적요청일</RequestDate>
        <Branch>지점</Branch>
        <Dealer>담당자</Dealer>
        <Status>진행상태</Status>
      </RequestList>
      {requestList && (
        <RequestCardList
          requestList={requestList}
          onClick={id => {
            onClickToggleModal(id);
            onSelectId(id);
          }}
        />
      )}
      {isOpenModal && <Modal onClickToggleModal={onClickToggleModal} />}
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
