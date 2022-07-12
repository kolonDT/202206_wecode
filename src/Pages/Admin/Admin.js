import React from 'react';
import styled from 'styled-components/macro';
import AdminNav from '../../Components/AdminNav/AdminNav';
import AdminMenu from './Menu/AdminMenu';
import RightSection from './RightSection/RightSection';

const Admin = () => {
  return (
    <div>
      <AdminNav />
      <SectionAlign>
        <AdminMenu />
        <RightSection />
      </SectionAlign>
    </div>
  );
};

const SectionAlign = styled.div`
  ${props => props.theme.flex.flexBox('row', '', '')};
`;

export default Admin;
