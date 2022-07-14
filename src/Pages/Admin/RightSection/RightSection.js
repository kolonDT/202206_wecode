import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useRecoilState, useRecoilValue } from 'recoil';
import styled from 'styled-components/macro';
import {
  selectBranchState,
  setRequestListData,
  setRequestSearchData,
  setResponse,
} from '../adminAtoms';
import CheckBox from './CheckBox/CheckBox';
import MenuInfo from './MenuInfo/MenuInfo';
import RequestDetails from './RequestDetails/RequestDetails';
import Search from './Search/Search';
import { IP } from '../../../config';

const RightSection = () => {
  const [requestList, setRequestList] = useRecoilState(setRequestListData);
  const [searchList, setSearchList] = useRecoilState(setRequestSearchData);
  const [selectBranch, setSelectBranch] = useRecoilState(selectBranchState);
  const responseData = useRecoilValue(setResponse);

  const navigate = useNavigate();
  const params = useParams();

  // Fix: 서버 안열렸을때 가져올거임
  // const getRequestCardData = () => {
  //   fetch('Data/Sunshine/RequestCardData.json', {
  //     method: 'GET',
  //   })
  //     .then(res => res.json())
  //     .then(res => {
  //       setRequestList(res.results);
  //     });
  // };

  // useEffect(() => {
  //   getRequestCardData();
  // }, []);

  // Fix: 서버 열렸을때!
  useEffect(() => {
    getTotalCardData();
  }, []);

  const getTotalCardData = () => {
    fetch(`${IP}dealers/estimates`, {
      method: 'GET',
      headers: { Authorization: responseData.access_token },
    })
      .then(res => res.json())
      .then(res => {
        setSearchList(res.info);
        setRequestList(res.results);
      });
  };

  // 필터함수
  const getFilterCardData = ({ branchParams, dealerParams }) => {
    const dealer =
      branchParams && dealerParams ? `&dealer_name=${dealerParams}` : '';
    navigate(`?${params}${branchParams}${dealer}`);

    fetch(`${IP}dealers/estimates?&branch_name=${branchParams}${dealer}`, {
      method: 'GET',
      headers: { Authorization: responseData.access_token },
    })
      .then(res => res.json())
      .then(res => {
        console.log(res.results);
        setSearchList(res.info);
        setRequestList(res.results);
      });
  };

  const handleSelectBranch = ({ target: { value } }) => {
    setSelectBranch(value);
    if (value === '전체') {
      getTotalCardData();
    } else {
      getFilterCardData({
        branchParams: value,
        dealerParams: false,
      });
    }
  };

  const handleSelectDealer = ({ target: { value } }) => {
    if (value === '전체') {
      getFilterCardData({
        branchParams: selectBranch,
        dealerParams: false,
      });
    } else {
      getFilterCardData({
        branchParams: selectBranch,
        dealerParams: value,
      });
    }
  };

  return (
    <SectionAll>
      <BottomDistance>
        <MenuInfo />
        <CheckBox />

        {searchList.length !== 0 && (
          <>
            <Search
              handleSelectBranch={handleSelectBranch}
              handleSelectDealer={handleSelectDealer}
            />
            <RequestDetails />
          </>
        )}
      </BottomDistance>
    </SectionAll>
  );
};

const SectionAll = styled.div`
  ${props => props.theme.flex.flexBox('column', '', '')};
  margin: 20px 0 0 20px;
`;

const BottomDistance = styled.div`
  padding-bottom: 30px;
`;

export default RightSection;
