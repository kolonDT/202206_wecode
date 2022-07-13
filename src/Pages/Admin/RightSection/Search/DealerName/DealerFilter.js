import React from 'react';
import { useRecoilValue } from 'recoil';
import { selectBranchState, setRequestSearchData } from '../../../adminAtoms';
import DealerName from '../../../../../Components/DealerName';

const DealerFilter = ({ handleSelectDealer }) => {
  const selectBranch = useRecoilValue(selectBranchState);
  const searchList = useRecoilValue(setRequestSearchData);

  const newDealer = searchList.find(({ branch: searchBranch }) => {
    return selectBranch === searchBranch;
  }) || { dealer: [] };

  return (
    <DealerName handleSelectDealer={handleSelectDealer}>
      <option>전체</option>
      {selectBranch !== '전체' &&
        newDealer.dealer.map((name, i) => {
          return <option key={name + i}>{name}</option>;
        })}
    </DealerName>
  );
};

export default DealerFilter;
