"use client";

import {
  Button,
  Card,
  Divider,
  FormHelperText,
  IconButton,
  InputBase,
  Paper,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { Field, FieldProps, Form, Formik } from "formik";
import { KeyboardArrowLeft } from "@mui/icons-material";
import { yup } from "@/lib/yup";
import Box from "@mui/material/Box";
import { useMutation } from "@tanstack/react-query";
import { $axios } from "@/Providers/axios";
import { LoadingButton } from "@mui/lab";
import { useSnackbar } from "notistack";

type Props = {
  phoneNumber?: string | null;
  onSubmit?: (phoneNumber: string) => void;
};
export default function SpinSendCode(props: Props) {
  const { enqueueSnackbar } = useSnackbar();
  const theme = useTheme();
  const smAndUp = useMediaQuery(theme.breakpoints.up("sm"));
  const mdAndUp = useMediaQuery(theme.breakpoints.up("md"));
  const { isPending, mutateAsync } = useMutation({
    mutationKey: ["sendOtpCode"],
    mutationFn: ({ mobileNumber }: { mobileNumber: string }) => {
      return $axios.post("/api/login/otp", { mobileNumber: mobileNumber });
    },
    onError(e: any) {
      enqueueSnackbar({ message: e.response.data.message, variant: "error" });
    },
    onSuccess({ data }, values) {
      enqueueSnackbar({ message: data.message, variant: "success" });

      props.onSubmit && props.onSubmit(values.mobileNumber);
    },
  });


  const initData = {
    phoneNumber: props.phoneNumber || "",
  };
  const schema = yup
    .object()
    .shape<Record<keyof typeof initData, yup.AnySchema>>({
      phoneNumber: yup.string().phoneNumber().required().label("شماره همراه"),
    });
  const onSubmit = (values: typeof initData) => {
    mutateAsync({ mobileNumber: values.phoneNumber });
  };

  return (
    <Formik
      initialValues={initData}
      onSubmit={onSubmit}
      validationSchema={schema}
      enableReinitialize={true}
      validateOnChange={false}
      validateOnMount={false}
    >
      {(formik) => {
        const error = Boolean(
          formik.errors.phoneNumber && formik.touched.phoneNumber,
        );

        return (
          <Form
            onSubmit={(e) => {
              e.preventDefault();
              formik.handleSubmit();
            }}
          >
            <Box>
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
                <Field name={"phoneNumber"}>
                  {({ form, meta, field }: FieldProps) => {
                    return (
                      <InputBase
                        {...field}
                        autoFocus={true}
                        sx={{ mx: 1, flex: 1 }}
                        placeholder="شماره همراه خود را وارد کنید..."
                      />
                    );
                  }}
                </Field>
                <LoadingButton
                  variant={"contained"}
                  disableElevation={true}
                  color="primary"
                  sx={{ borderRadius: 100 }}
                  type={"submit"}
                  loading={isPending}
                >
                  <Typography>
                    {smAndUp && "گردونه رو "}
                    بچرخون
                  </Typography>
                  {mdAndUp && <KeyboardArrowLeft sx={{ ml: 1 }} />}
                </LoadingButton>
              </Paper>
              <FormHelperText sx={{ color: "white" }}>
                {error ? formik.errors.phoneNumber : " "}
              </FormHelperText>
            </Box>
          </Form>
        );
      }}
    </Formik>
  );
}
