"use client";
import {
  Alert,
  Button,
  Card,
  CardActions,
  CardContent,
  FormHelperText,
  Grid,
  Grow,
  LinearProgress,
  Link,
  TextField,
  Typography,
} from "@mui/material";
import { Field, FieldProps, Formik } from "formik";
import { useMutation } from "@tanstack/react-query";
import { yup } from "@/lib/yup";
import { LoadingButton } from "@mui/lab";
import { useRef, useState } from "react";
import {
  LoginReqMutationVariables,
  LoginUserInput,
} from "@/__generated__/graphql";
import { useSnackbar } from "notistack";
import getError from "@/lib/getError";
import { useTimer } from "react-timer-hook";
import Box from "@mui/material/Box";
import ReCAPTCHA from "react-google-recaptcha";
import NextLink from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { webEnv } from "@/environment/environment";
import { useAppDispatch } from "@/redux/hooks";
import axios from "axios";
import LoginResponse from "@/app/api/auth/login/types/LoginResponse";
import { MuiOtpInput } from "mui-one-time-password-input";
import { signIn } from "next-auth/react";

export default function LoginForm() {
  const { enqueueSnackbar } = useSnackbar();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl");
  const router = useRouter();
  const [sent, setSent] = useState(false);
  const [firstComplete, setFirstComplete] = useState(true);

  const { seconds, minutes, isRunning, restart } = useTimer({
    expiryTimestamp: new Date(),
    autoStart: false,
    onExpire: () => console.warn("onExpire called"),
  });

  const recaptcha = useRef<ReCAPTCHA | null>(null);
  const { isPending, mutateAsync } = useMutation({
    mutationKey: ["loginMutation"],
    mutationFn: async ({
      values,
      token,
      resend,
    }: {
      values: LoginReqMutationVariables;
      token: string;
      resend?: boolean;
    }) => {
      const reqVars: LoginReqMutationVariables = resend
        ? {
            input: {
              phoneNumber: values.input.phoneNumber,
              recaptcha: token,
            },
          }
        : {
            input: {
              phoneNumber: values.input.phoneNumber,
              code: values.input.code,
              recaptcha: token,
            },
          };
      return await axios.post<LoginResponse>("/api/auth/login", reqVars);
    },
    async onSuccess({ data }) {
      if (data && data.sent === true) {
        setSent(true);
        restart(data.deadline as unknown as Date, true);
      } else if (data && data.done === true) {
        await signIn("credentials", {
          ...data,
          redirect: false,
        });
        router.push(callbackUrl || "/", { scroll: true });
      }
    },
    onError(error) {
      enqueueSnackbar({ message: getError(error), variant: "error" });
    },
    onSettled() {
      recaptcha?.current?.reset();
    },
  });
  const schema = yup
    .object()
    .shape<Record<keyof LoginReqMutationVariables, yup.AnySchema>>({
      input: yup.object().shape<Record<keyof LoginUserInput, yup.AnySchema>>({
        phoneNumber: yup
          .string()
          .phoneNumber()
          .required()
          .label("شماره موبایل"),
        code: yup.string().when([], {
          is: () => sent,
          then: () => yup.string().number().required().label("کد تایید"),
          otherwise: () => yup.string().number().optional().nullable(),
        }),
        recaptcha: yup.string().nullable().optional(),
      }),
    });

  const MutationLoginInput: LoginReqMutationVariables = {
    input: {
      phoneNumber: "",
      code: null,
      recaptcha: "",
    },
  };
  return (
    <Formik
      initialValues={MutationLoginInput}
      enableReinitialize={true}
      validationSchema={schema}
      onSubmit={async (values) => {
        let token = await recaptcha?.current?.executeAsync();
        if (token) {
          await mutateAsync({ values, token, resend: false });
        }
      }}
    >
      {(formik) => {
        return (
          <form onSubmit={formik.handleSubmit}>
            <ReCAPTCHA
              ref={recaptcha}
              size={"invisible"}
              sitekey={webEnv.recaptcha.google}
              onSuspend={(event) => {
                console.log({ event });
              }}
            />
            <Card>
              <Grow in={!Boolean(recaptcha.current)}>
                <LinearProgress variant={"indeterminate"} />
              </Grow>
              <CardContent sx={{ display: "flex", justifyContent: "center" }}>
                <Link
                  component={NextLink}
                  href={"/"}
                  color={"inherit"}
                  underline={"hover"}
                >
                  <Typography variant={"h3"}>NUXINO</Typography>
                </Link>
              </CardContent>
              <CardContent>
                <Typography variant={"body1"}>ورود / ثبت نام</Typography>
              </CardContent>
              <CardContent>
                <Field name={"input.phoneNumber"}>
                  {({ field, meta }: FieldProps) => {
                    const error = Boolean(meta.error && meta.touched);
                    return (
                      <>
                        <TextField
                          {...field}
                          error={error}
                          disabled={sent}
                          margin={!sent ? "normal" : "dense"}
                          helperText={error ? meta.error : " "}
                          variant={sent ? "standard" : "outlined"}
                          fullWidth={true}
                          dir={"ltr"}
                          label={"شماره موبایل"}
                        />
                      </>
                    );
                  }}
                </Field>

                {sent && (
                  <>
                    <Grid
                      container={true}
                      display={"flex"}
                      alignItems={"center"}
                      justifyContent={"space-between"}
                    >
                      <Grid item>
                        <Alert color={"success"} severity="success">
                          کد تایید ارسال شد.
                        </Alert>
                      </Grid>
                      <Grid item>
                        <Button
                          color={"warning"}
                          onClick={async () => {
                            setSent(false);
                            await formik.setFieldValue(
                              "input.code",
                              null,
                              true,
                            );
                          }}
                          disableElevation={true}
                        >
                          ویرایش شماره
                        </Button>
                      </Grid>
                    </Grid>
                  </>
                )}
                {sent && (
                  <>
                    <Field name={"input.code"}>
                      {({ field, meta }: FieldProps) => {
                        const error = Boolean(meta.error && meta.touched);
                        return (
                          <>
                            <Typography
                              color={error ? "error" : "inherit"}
                              variant={"caption"}
                            >
                              کد تایید
                            </Typography>
                            <Box dir={"ltr"}>
                              <MuiOtpInput
                                onComplete={() => {
                                  if (firstComplete) {
                                    formik.submitForm();
                                  }
                                  setFirstComplete(false);
                                }}
                                length={6}
                                gap={1}
                                autoFocus={true}
                                margin={"normal"}
                                TextFieldsProps={{ error }}
                                {...field}
                                onChange={(value) => {
                                  formik.setFieldValue("input.code", value);
                                }}
                                value={field.value || ""}
                              />
                            </Box>
                            <FormHelperText error={error}>
                              {error ? meta.error : " "}
                            </FormHelperText>
                          </>
                        );
                      }}
                    </Field>
                    <Box
                      justifyContent={"center"}
                      display={"flex"}
                      alignItems={"center"}
                    >
                      {isRunning ? (
                        <>
                          <Typography variant={"body2"}>
                            {minutes.toString().padStart(2, "0")}:
                            {seconds.toString().padStart(2, "0")}
                          </Typography>
                        </>
                      ) : (
                        <>
                          <LoadingButton
                            disableElevation={true}
                            size={"small"}
                            variant={"text"}
                            color={"info"}
                            onClick={async (e) => {
                              e.stopPropagation();
                              e.preventDefault();
                              let token =
                                await recaptcha?.current?.executeAsync();

                              if (token) {
                                await mutateAsync({
                                  values: formik.values,
                                  token,
                                  resend: true,
                                });
                              }
                            }}
                          >
                            ارسال مجدد کد تایید
                          </LoadingButton>
                        </>
                      )}
                    </Box>
                  </>
                )}
              </CardContent>
              <CardActions>
                <LoadingButton
                  loading={isPending}
                  disabled={formik.touched && !formik.isValid}
                  type={"submit"}
                  fullWidth={true}
                  variant={"contained"}
                  disableElevation={true}
                >
                  ورود
                </LoadingButton>
              </CardActions>
            </Card>
          </form>
        );
      }}
    </Formik>
  );
}
