import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

export type UserStateType = {
  username: string;
  nickname: string;
};

const initialState: UserStateType = {
  username: '',
  nickname: '',
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserInfo(state: UserStateType, action: PayloadAction<UserStateType>) {
      return action.payload;
    },
    clearUserInfo() {
      return initialState;
    },
  },
});

export const { setUserInfo, clearUserInfo } = userSlice.actions;
export default userSlice.reducer;
