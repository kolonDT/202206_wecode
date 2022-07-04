import { atom } from 'recoil';

export const inputTextState = atom({
  key: 'inputTextState',
  default: '',
});

export const currentEstimateState = atom({
  key: 'EstimateState',
  default: 0,
});

export const lastEstimateState = atom({
  key: 'lastEstimateState',
  default: 0,
});

export const EstimateCarInfo = atom({
  key: 'EstimateCarInfo',
  default: [],
});

export const EstimateCarOption = atom({
  key: 'EstimateCarOption',
  default: {},
});

export const UserInputOwnerState = atom({
  key: 'UserInputOwnerState',
  default: '',
});

export const UserInputMileageState = atom({
  key: 'UserInputMileageState',
  default: '',
});

// export const SelectedOptionsState = atom({
//   key: 'SelectedOptionsState',
//   default: [
//     { sunroof: 'False' },
//     { navigation: 'False' },
//     { ventilation_seat: 'False' },
//     { heated_seat: 'False' },
//     { smart_key: 'False' },
//     { leather_seat: 'False' },
//     { electric_folding_mirror: 'False' },
//   ],
// });

export const SelectedOptionsState = atom({
  key: 'SelectedOptionsState',
  default: [
    { id: 0, name: 'sunroof', state: 'False' },
    { id: 1, name: 'navigation', state: 'False' },
    { id: 2, name: 'ventilation_seat', state: 'False' },
    { id: 3, name: 'heated_seat', state: 'False' },
    { id: 4, name: 'smart_key', state: 'False' },
    { id: 5, name: 'leather_seat', state: 'False' },
    { id: 6, name: 'electric_folding_mirror', state: 'False' },
  ],
});
