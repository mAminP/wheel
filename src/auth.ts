import NextAuth, {DefaultSession, User, AuthOptions} from "next-auth";
import Credentials from "next-auth/providers/credentials";

import {webEnv} from "@/environment/environment";
import axios from "axios";
//
declare module "next-auth/jwt" {
    interface JWT {
        token: string;
        user: any;
    }
}
declare module "next-auth" {
    interface User {
        token: string;
    }

    interface AdapterUser {
        token: string;
        // user: ProfileQuery;
    }

    interface Session {
        user: any;
        token: string;
    }
}
export const NextAuthConfig: AuthOptions = {
    pages: {signIn: "/login", signOut: "/", newUser: "/login"},
    // debug: !webEnv.isProd,
    providers: [
        Credentials({
            type: "credentials",
            name: "credentials",
            credentials: {
                token: {},
                refresh: {},
            },
            // @ts-ignore
            async authorize(credentials) {
                try {
                    return {
                        token: credentials?.token as string,
                        refresh: credentials?.refresh as string,
                    };
                } catch (e) {
                    throw e;
                }
            },
        }),
    ],
    session: {strategy: "jwt"},
    callbacks: {
        // @ts-ignore
        jwt: async ({token, user, trigger, session}) => {
            // console.log("[JWT Callback]", { token, user });
            if (trigger === "update") {
                // console.log("trigger", trigger, session, token);
            }
            if (user) {
                token.token = user.token;
            }
            let profile: any | null = null;
            try {
                // console.log("[JWT Callback] try to get user");
                profile = await axios.get('/me', {
                    headers: {
                        authorization: `Bearer ${token.token}`,

                    }
                })
                // console.log(profile);
                if (!profile) {
                    return null;
                }
                token.user = profile;
            } catch (e) {
                throw e
            }
            return token;
        },
        session: ({session, token, trigger}) => {
            // console.log("[Session Callback]", { token, session });
            if (trigger === "update") {
                console.log("trigger", trigger);
            }
            if (token) {
                // @ts-ignore
                session.user = token.user;
                session.token = token.token;
            }
            return session;
        },
    },
};
