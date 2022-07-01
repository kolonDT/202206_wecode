import React from 'react';
import styled from 'styled-components/macro';
import SearchBranch from './Branch/SearchBranch';
import SelectCalendar from './Calendar/SelectCalendar';
import DealerName from './DealerName/DealerName';

const Search = () => {
  return (
    <SearchContainer>
      <UpLine>
        <SearchBranch />
        <DealerName />
      </UpLine>
      <SelectCalendar />
    </SearchContainer>
  );
};

const SearchContainer = styled.div`
  ${props => props.theme.flex.flexBox('column', '', 'space-between')};
  width: 870px;
  height: 80px;
  background-color: orange;
  margin: 30px 0;
`;

const UpLine = styled.div`
  ${props => props.theme.flex.flexBox('row', 'center', 'space-between')};
`;

export default Search;
