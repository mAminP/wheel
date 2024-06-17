"use client";
import {createContext, PropsWithChildren, useContext, useMemo} from "react";
import {Session} from "next-auth";
import {useSession} from "next-auth/react";
import {$axios} from "@/Providers/axios";

const AuthContext = createContext<{
    session: Session | null;
    status: "authenticated" | "loading" | "unauthenticated";
    update: (data?: any) => Promise<Session | null>;
}>({
    status: "unauthenticated",
    session: null,
    update: async () => null,
});

export default function AuthProvider({
                                         children,
                                         session,
                                     }: PropsWithChildren & { session: Session | null }) {
    const {data, update, status} = useSession();
    const s = useMemo(() => {
        return data ?? session;
    }, [data, session]);

    $axios.interceptors.request.use((config) => {
        if (s) {
            config.headers["Authorization"] = `Bearer ${s?.token}`;
        }
        return config;
    });
    return (
        <AuthContext.Provider value={{session: s, status: status, update}}>
            {children}
        </AuthContext.Provider>
    );
}
