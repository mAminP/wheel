"use client";
import { PropsWithChildren } from "react";
import { SessionProvider } from "next-auth/react";
import { Session } from "next-auth";

export default function AppSessionProvider(
  props: PropsWithChildren & { session: Session | null },
) {
  return <SessionProvider>{props.children}</SessionProvider>;
}
