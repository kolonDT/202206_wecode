import React from 'react';
import RequestCard from './RequestCard';

const RequestCardList = ({ requestList, onClick }) => {
  return (
    <div>
      {requestList &&
        requestList.map(list => {
          return <RequestCard key={list.id} {...list} onClick={onClick} />;
        })}
    </div>
  );
};

export default RequestCardList;
