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
import { KeyboardArrowLeft } from "@mui/icons-material";
import { yup } from "@/lib/yup";
import Box from "@mui/material/Box";
type Props = {
  phoneNumber?: string | null;
  onSubmit?: (phoneNumber: string) => void;
};
export default function SpinSendCode(props: Props) {
  const theme = useTheme();

  const smAndUp = useMediaQuery(theme.breakpoints.up("sm"));
  const smAndDown = useMediaQuery(theme.breakpoints.down("sm"));
  const mdAndUp = useMediaQuery(theme.breakpoints.up("md"));
  const mdAndDown = useMediaQuery(theme.breakpoints.down("md"));
  const lgAndUp = useMediaQuery(theme.breakpoints.up("lg"));
  const lgAndDown = useMediaQuery(theme.breakpoints.down("lg"));
  const xlAndUp = useMediaQuery(theme.breakpoints.up("xl"));
  const xlAndDown = useMediaQuery(theme.breakpoints.down("xl"));
  const initData = {
    phoneNumber: props.phoneNumber || "",
  };
  const schema = yup
    .object()
    .shape<Record<keyof typeof initData, yup.AnySchema>>({
      phoneNumber: yup.string().phoneNumber().required().label("شماره همراه"),
    });
  const handleSubmit = (values: typeof initData) => {
    console.log({ values });
    props.onSubmit && props.onSubmit(values.phoneNumber);
  };

  return (
    <Formik
      initialValues={initData}
      onSubmit={handleSubmit}
      validationSchema={schema}
      enableReinitialize={true}
      validateOnChange={false}
      validateOnMount={false}
    >
      {(formik) => {
        return (
          <form onSubmit={formik.handleSubmit}>
            <Field name={"phoneNumber"}>
              {({ form, meta, field }: FieldProps) => {
                const error = Boolean(meta.error && meta.touched);
                return (
                  <Box>
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
                      <InputBase
                        {...field}
                        autoFocus={true}
                        sx={{ mx: 1, flex: 1 }}
                        placeholder="شماره همراه خود را وارد کنید..."
                      />
                      <Button
                        variant={"contained"}
                        disableElevation={true}
                        color="primary"
                        sx={{ borderRadius: 100 }}
                        aria-label="directions"
                        onClick={formik.submitForm}
                      >
                        <Typography>
                          {smAndUp && "گردونه رو "}
                          بچرخون
                        </Typography>
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
  );
}
