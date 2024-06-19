import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { LoginResultData, LoginResultUser } from "@/app/types/loginResult";
import { RewardType } from "@/app/types/RewardType";

type InitType = {
  user: LoginResultUser | null;
  token: string | null;
  reward: RewardType | null;
  spin: boolean;
  dialog: boolean;
};

const initialState: InitType = {
  user: null,
  token: null,
  reward: null,
  spin: false,
  dialog: false,
};
export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (
      state,
      { payload }: PayloadAction<{ user: LoginResultUser; token: string }>,
    ) => {
      state.user = payload.user;
      state.token = payload.token;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
    },
    setReward: (
      state,
      action: PayloadAction<{ reward: RewardType | null }>,
    ) => {
      state.reward = action.payload.reward;
    },
    updateUser: (state, action: PayloadAction<{ user: LoginResultUser }>) => {
      state.user = action.payload.user;
    },
    toggleSpin: (state, action: PayloadAction<boolean>) => {
      state.spin = action.payload;
    },
    toggleDialog: (state, action: PayloadAction<boolean>) => {
      state.dialog = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  login,
  logout,
  updateUser,
  setReward,
  toggleDialog,
  toggleSpin,
} = userSlice.actions;

export default userSlice.reducer;
