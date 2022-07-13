import React from 'react';
import { useRecoilValue } from 'recoil';
import { setModalList, setRequestSearchData } from '../../adminAtoms';
import DealerName from '../../../../Components/DealerName';

const DealerSelect = ({ handleSelectDealer, branch }) => {
  const searchList = useRecoilValue(setRequestSearchData);
  const { consulting } = useRecoilValue(setModalList);
  const defaultDealer = consulting[0]?.dealer;

  const newDealer = searchList.find(({ branch: searchBranch }) => {
    return branch === searchBranch;
  }) || { dealer: [] };

  return (
    <DealerName isFilter={false} handleSelectDealer={handleSelectDealer}>
      {defaultDealer ? (
        defaultDealer
      ) : (
        <>
          <option>선택</option>
          {newDealer.dealer.map((name, i) => {
            return <option>{name}</option>;
          })}
        </>
      )}
    </DealerName>
  );
};

export default DealerSelect;
