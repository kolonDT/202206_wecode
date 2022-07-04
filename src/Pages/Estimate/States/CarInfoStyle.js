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

export const CarInfoWrapper = styled.div`
  max-height: 70%;
  overflow: scroll;
`;

export const CarInfoTitle = styled.th`
  width: 5rem;
  text-align: left;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.darkGray};
`;

export const CarInfoDescription = styled.td`
  margin-left: 1rem;
`;

export const CarInfoTable = styled.table`
  border-top: 1px solid ${({ theme }) => theme.colors.disabled};
  border-bottom: 1px solid ${({ theme }) => theme.colors.disabled};
  /* TODO : 내용 overflow 됐을 때 알려줄 요소 필요 */
  /* background: linear-gradient(
    0deg,
    rgba(8, 94, 214, 0.1) 0%,
    rgba(8, 94, 214, 0) 10%
  ); */
  margin: 0 auto;
  width: 90%;
  padding: 3% 0;
  border-collapse: separate;
  border-spacing: 0.2rem 0.9rem;
  color: ${({ theme }) => theme.colors.gray};
  white-space: pre-line;
  vertical-align: bottom;
`;

export const CarInfoElement = styled.tr`
  text-align: left;
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
