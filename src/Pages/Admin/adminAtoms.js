import { atom } from 'recoil';

export const selectIdState = atom({
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
