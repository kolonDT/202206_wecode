import React from 'react';
import styled from 'styled-components/macro';
import CheckBox from './CheckBox/CheckBox';
import MenuInfo from './MenuInfo/MenuInfo';
import RequestDetails from './RequestDetails/RequestDetails';
import Search from './Search/Search';

const RightSection = () => {
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
