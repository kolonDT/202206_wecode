import { atom } from 'recoil';

export const selectIdState = atom({
  key: 'selectIdState',
  default: '',
});

export const selectOpenState = atom({
  key: 'selectOpenState',
  default: 'false',
});
