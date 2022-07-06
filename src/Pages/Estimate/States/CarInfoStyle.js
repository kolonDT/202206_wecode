import { Button } from 'react-bootstrap';
import styled, { css } from 'styled-components';

export const ContentTitle = styled.h2`
  font-size: x-large;
  font-weight: 600;
  line-height: 1.9rem;
  margin-bottom: 2.3rem;
  color: ${({ theme }) => theme.colors.blackC};
`;

export const ContentBox = styled.section`
  width: 100%;
  height: ${({ currentEstimate }) =>
    currentEstimate === 1 ? '76vh' : 'fit-content'};
  padding: 10%;
  background-color: white;
  position: absolute;
`;

export const InputBox = styled.input`
  width: 100%;
  height: 3rem;
  border: 1px solid ${({ theme }) => theme.colors.disabled};
  border-radius: 5px;
  padding: 1em;
`;

export const InputButton = styled(Button)`
  width: 100%;
  height: 3rem;
  border-radius: 100rem;
  margin-top: 5rem;
  font-weight: 600;
`;

export const ButtonSet = styled.div`
  ${({ theme }) => theme.flex.flexBox('', '', 'space-between')}
  margin-top: 4rem;

  ${props =>
    props.currentEstimate === 1 &&
    css`
      position: absolute;
      bottom: 10%;
      width: 80%;
    `}
`;

export const NextButton = styled(Button)`
  width: 49%;
  height: 3rem;
  border-radius: 100rem;
  font-weight: 600;
`;

export const PrevButton = styled(Button)`
  background-color: white;
  border: 1px solid ${({ theme }) => theme.colors.primaryBlue};
  color: ${({ theme }) => theme.colors.primaryBlue};
  width: 49%;
  height: 3rem;
  border-radius: 100rem;
  font-weight: 600;
`;
