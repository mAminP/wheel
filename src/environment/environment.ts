// import * as process from "node:process";

export const webEnv: IWebEnv = {
    isProd: process.env.NODE_ENV === "production",
    jwtSecret: process.env.AUTH_SECRET as string,
    api: {
        server: process.env.NEXT_PUBLIC_URL_SERVER as string,
    },
    recaptcha: {
        google: process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY as string,
    },
    siteName: 'ناکسینو',
    siteNameEn: "Nuxino"
};

export interface IWebEnv {
    isProd: boolean;
    api: {
        server: string;
    };
    jwtSecret: string;
    recaptcha: {
        google: string;
    };
    siteName: string,
    siteNameEn: string
}
