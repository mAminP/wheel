"use client";

import { PropsWithChildren } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { $axios } from "@/Providers/axios";

export default function AxiosProvider({ children }: PropsWithChildren) {
  const { user, token } = useAppSelector((state) => state.user);
  $axios.interceptors.request.use((config) => {
    if (token) {
      config.headers["Authorization"] = token;
    }
    return config;
  });
  return <>{children}</>;
}
