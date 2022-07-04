import React from 'react';
import styled from 'styled-components/macro';
import { REQUEST_LIST } from './RequestData';

const RequestDetails = () => {
  return (
    <div>
      <RequestContainer>
        <RequestList>
          {REQUEST_LIST.map(({ id, title }) => (
            <RequestListDetails key={id}>{title}</RequestListDetails>
          ))}
        </RequestList>
      </RequestContainer>
    </div>
  );
};

const RequestContainer = styled.div`
  width: 86.188rem;
  height: 28.5rem;
  background-color: yellow;
`;

const RequestList = styled.ul`
  ${props => props.theme.flex.flexBox('row', 'center', 'space-between')};
  padding: 0 119px 0 45px;
  width: 86.188rem;
  height: 2.375rem;
  background-color: #dbdbdb;
`;

const RequestListDetails = styled.li`
  list-style: none;
  font-size: ${props => props.theme.fontSizes.base};
  font-weight: ${props => props.theme.fontWeights.bold};
`;

export default RequestDetails;
