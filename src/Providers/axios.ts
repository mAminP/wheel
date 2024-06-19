import axios from "axios";
import { webEnv } from "@/environment/environment";
import { wrapper } from "axios-cookiejar-support";
import { CookieJar } from "tough-cookie";

const jar = new CookieJar();
const axiosInstance = wrapper(
  axios.create({
    baseURL: webEnv.api.server,
    withCredentials: true,
    // @ts-ignore
    credentials: "include",
    jar,
  }),
);
axiosInstance.interceptors.request.use(async (config) => {
  // PROXY
  // config.httpsAgent = agent;
  const isServer = typeof window === "undefined";
  if (isServer) {
    // const session = await getServerSession(NextAuthConfig)
    // if (session && !config.headers.Authorization) {
    //     config.headers['Authorization'] = `Bearer ${session.token}`
    // }
  } else {
  }

  // console.log(config);
  return config;
});

export const $axios = axiosInstance;
