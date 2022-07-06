import React from 'react';
import RequestCard from './RequestCard';

const RequestCardList = ({ requestList, onClick }) => {
  return (
    <div>
      {requestList &&
        requestList.map(
          ({
            id,
            onwer,
            phone_number,
            car_number,
            manufacture,
            car_name,
            model_year,
            request_date,
            name,
            dealer,
            status,
            statusDate,
          }) => {
            return (
              <RequestCard
                key={id}
                id={id}
                onwer={onwer}
                phone_number={phone_number}
                car_number={car_number}
                manufacture={manufacture}
                car_name={car_name}
                model_year={model_year}
                request_date={request_date}
                name={name}
                dealer={dealer}
                status={status}
                statusDate={statusDate}
                onClick={onClick}
              />
            );
          }
        )}
    </div>
  );
};

export default RequestCardList;
