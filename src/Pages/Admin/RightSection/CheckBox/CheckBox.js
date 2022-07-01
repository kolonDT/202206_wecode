import React from 'react';
import styled from 'styled-components/macro';
import { CHECKBOX_LIST } from '../../constants/adminData';

const CheckBox = () => {
  return (
    <div>
      <CheckBoxAlign>
        {CHECKBOX_LIST.map(({ id, title }) => (
          <Label key={id}>
            <CheckInput type="checkbox" key={id} title={title} />
            {title}
          </Label>
        ))}
      </CheckBoxAlign>
    </div>
  );
};

const CheckBoxAlign = styled.div`
  ${props => props.theme.flex.flexBox('row', 'center', 'space-between')};
  width: 934px;
`;

const Label = styled.label`
  ${props => props.theme.flex.flexBox('row', 'center', '')};
`;

const CheckInput = styled.input`
  width: 1.25rem;
  height: 1.25rem;
  appearance: none;
  border-radius: 0.2rem;
  border: 1px solid #c4c4c4;
  box-shadow: 0 2px 2px rgba(0, 0, 0, 0.1);

  &:checked {
    border: 1px solid #f7cd8b;
    border-radius: 0.2rem;
    background-image: url("data:image/svg+xml,%3csvg viewBox='0 0 16 16' fill='white' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M5.707 7.293a1 1 0 0 0-1.414 1.414l2 2a1 1 0 0 0 1.414 0l4-4a1 1 0 0 0-1.414-1.414L7 8.586 5.707 7.293z'/%3e%3c/svg%3e");
    background-size: 100% 100%;
    background-position: 50%;
    background-repeat: no-repeat;
    background-color: #f7cd8b;
  }

  &:hover {
    cursor: pointer;
  }
`;

export default CheckBox;
