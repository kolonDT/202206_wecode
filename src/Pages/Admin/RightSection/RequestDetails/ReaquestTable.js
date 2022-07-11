import React, { useMemo } from 'react';
import { useTable } from 'react-table';
import { useRecoilValue } from 'recoil';
import { setRequestListData } from '../../adminAtoms';
import { COLUMNS } from './RequestData';
export const ReaquestTable = () => {
  const requestList = useRecoilValue(setRequestListData);
  const columns = useMemo(() => COLUMNS, []);
  const data = useMemo(() => requestList, []);

  //ES6 에서는 꼭 이렇게 key값이랑 매칭 안해줘도 변수명이 같으면 알아서 잘 들어감!
  // const tableInstance = useTable({ columns : columns, data : data })
  const tableInstance = useTable({ columns, data });
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    tableInstance;

  return (
    <table {...getTableProps()}>
      <thead>
        {headerGroups.map(headerGroup => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map(column => (
              <th {...column.getHeaderProps()}>{column.render('Header')}</th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map(row => {
          prepareRow(row);
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map(cell => {
                return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>;
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
