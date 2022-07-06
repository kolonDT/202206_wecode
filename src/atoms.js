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

export const SelectedOptionsState = atom({
  key: 'SelectedOptionsState',
  default: [
    { id: 0, name: 'sunroof', state: false },
    { id: 1, name: 'navigation', state: false },
    { id: 2, name: 'ventilation_seat', state: false },
    { id: 3, name: 'heated_seat', state: false },
    { id: 4, name: 'electric_seat', state: false },
    { id: 5, name: 'smart_key', state: false },
    { id: 6, name: 'leather_seat', state: false },
    { id: 7, name: 'electric_folding_mirror', state: false },
  ],
});

export const isAlarmState = atom({
  key: 'isAlarmState',
  default: false,
});

export const AlarmListState = atom({
  key: 'AlarmListState',
  default: [],
});

export const AlarmModalState = atom({
  key: 'AlarmModalState',
  default: false,
});

export const LoginProcessState = atom({
  key: 'LoginProcessState',
  default: 1,
});
