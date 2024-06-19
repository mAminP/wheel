"use client";

import {
  Button,
  Card,
  Divider,
  FormHelperText,
  IconButton,
  InputBase,
  Paper,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { Field, FieldProps, Formik } from "formik";
import {
  CheckCircle,
  Directions,
  KeyboardArrowLeft,
  KeyboardArrowRight,
  Menu,
  Search,
} from "@mui/icons-material";
import { yup } from "@/lib/yup";
import Box from "@mui/material/Box";
import { useTimer } from "react-timer-hook";
import { useEffect, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { $axios } from "@/Providers/axios";
import { LoadingButton } from "@mui/lab";
import { getCookies, setCookie, deleteCookie, getCookie } from "cookies-next";

import { useSnackbar } from "notistack";
import { LoginResult, LoginResultData } from "@/app/types/loginResult";

import { useAppDispatch } from "@/redux/hooks";
import {login, setReward, toggleDialog} from "@/redux/features/user/user.slice";

type Props = {
  phoneNumber: string;
  onSubmit?: ({ winner }: { winner: number }) => void;
  onBack?: () => void;
};
export default function SpinOTPCode(props: Props) {
  const { enqueueSnackbar } = useSnackbar();
  const { seconds, minutes, isRunning, restart } = useTimer({
    expiryTimestamp: new Date(),
    autoStart: false,
    onExpire: () => console.warn("onExpire called"),
  });
  const dispatch = useAppDispatch();
  const { isPending, mutateAsync } = useMutation({
    mutationKey: ["checkOtpCode"],
    mutationFn: async ({
      mobileNumber,
      otpCode,
    }: {
      mobileNumber: string;
      otpCode: number;
    }) => {
      return await $axios.post<LoginResult>("/api/login/otp_login", {
        mobileNumber: mobileNumber,
        otpCode,
      });
    },
    onError(e: any) {
      enqueueSnackbar({
        message: e.response.data.message || "خطایی رخ داد",
        variant: "error",
      });
    },
    async onSuccess({ data }, values) {
      const token = data.data.token;
      setCookie("Authorization", token, { secure: true, sameSite: "none" });

      const me = await $axios.get<LoginResult>("/api/user/me", {
        headers: {
          Authorization: token,
        },
      });
      dispatch(login({ user: me.data.data.user, token: token }));
      if (me.data.data.lastReward) {
        dispatch(setReward({ reward: me.data.data.lastReward }));
        dispatch(toggleDialog(true))
      }
    },
  });

  function addMinutes(date: Date, minutes: number) {
    date.setMinutes(date.getMinutes() + minutes);
    return date;
  }

  useEffect(() => {
    const da = new Date();
    const de = addMinutes(da, 2);
    restart(de);
  }, []);
  const theme = useTheme();

  const mdAndUp = useMediaQuery(theme.breakpoints.up("md"));
  const initData = {
    phoneNumber: props.phoneNumber,
    otp: "",
  };
  const schema = yup
    .object()
    .shape<Record<keyof typeof initData, yup.AnySchema>>({
      phoneNumber: yup.string().phoneNumber().required().label("شماره همراه"),
      otp: yup.string().number().required().label("کد تایید"),
    });
  const handleSubmit = (values: typeof initData) => {
    mutateAsync({ mobileNumber: values.phoneNumber, otpCode: +values.otp });
  };
  const handleBack = () => {
    props.onBack && props.onBack();
  };

  return (
    <Box>
      <Formik
        initialValues={initData}
        onSubmit={handleSubmit}
        validationSchema={schema}
        enableReinitialize={true}
        validateOnMount={false}
        validateOnChange={false}
      >
        {(formik) => {
          return (
            <form onSubmit={formik.handleSubmit}>
              <Field name={"otp"}>
                {({ form, meta, field }: FieldProps) => {
                  const error = Boolean(meta.error && meta.touched);
                  return (
                    <Box sx={{ display: "flex", flexDirection: "column" }}>
                      <Paper
                        variant={"elevation"}
                        elevation={0}
                        sx={{
                          p: "6px 6px",
                          display: "flex",
                          alignItems: "center",
                          minWidth: { xs: "310px", sm: "400px" },
                          width: "100%",
                          borderRadius: 100,
                        }}
                      >
                        {isRunning && (
                          <>
                            <IconButton
                              onClick={handleBack}
                              size={"small"}
                              aria-label="menu"
                            >
                              <KeyboardArrowRight />
                            </IconButton>
                            <Box sx={{ minWidth: "32px" }}>
                              <Typography variant={"body2"} color={"grey"}>
                                {minutes.toString().padStart(2, "0")}:
                                {seconds.toString().padStart(2, "0")}
                              </Typography>
                            </Box>
                          </>
                        )}
                        {!isRunning && (
                          <>
                            <Button
                              onClick={handleBack}
                              size={"small"}
                              aria-label="menu"
                              sx={{ borderRadius: 1000 }}
                              startIcon={<KeyboardArrowRight />}
                            >
                              ارسال مجدد
                            </Button>
                          </>
                        )}
                        <Divider
                          sx={{ height: 28, m: 0.5 }}
                          orientation="vertical"
                        />
                        <InputBase
                          autoFocus={true}
                          {...field}
                          sx={{ mx: 1, flex: 1 }}
                          placeholder="کد تایید را وارد کنید..."
                        />
                        <LoadingButton
                          loading={isPending}
                          variant={"contained"}
                          disableElevation={true}
                          color="primary"
                          sx={{ borderRadius: 100 }}
                          aria-label="directions"
                          onClick={formik.submitForm}
                        >
                          <Typography>تایید و ادامه</Typography>
                          {mdAndUp && <KeyboardArrowLeft sx={{ ml: 1 }} />}
                        </LoadingButton>
                      </Paper>
                      <FormHelperText sx={{ color: "white" }}>
                        {error ? meta.error : " "}
                      </FormHelperText>
                    </Box>
                  );
                }}
              </Field>
            </form>
          );
        }}
      </Formik>
    </Box>
  );
}
