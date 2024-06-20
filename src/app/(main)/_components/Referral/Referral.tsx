"use client";

import { LoadingButton } from "@mui/lab";
import {
  alpha,
  Dialog, FormControl, FormHelperText,
  Grid,
  IconButton,
  InputBase, InputLabel,
  styled,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import { Close, ContentCopy, KeyboardArrowLeft } from "@mui/icons-material";
import { useState } from "react";
import { yup } from "@/lib/yup";
import { Field, FieldProps, Form, Formik } from "formik";
import { useAppSelector } from "@/redux/hooks";
import { useSnackbar } from "notistack";
import { useMutation } from "@tanstack/react-query";
import { $axios } from "@/Providers/axios";
import Box from "@mui/material/Box";

const BootstrapInput = styled(InputBase)(({ theme }) => ({
  "label":{
    // marginLeft: theme.spacing(3),
  },
  "label + &": {
    marginTop: theme.spacing(2.5),
  },
  "& .MuiInputBase-input": {
    borderRadius: 400,
    position: "relative",
    backgroundColor: theme.palette.mode === "light" ? "#F3F6F9" : "#1A2027",
    border: "1px solid",
    borderColor: theme.palette.mode === "light" ? "#E0E3E7" : "#2D3843",
    fontSize: 16,
    width: "100%",
    padding: "10px 12px",
    transition: theme.transitions.create([
      "border-color",
      "background-color",
      "box-shadow",
    ]),
    "&:focus": {
      boxShadow: `${alpha(theme.palette.primary.main, 0.25)} 0 0 0 0.2rem`,
      borderColor: theme.palette.primary.main,
    },
  },
}));

export default function Referral() {
  const { user } = useAppSelector((a) => a.user);
  const [dialog, setDialog] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const init = {
    referrerName: user?.name || "",
    invitedName: "",
    invitedNumber: "",
  };
  const { isPending, mutateAsync } = useMutation({
    mutationKey: ["sendOtpCode"],
    mutationFn: (values: typeof init) => {
      return $axios.post("/api/user/invite", { ...values });
    },
    onError(e: any) {
      enqueueSnackbar({
        message: e.response.data.message || "متاسفانه خطایی رخ داد",
        variant: "error",
      });
    },
    onSuccess({ data }, values) {
      enqueueSnackbar({ message: data.message, variant: "success" });
      setDialog(false);
    },
  });
  const handleClose = () => {
    setDialog(false);
  };
  const handleOpen = () => {
    setDialog(true);
  };

  const schema = yup.object().shape<Record<keyof typeof init, yup.AnySchema>>({
    invitedNumber: yup
      .string()
      .phoneNumber()
      .required()
      .label("شماره همراه دوستتان"),
    invitedName: yup.string().required().label("نام دوستتان"),
    referrerName: yup.string().required().label("نام"),
  });
  const onSubmit = (values: typeof init) => {
    mutateAsync(values);
  };

  return (
    <>
      <LoadingButton
        variant={"contained"}
        disableElevation={true}
        onClick={handleOpen}
        color="warning"
        loading={isPending}
        sx={{ borderRadius: 100 }}
      >
        دعوت از دوستان
      </LoadingButton>

      <Dialog
        fullWidth={true}
        maxWidth={"xs"}
        PaperProps={{
          sx: {
            borderRadius: 5,
          },
        }}
        open={dialog}
        onClose={handleClose}
      >
        <Grid container={true} spacing={2}>
          <Grid
            item={true}
            xs={12}
            display={"flex"}
            alignItems={"center"}
            justifyContent={"end"}
          >
            <IconButton color={"primary"} onClick={handleClose}>
              <Close />
            </IconButton>
          </Grid>

          <Grid
            item={true}
            xs={12}
            mt={-3}
            display={"flex"}
            alignItems={"center"}
            justifyContent={"center"}
          >
            <Typography variant={"h3"} color={"primary"}>
              دعوت دوستان
            </Typography>
          </Grid>
          <Grid
            item={true}
            xs={12}
            display={"flex"}
            sx={{ mx: 3 }}
            textAlign={"center"}
          >
            <Typography variant={"body2"} textAlign={"center"}>
              دوستات رو به بازی دعوت کن
              <br></br>
              تا هم خودت شانس جدید هدیه بگیری و هم به دوستانت شانس برنده شدن
              جوایز گردونه دنتیلایت رو هدیه بدی
            </Typography>
          </Grid>
          <Grid xs={12} item sx={{ m: 3 }}>
            <Formik
              initialValues={init}
              onSubmit={onSubmit}
              validationSchema={schema}
              enableReinitialize={true}
              validateOnChange={false}
              validateOnMount={false}
            >
              {(formik) => {
                return (
                  <Form
                    onSubmit={(e) => {
                      e.preventDefault();
                      formik.handleSubmit();
                    }}
                  >
                    <Grid container={true}>
                      <Grid item xs={12}>
                        <Field name={"referrerName"}>
                          {({ form, meta, field }: FieldProps) => {
                            const error = Boolean(meta.error && meta.touched);
                            return (
                              <FormControl variant="standard" fullWidth={true}>
                                <InputLabel shrink htmlFor="bootstrap-input">
                                  نام شما
                                </InputLabel>
                                <BootstrapInput   {...field} error={error} />
                                <FormHelperText error={error}>{error ? meta.error :" "}</FormHelperText>
                              </FormControl>
                            );
                          }}
                        </Field>
                      </Grid>
                      <Grid item xs={12}>
                        <Field name={"invitedName"}>
                          {({ form, meta, field }: FieldProps) => {
                            const error = Boolean(meta.error && meta.touched);
                            return (
                                <FormControl variant="standard" fullWidth={true}>
                                  <InputLabel shrink htmlFor="bootstrap-input">
                                    نام دوستتان
                                  </InputLabel>
                                  <BootstrapInput   {...field} error={error} />
                                  <FormHelperText error={error}>{error ? meta.error :" "}</FormHelperText>
                                </FormControl>
                            );
                          }}
                        </Field>
                      </Grid>
                      <Grid item xs={12}>
                        <Field name={"invitedNumber"}>
                          {({ form, meta, field }: FieldProps) => {
                            const error = Boolean(meta.error && meta.touched);
                            return (
                                <FormControl variant="standard" fullWidth={true}>
                                  <InputLabel shrink htmlFor="bootstrap-input">
                                    شماره همراه دوستتان
                                  </InputLabel>
                                  <BootstrapInput   {...field} error={error} />
                                  <FormHelperText error={error}>{error ? meta.error :" "}</FormHelperText>
                                </FormControl>
                            );
                          }}
                        </Field>
                      </Grid>
                      <Grid item xs={12}>
                        {" "}
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          <LoadingButton
                            variant={"contained"}
                            disableElevation={true}
                            color="primary"
                            loading={isPending}
                            type={"submit"}
                            sx={{ borderRadius: 100 }}
                          >
                            دعوت
                          </LoadingButton>
                        </Box>
                      </Grid>
                    </Grid>
                  </Form>
                );
              }}
            </Formik>
          </Grid>
        </Grid>
      </Dialog>
    </>
  );
}
