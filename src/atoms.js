import { atom } from 'recoil';

export const fetchDataState = atom({
  key: 'fetchDataState',
  default: '',
});

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

export const GetCarInfoState = atom({
  key: 'GetCarInfoState',
  default: '',
});

export const GetUserInputInfoState = atom({
  key: 'GetUserInputInfoState',
  default: '',
});

export const GetUserInputPhotoState = atom({
  key: 'GetUserInputPhotoState',
  default: '',
});

export const isAllOptionFalseState = atom({
  key: 'isAllOptionFalseState',
  default: true,
});

export const isLoginModalState = atom({
  key: 'isLoginModalState',
  default: false,
});

export const insuranceState = atom({
  key: 'insuranceState',
  default: true,
});

export const userInputInsuranceState = atom({
  key: 'userInputInsuranceState',
  default: '',
});

export const keyAmountState = atom({
  key: 'keyAmountState',
  default: 2,
});

export const wheelScratchAmountState = atom({
  key: 'wheelScratchAmountState',
  default: 1,
});

export const wheelScratchState = atom({
  key: 'wheelScratchState',
  default: true,
});

export const panelScratchAmountState = atom({
  key: 'panelScratchAmountState',
  default: 1,
});

export const panelScratchState = atom({
  key: 'panelScratchState',
  default: true,
});

export const repairState = atom({
  key: 'repairState',
  default: true,
});

export const userInputRepairState = atom({
  key: 'userInputRepairState',
  default: '',
});

export const etcState = atom({
  key: 'etcState',
  default: true,
});

export const userInputEtcState = atom({
  key: 'userInputEtcState',
  default: '',
});
