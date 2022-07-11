import React from 'react';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components/macro';
import { setResponse } from '../../Pages/Admin/adminAtoms';

const DealerName = () => {
  const { name } = useRecoilValue(setResponse);

  return (
    <div>
      <DealerInfo>{name}</DealerInfo>
    </div>
  );
};

export default DealerName;

const DealerInfo = styled.span`
  font-size: ${props => props.theme.fontSizes.base};
  font-weight: ${props => props.theme.fontWeights.bold};
`;
