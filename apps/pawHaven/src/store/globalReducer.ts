import { createSlice } from '@reduxjs/toolkit';
import LocaleKeys from '@shared/constants/localeKey';
import storageKeys from '@shared/constants/storageKeys';
import storageTool from '@shared/utils/storage';

import { useReduxSelector } from '../hooks/reduxHooks';

import reducerNames from './reducerNames';
import { ReduxState } from './reduxStore';

import type { UserInfoType } from '@/typings/auth.types';

export interface GlobalStateType {
  userInfo: UserInfoType;
  menuItems: any[];
  locale: string;
}
const initialState: GlobalStateType = {
  userInfo: {
    userName: '',
  },
  menuItems: [],
  locale: storageTool.get(storageKeys.I18NKEY) || LocaleKeys['en-US'],
};

const globalReducer = createSlice({
  name: reducerNames.global,
  initialState,
  reducers: {
    setMenuItems: (state, action) => {
      state.menuItems = action.payload;
    },
    setUserInfo: (state, action) => {
      state.userInfo = action.payload;
    },
  },
});
export default globalReducer.reducer;

export const { setMenuItems, setUserInfo } = globalReducer.actions;
export const useGlobalState = () => {
  return useReduxSelector((state: ReduxState) => state?.global ?? {});
};
