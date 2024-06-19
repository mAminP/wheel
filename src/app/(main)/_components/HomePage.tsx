"use client";

import {
  Grid,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import Well from "@/app/(main)/_components/Well";
import { useMemo, useState } from "react";
import Box from "@mui/material/Box";
import Image from "next/image";

// @ts-ignore
import { CopyToClipboard } from "react-copy-to-clipboard";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import SpinAction from "@/app/(main)/_components/SpinAction";
import LoginAction from "@/app/(main)/_components/LoginAction";
import { toggleDialog, toggleSpin } from "@/redux/features/user/user.slice";
import WinDialog from "@/app/(main)/_components/WinDialog";

export default function HomePage() {
  const { user, reward, spin } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const theme = useTheme();
  const lgAndUp = useMediaQuery(theme.breakpoints.up("lg"));

  const handleSpinStop = () => {
    setTimeout(() => {
      dispatch(toggleSpin(false));
      dispatch(toggleDialog(true));
    }, 500);
  };
  const action = user ? <SpinAction /> : <LoginAction />;

  return (
    <>
      <WinDialog />
      <Grid
        container={true}
        spacing={{ xs: 6, sm: 7, md: 10 }}
        alignItems={{
          lg: "center",
        }}
        sx={{ minHeight: "100vh", py: 5 }}
      >
        <Grid item xs={12} sm={12} md={12} lg={6}>
          <Stack
            spacing={{ xs: 1, sm: 2, md: 0 }}
            sx={{
              display: { md: "flex" },
              alignItems: { xs: "center", md: "start" },
            }}
            textAlign={{ xs: "center", md: "left" }}
          >
            <Typography variant={"h1"} color={"white"}>
              جشنواره تابستانه
            </Typography>
            <Box
              sx={{
                position: "relative",
                width: "224px",
                height: "84px",
              }}
            >
              <Image
                src={"/dentilite_text_logo_2.png"}
                alt={"dentilite"}
                fill
                style={{ objectFit: "contain" }}
              />
            </Box>
            <Typography
              color={"white"}
              variant={"h2"}
              sx={{ pt: { xs: 2, md: 4, lg: 12 } }}
            >
              گردونه رو بچرخون و شانست رو امتحان کن !
            </Typography>
            <Typography
              color={"white"}
              variant={"h5"}
              sx={{ py: { xs: 1, sm: 3 } }}
            >
              با چرخوندن گردونه، هم میتونی هدیه بگیری وهم از تخفیف های خرید
              محصولات بهره‌مند بشی
            </Typography>
            {lgAndUp && action}
          </Stack>
        </Grid>

        <Grid
          item
          xs={12}
          sm={12}
          md={12}
          lg={6}
          display={"flex"}
          alignItems={{ xs: "start", md: "end" }}
          justifyContent={"center"}
        >
          <Stack
            spacing={{ xs: 7, sm: 10, md: 11 }}
            display={"flex"}
            alignItems={{ xs: "center", md: "center", lg: "end" }}
          >
            <Box
              display={"flex"}
              alignItems={{ xs: "start", md: "end" }}
              justifyContent={"center"}
              sx={{
                transition: "all 0.2s ease",
                minHeight: {
                  lg: "480px",
                  md: "350px",
                  sm: "auto",
                  xs: "auto",
                },
                width: "100%",
                scale: {
                  xl: "1.5",
                  lg: "1.25",
                  md: "1.2",
                  sm: "1.25",
                  xs: "1.2",
                },
              }}
            >
              <Well
                mustSpin={spin}
                prizeNumber={reward?.value || 0}
                onStop={handleSpinStop}
              />
            </Box>
            {!lgAndUp && action}
          </Stack>
        </Grid>
      </Grid>
    </>
  );
}
