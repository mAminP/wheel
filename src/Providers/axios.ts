import axios from "axios";
import { getServerSession } from "next-auth";
import { NextAuthConfig } from "@/auth";
import { webEnv } from "@/environment/environment";

const axiosInstance = axios.create({
  baseURL: webEnv.api.server,
  withCredentials: true,

  // headers: {
  //     'Content-Type': 'application/json'
  // }
});

axiosInstance.interceptors.request.use(async (config) => {
  // PROXY

  const isServer = typeof window === "undefined";
  if (isServer) {
    // const session = await getServerSession(NextAuthConfig)
    // if (session && !config.headers.Authorization) {
    //     config.headers['Authorization'] = `Bearer ${session.token}`
    // }
  } else {
  }
  return config;
});

export const $axios = axiosInstance;
