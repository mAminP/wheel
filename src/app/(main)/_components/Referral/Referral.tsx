"use client";

// @ts-ignore
import { CopyToClipboard } from "react-copy-to-clipboard";
import { LoadingButton } from "@mui/lab";
import {
  alpha,
  Button,
  Dialog,
  Grid,
  IconButton,
  InputBase,
  styled,
  Typography,
} from "@mui/material";
import {Close, ContentCopy} from "@mui/icons-material";
import { useEffect, useState } from "react";
import { useAppSelector } from "@/redux/hooks";

const BootstrapInput = styled(InputBase)(({ theme }) => ({
  label: {
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
  const [copied, setCopied] = useState(false);
  useEffect(() => {
    if (copied) {
      setTimeout(() => {
        setCopied(false);
      }, 2000);
    }
  }, [copied]);
  const handleClose = () => {
    setDialog(false);
  };
  const handleOpen = () => {
    setDialog(true);
  };

  const text = `سلام خوبی؟ بیا تو گردونه شانس جشنواره تابستانه دنتیلایت و کلی هدیه برنده شو 🎁
از این لینک ثبت نام کن تا شانستو امتحان کنی:

${window.location.protocol}//${window.location.host}/${user?.inviteCode}
`;
  return (
    <>
      <LoadingButton
        variant={"contained"}
        disableElevation={true}
        onClick={handleOpen}
        color="warning"
        // loading={isPending}
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
          <Grid xs={12} item sx={{ m: 3 }} justifyContent={'center'} display={'flex'}>
            <CopyToClipboard text={text} onCopy={() => setCopied(true)}>
              {copied ? (
                <Button sx={{borderRadius:200,mx:'auto'}} disableElevation={true} variant={"contained"} color={'success'} startIcon={<ContentCopy />}>کپی شد</Button>
              ) : (
                <Button sx={{borderRadius:200,mx:'auto'}} disableElevation={true} variant={"contained"}>اشتراک لینک گردونه</Button>
              )}
            </CopyToClipboard>
          </Grid>
        </Grid>
      </Dialog>
    </>
  );
}
