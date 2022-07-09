import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist();
// effects_UNSTABLE: [persistAtom],

export const selectIdState = atom({
  key: 'selectIdState',
  default: '',
});

export const selectModalIdState = atom({
  key: 'selectIdState',
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

export const setModalList = atom({
  key: 'setModalList',
  default: [],
});

export const setSelectOption = atom({
  key: 'setSelectOption',
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

export const setToken = atom({
  key: 'setToken',
  default: '',
});

export const setResponse = atom({
  key: 'setResponse',
  default: {},
  effects_UNSTABLE: [persistAtom],
});

export const setSelectProgress = atom({
  key: 'setSelectProgress',
  default: '',
});

export const setSelectDealer = atom({
  key: 'setSelectDealer',
  default: '',
});

export const setInput = atom({
  key: 'setInput',
  default: '',
});
