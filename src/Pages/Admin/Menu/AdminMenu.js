import React from 'react';
import styled from 'styled-components/macro';
import AdminMenuList from './ListItem/AdminMenuList';

const AdminMenu = () => {
  return (
    <div>
      <AdminMenuContainer>
        <AdminMenuList />
      </AdminMenuContainer>
    </div>
  );
};

const AdminMenuContainer = styled.div`
  width: 15rem;
  height: 61.313rem;
  background-color: #ebebeb;
`;

export default AdminMenu;
