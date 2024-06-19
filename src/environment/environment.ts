// import * as process from "node:process";

export const webEnv: IWebEnv = {
  isProd: process.env.NODE_ENV === "production",
  api: {
    server: process.env.NEXT_PUBLIC_URL_SERVER as string,
  },

  siteName: "دنتیلایت",
  siteNameEn: "Dentilite",
};

export interface IWebEnv {
  isProd: boolean;
  api: {
    server: string;
  };
  siteName: string;
  siteNameEn: string;
}
