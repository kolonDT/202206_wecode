import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';
import { selectMenuIdState, selectSubIdState } from '../../adminAtoms';
import { MENU_LIST } from '../../constants/adminData';

const AdminMenuList = () => {
  const [clickedTab, setClickedTab] = useState(true);
  const [currentId, setCurrentId] = useRecoilState(selectMenuIdState);
  const [currentSubId, setCurrentSubId] = useRecoilState(selectSubIdState);

  const navigate = useNavigate();

  const moveCategory = id => {
    // console.log(`이건 큰 카테고리: ${id}`);
  }; //네비게이트 url 넘겨주는

  const moveSubCategory = sub => {
    // console.log(`이건 sub 카테고리: ${sub}`);
  };

  // const handleClick = () => {
  //   setClickedTab(!clickedTab);
  // };
  console.log(`뭐가 나오냐 큰 메뉴는 ${currentId}`);
  console.log(`뭐가 나오냐 작은 메뉴는 ${currentSubId}`);

  return (
    <MenuWrapper>
      <MenuContainer>
        {MENU_LIST.map(({ id, title, subList }) => {
          return (
            <MenuList
              key={id}
              onClick={() => {
                moveCategory(id);
                setCurrentId(id);
                setClickedTab(clickedTab);
              }}
              className={id === currentId ? 'selectMenu' : 'black'}
            >
              {title}
              {id === currentSubId && (
                <SubMenu>
                  {subList?.map(({ sub, title }) => {
                    return (
                      <SubMenuList
                        key={sub}
                        onClick={() => {
                          moveSubCategory(sub);
                          setCurrentSubId(sub);
                        }}
                        className={
                          sub === currentSubId ? 'selectSubMenu' : 'black'
                        }
                      >
                        {title}
                      </SubMenuList>
                    );
                  })}
                </SubMenu>
              )}
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
  color: ${props => props.color};
  &.selectMenu {
    color: #f29c38;
  }
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
  color: ${props => props.color};
  &.selectSubMenu {
    color: #f29c38;
  }
`;

export default AdminMenuList;
