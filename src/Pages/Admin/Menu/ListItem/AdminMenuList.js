import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { MENU_LIST } from '../../constants/adminData';

const AdminMenuList = () => {
  const [clickedTab, setClickedTab] = useState(true);

  const navigate = useNavigate();

  const moveCategory = id => {
    console.log(`이건 큰 카테고리: ${id}`);
  }; //네비게이트 url 넘겨주는

  const moveSubCategory = id => {
    console.log(`이건 sub 카테고리: ${id}`);
  };

  return (
    <MenuWrapper>
      <MenuContainer>
        {MENU_LIST.map(({ id, title, subList }) => {
          return (
            <MenuList
              key={id}
              onClick={() => {
                moveCategory(id);
                setClickedTab(!clickedTab);
              }}
            >
              {title}
              <SubMenu>
                {subList?.map(({ id, title }) => {
                  return (
                    clickedTab === true && (
                      <SubMenuList
                        key={id}
                        onClick={() => {
                          moveSubCategory(id);
                        }}
                      >
                        {title}
                      </SubMenuList>
                    )
                  );
                })}
              </SubMenu>
            </MenuList>
          );
        })}
      </MenuContainer>
    </MenuWrapper>
  );
};

const MenuWrapper = styled.div`
  padding: 34px 0 16px 0;
`;

const MenuContainer = styled.ul`
  &:hover {
    cursor: pointer;
  }
`;

const MenuList = styled.li`
  padding: 0 0 25px 40px;
  list-style: none;
  font-size: ${props => props.theme.fontSizes.xl};
  font-weight: ${props => props.theme.fontWeights.extraBold};
`;

const SubMenu = styled.ul`
  &:hover {
    cursor: pointer;
  }
`;

const SubMenuList = styled.li`
  padding: 20px 0 7px 10px;
  list-style: none;
  font-size: ${props => props.theme.fontSizes.lg};
  font-weight: ${props => props.theme.fontWeights.regular};
`;

export default AdminMenuList;
