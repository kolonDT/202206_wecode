const responseData = useRecoilValue(setResponse);
// 나중에 지점이랑 진행상태는 따로 갑 가져와서 저장할거임
const requestList = useRecoilValue(setRequestListData);
export const DATA = useMemo(() => requestList, []);

export const COLUMNS = useMemo(
  () => [
    {
      Header: 'No',
      accessor: 'estimate_id',
    },
    {
      Header: '이름',
      accessor: 'owner',
    },
    {
      Header: '휴대폰',
      accessor: 'phone_number',
    },
    {
      Header: '차량번호',
      accessor: 'car_number',
    },
    {
      Header: '브랜드',
      accessor: 'manufacturer',
    },
    {
      Header: '모델명',
      accessor: 'trim',
    },
    {
      Header: '연식',
      accessor: 'model_year',
    },
    {
      Header: '견적요청일',
      accessor: 'estimate_request_date',
    },
    {
      Header: '지점',
      accessor: 'branch',
    },
    {
      Header: '담당자',
      accessor: 'dealer',
    },
    {
      Header: '진행상태',
      accessor: 'progress',
    },
  ],
  []
);
