"use client";
import { SnackbarProvider } from "notistack";
import { PropsWithChildren } from "react";

export default function MUISnackbar({ children }: PropsWithChildren) {
  return (
    <SnackbarProvider
      dense={true}
      autoHideDuration={3000}
      anchorOrigin={{ horizontal: "center", vertical: "bottom" }}
    >
      {children}
    </SnackbarProvider>
  );
}
