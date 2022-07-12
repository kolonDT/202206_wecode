import React, { useEffect } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import styled from 'styled-components/macro';
import {
  setRequestListData,
  setRequestSearchData,
  setResponse,
} from '../adminAtoms';
import CheckBox from './CheckBox/CheckBox';
import MenuInfo from './MenuInfo/MenuInfo';
import ReaquestTable from './RequestDetails/ReaquestTable';
import RequestDetails from './RequestDetails/RequestDetails';
import Search from './Search/Search';

const RightSection = () => {
  const [requestList, setRequestList] = useRecoilState(setRequestListData);
  const [searchList, setSearchList] = useRecoilState(setRequestSearchData);
  const responseData = useRecoilValue(setResponse);
  // console.log(requestList);
  // console.log(searchList);

  // 서버 안열렸을때 가져올거임
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

  // const userToken = localStorage.getItem('token'); //토큰값 가져옴
  // console.log(`토큰 머 들고오노 함 보자 ${userToken}`);

  // 서버 열렸을때!
  const getRequestCardData = () => {
    fetch('http://10.133.5.8:8000/dealers/estimates', {
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

  useEffect(() => {
    getRequestCardData();
  }, []);

  return (
    <SectionAll>
      <BottomDistance>
        <MenuInfo />
        <CheckBox />
        <Search />
        <RequestDetails />
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
