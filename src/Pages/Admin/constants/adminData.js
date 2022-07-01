export const MENU_LIST = [
  {
    id: 0,
    title: '대시보드',
  },
  {
    id: 1,
    title: '멤버십 고객 관리',
    subList: [
      {
        id: 1,
        title: '고객관리',
      },
      { id: 2, title: '해지 관리' },
    ],
  },
  {
    id: 2,
    title: '청구/결제 관리',
    subList: [
      {
        id: 1,
        title: '이용내역',
      },
      { id: 2, title: '청구내역' },
      { id: 3, title: '결제내역' },
    ],
  },
  {
    id: 3,
    title: '중고차 매입',
    subList: [
      {
        id: 1,
        title: '요청내역',
      },
      { id: 2, title: 'SC 조회' },
    ],
  },
  {
    id: 4,
    title: 'SMS/Push 발송',
  },
  {
    id: 5,
    title: '공지사항',
    subList: [
      {
        id: 1,
        title: '게시글 조회',
      },
      { id: 2, title: '글 등록' },
    ],
  },
  {
    id: 6,
    title: '통계/분석',
    subList: [
      {
        id: 1,
        title: '방문 분석',
      },
      { id: 2, title: '이용 분석' },
    ],
  },
  {
    id: 7,
    title: '관리/설정',
    subList: [
      {
        id: 1,
        title: '관리자 설정',
      },
      { id: 2, title: '권한 설정' },
    ],
  },
];

export const CHECKBOX_LIST = [
  { id: 0, title: '전체' },
  { id: 1, title: '대기' },
  { id: 2, title: '딜러배정' },
  { id: 3, title: '방문상담' },
  { id: 4, title: '판매요청' },
  { id: 5, title: '판매완료' },
  { id: 6, title: '상담종료' },
];
