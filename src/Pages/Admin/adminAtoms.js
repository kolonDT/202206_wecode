import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist();
// effects_UNSTABLE: [persistAtom],

export const selectIdState = atom({
  key: 'selectIdState',
  default: '',
});

export const selectMenuIdState = atom({
  key: 'selectMenuIdState',
  default: '',
});
export const selectSubIdState = atom({
  key: 'selectSubIdState',
  default: '',
});

export const selectOpenState = atom({
  key: 'selectOpenState',
  default: false,
});

export const inputEstimate = atom({
  key: 'inputEstimate',
  default: {},
});

export const openModal = atom({
  key: 'openModal',
  default: [],
});

export const setRequestListData = atom({
  key: 'setRequestList',
  default: [],
});

export const setRequestSearchData = atom({
  key: 'setRequestSearchData',
  default: [],
});

export const setModalList = atom({
  key: 'setModalList',
  default: [],
});

export const signInIdState = atom({
  key: 'signInIdState',
  default: '',
});

export const signInPwState = atom({
  key: 'signInPwState',
  default: '',
});

export const setResponse = atom({
  key: 'setResponse',
  default: {},
  effects_UNSTABLE: [persistAtom],
});

export const setSelectProgress = atom({
  key: 'setSelectProgress',
  default: '대기',
});

export const setSelectListProgress = atom({
  key: 'setSelectListProgress',
  default: '대기',
});

export const selectModalDealerState = atom({
  key: 'selectModalDealerState',
  default: '전체',
});

export const saveModalDealerState = atom({
  key: 'saveModalDealerState',
  default: '',
});

export const setInput = atom({
  key: 'setInput',
  default: '',
});

export const selectBranchState = atom({
  key: 'selectBranchState',
  default: '전체',
});

export const AdminAlarmModalState = atom({
  key: 'AdminAlarmModalState',
  default: false,
});

export const AdminAlarmListState = atom({
  key: 'AdminAlarmListState',
  default: [],
});
