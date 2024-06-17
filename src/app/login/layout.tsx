import type { Metadata } from "next";
import { Container, Grid } from "@mui/material";

export const metadata: Metadata = {
  title: "ورود / ثبت نام",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <main style={{ height: "100vh" }}>
        <Container
          sx={{
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Grid container={true} display={"flex"} justifyContent={"center"}>
            <Grid item xs={12} sm={11} md={6} lg={5} xl={4}>
              {children}
            </Grid>
          </Grid>
        </Container>
      </main>
    </>
  );
}
