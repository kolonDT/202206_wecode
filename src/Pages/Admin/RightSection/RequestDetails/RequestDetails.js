import React, { useEffect, useState } from 'react';
import styled, { css } from 'styled-components/macro';
import RequestCardList from './RequestCardList';
import { REQUEST_LIST } from './RequestData';

const RequestDetails = () => {
  const [requestList, setRequestList] = useState([]);

  useEffect(() => {
    fetch('Data/Sunshine/RequestCardData.json', {
      method: 'GET',
    })
      .then(res => res.json())
      .then(data => {
        setRequestList(data.results);
      });
  }, []);

  return (
    <div>
      <RequestContainer>
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
        {requestList && <RequestCardList requestList={requestList} />}
      </RequestContainer>
    </div>
  );
};
const ListTypo = css`
  font-size: ${props => props.theme.fontSizes.base};
  font-weight: ${props => props.theme.fontWeights.bold};
`;

const RequestContainer = styled.div`
  height: auto;
`;

const RequestList = styled.ul`
  ${props => props.theme.flex.flexBox('row', 'center', 'space-between')};
  margin-right: 10px;
  padding: 0 119px 0 45px;
  width: 90.188rem;
  height: 2.375rem;
  background-color: #dbdbdb;
`;

const RequestNumber = styled.li`
  padding-right: -15px;
  ${ListTypo}
`;

const RequestName = styled.li`
  padding-right: 10px;
  ${ListTypo}
`;

const PhoneNumber = styled.li`
  padding-right: 10px;
  ${ListTypo}
`;
const CarNumber = styled.li`
  margin-right: -28px;
  ${ListTypo}
`;

const Manufacture = styled.li`
  margin-right: -23px;
  ${ListTypo};
`;

const ModelNumber = styled.li`
  margin-right: -10px;
  ${ListTypo}
`;
const CarYear = styled.li`
  margin-right: -10px;
  ${ListTypo}
`;
const RequestDate = styled.li`
  ${ListTypo}
`;

const Branch = styled.li`
  ${ListTypo}
`;

const Dealer = styled.li`
  ${ListTypo}
`;

const Status = styled.li`
  ${ListTypo}
`;

const RequestListDetails = styled.li`
  list-style: none;
  font-size: ${props => props.theme.fontSizes.base};
  font-weight: ${props => props.theme.fontWeights.bold};
`;

export default RequestDetails;
