import React from 'react';
import styled from 'styled-components/macro';
import SearchBranch from './Branch/SearchBranch';
import SelectCalendar from './Calendar/SelectCalendar';
import DealerFilter from './DealerName/DealerFilter';

const Search = ({ handleSelectBranch, handleSelectDealer }) => {
  return (
    <SearchContainer>
      <UpLine>
        <SearchBranch handleSelectBranch={handleSelectBranch} />
        <DealerFilter handleSelectDealer={handleSelectDealer} />
      </UpLine>
      {/* <SelectCalendar /> */}
    </SearchContainer>
  );
};

const SearchContainer = styled.div`
  ${props => props.theme.flex.flexBox('column', '', 'space-between')};
  width: 870px;
  height: 80px;
  margin: 30px 0;
`;

const UpLine = styled.div`
  ${props => props.theme.flex.flexBox('row', 'center', 'space-between')};
`;

export default Search;
