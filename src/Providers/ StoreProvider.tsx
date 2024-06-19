"use client";
import { useRef } from "react";
import { Provider } from "react-redux";
import { makeStore, AppStore } from "@/redux/store";
import { LoginResultData, LoginResultUser } from "@/app/types/loginResult";
import {
  login,
  setReward,
  toggleDialog,
} from "@/redux/features/user/user.slice";
import { $axios } from "@/Providers/axios";
import { RewardType } from "@/app/types/RewardType";
type Props = {
  children: React.ReactNode;
  reward?: RewardType | null;
  user?: LoginResultUser | null;
  token?: string | null;
};
export default function StoreProvider({
  children,
  user,
  token,
  reward,
}: Props) {
  const storeRef = useRef<AppStore>();
  if (!storeRef.current) {
    // Create the store instance the first time this renders
    storeRef.current = makeStore();
    if (user && token) {
      storeRef.current.dispatch(login({ user, token }));
      if (reward) {
        storeRef.current.dispatch(setReward({ reward: reward }));
        storeRef.current.dispatch(toggleDialog(true));
      }
    }
  }

  return <Provider store={storeRef.current}>{children}</Provider>;
}
