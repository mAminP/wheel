import "./globals.css";
import RqProvider from "@/Providers/RqProvider";
import MUITheme from "@/Providers/MUITheme";
import MUISnackbar from "@/Providers/MUISnackbar";
import { PropsWithChildren } from "react";
import { Metadata } from "next";
import { webEnv } from "@/environment/environment";
import StoreProvider from "@/Providers/ StoreProvider";
import { cookies } from "next/headers";
import { $axios } from "@/Providers/axios";
import {
  LoginResult,
  LoginResultData,
  LoginResultUser,
} from "@/app/types/loginResult";
import AxiosProvider from "@/Providers/AxiosProvider";
import {RewardType} from "@/app/types/RewardType";

export const metadata: Metadata = {
  title: { template: `%s | ${webEnv.siteNameEn}`, default: webEnv.siteName },
};

export default async function RootLayout({ children }: PropsWithChildren) {
  const authorizationCookie = cookies().get("Authorization");
  const token = authorizationCookie?.value;
  let user: LoginResultUser | null = null;
  let reward: RewardType | null = null;
  if (token) {
    try {
      const { data } = await $axios.get<LoginResult>("/api/user/me", {
        headers: {
          Authorization: token,
        },
      });
      user = data.data.user;
      reward = data.data.lastReward
    } catch (e) {}
  }
  return (
    <StoreProvider user={user} token={token} reward={reward}>
      <AxiosProvider>
        <MUITheme>
          <RqProvider>
            <MUISnackbar>{children}</MUISnackbar>
          </RqProvider>
        </MUITheme>
      </AxiosProvider>
    </StoreProvider>
  );
}
