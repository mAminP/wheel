import "./globals.css";
import RqProvider from "@/Providers/RqProvider";
import MUITheme from "@/Providers/MUITheme";
import MUISnackbar from "@/Providers/MUISnackbar";
import {PropsWithChildren} from "react";
import {Metadata} from "next";
import AuthProvider from "@/Providers/AuthProvider";
import {NextAuthConfig} from "@/auth";
import {getServerSession} from "next-auth";
import AppSessionProvider from "@/Providers/AppSessionProvider";
import {webEnv} from "@/environment/environment";

export const metadata: Metadata = {
    title: {template: `%s | ${webEnv.siteNameEn}`, default: webEnv.siteName},
};

export default async function RootLayout({children}: PropsWithChildren) {
    const session = await getServerSession(NextAuthConfig);
    return (
        <AppSessionProvider session={session}>
            <AuthProvider session={session}>
                <MUITheme>
                    <RqProvider>
                        <MUISnackbar>
                            {children}
                        </MUISnackbar>
                    </RqProvider>
                </MUITheme>
            </AuthProvider>
        </AppSessionProvider>
    );
}
