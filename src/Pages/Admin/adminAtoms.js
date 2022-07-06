import { atom } from 'recoil';

export const selectIdState = atom({
  key: 'selectIdState',
  default: '',
});

export const selectOpenState = atom({
  key: 'selectOpenState',
  default: 'false',
});

export const inputEstimate = atom({
  key: 'inputEstimate',
  default: {},
});

export const openModal = atom({
  key: 'openModal',
  default: [],
});
