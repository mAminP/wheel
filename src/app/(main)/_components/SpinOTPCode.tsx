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
type Props = {
  phoneNumber: string;
  onSubmit?: ({ winner }: { winner: number }) => void;
  onBack?: () => void;
};
export default function SpinOTPCode(props: Props) {
  const [ok, setOk] = useState<boolean>(false);
  const { seconds, minutes, isRunning, restart } = useTimer({
    expiryTimestamp: new Date(),
    autoStart: false,
    onExpire: () => console.warn("onExpire called"),
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
  const handleSubmit = () => {
    const newPrizeNumber = Math.floor(Math.random() * 10);
    props.onSubmit && props.onSubmit({ winner: newPrizeNumber });
    setOk(true);
  };
  const handleBack = () => {
    props.onBack && props.onBack();
  };
  let message = (
    <Card
      elevation={0}
      sx={{
        backgroundColor: "success.100",
        borderRadius: 1000,
        display: "flex",
        alignItems: "center",
        gap: 1,
        p: 0.5,
        px: 1,
        width: "max-content",
      }}
    >
      <CheckCircle color={"success"} />
      <Typography color={"success.main"} variant={"body2"}>
        پیامک ارسال شد.
      </Typography>
    </Card>
  );
  if (ok) {
    message = (
      <Card
        elevation={0}
        sx={{
          backgroundColor: "success.100",
          borderRadius: 1000,
          display: "flex",
          alignItems: "center",
          gap: 1,
          p: 0.5,
          px: 1,
          width: "max-content",
        }}
      >
        <CheckCircle color={"success"} />
        <Typography color={"success.main"} variant={"body2"}>
          با موفقیت انجام شد.
        </Typography>
      </Card>
    );
  }

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
                        component="form"
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
                        <Button
                          variant={"contained"}
                          disableElevation={true}
                          color="primary"
                          sx={{ borderRadius: 100 }}
                          aria-label="directions"
                          onClick={formik.submitForm}
                        >
                          <Typography>تایید و ادامه</Typography>
                          {mdAndUp && <KeyboardArrowLeft sx={{ ml: 1 }} />}
                        </Button>
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
      {message}
    </Box>
  );
}
