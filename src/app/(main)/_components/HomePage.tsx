"use client";

import {
  Button,
  Card,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  IconButton,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import Well from "@/app/(main)/_components/Well";
import { useState } from "react";
import Box from "@mui/material/Box";
import SpinAction from "@/app/(main)/_components/SpinAction";
import Image from "next/image";
import { Close, ContentCopy } from "@mui/icons-material";
// @ts-ignore
import { CopyToClipboard } from "react-copy-to-clipboard";
export default function HomePage() {
  const [winnerDialog, setWinnerDialog] = useState<boolean>(false);
  const theme = useTheme();
  const lgAndUp = useMediaQuery(theme.breakpoints.up("lg"));
  const [mustSpin, setMustSpin] = useState(false);
  const [copied, setCopied] = useState(false);
  const [prizeNumber, setPrizeNumber] = useState(0);
  const code = "aV2vW";
  const handleSpinClick = ({ winner }: { winner: number }) => {
    if (!mustSpin) {
      setPrizeNumber(winner);
      setMustSpin(true);
    }
  };
  const handleSpinStop = () => {
    setTimeout(() => {
      setMustSpin(false);
      setWinnerDialog(true);
    }, 500);
  };
  const handleClose = () => {
    setWinnerDialog(false);
  };
  return (
    <>
      <Dialog
        fullWidth={true}
        maxWidth={"xs"}
        open={winnerDialog}
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
            display={"flex"}
            alignItems={"center"}
            justifyContent={"center"}
          >
            <Typography variant={"h3"}>تبریک</Typography>
          </Grid>
          <Grid item={true} xs={12} display={"flex"} sx={{ mx: 3 }}>
            <Typography variant={"body1"}>شما برنده این شدید....</Typography>
          </Grid>
        </Grid>
        <DialogContent>
          <CopyToClipboard text={code} onCopy={() => setCopied(true)}>
            <Card
              sx={{ p: 1, borderRadius: 2000, backgroundColor: "success.200" }}
              elevation={0}
            >
              <Stack
                direction={"row"}
                alignItems={"center"}
                justifyContent={"space-between"}
              >
                <Typography
                  fontWeight={"100"}
                  fontSize={"larger"}
                  textAlign={"center"}
                  variant={"body2"}
                  width={"100%"}
                >
                  {code}
                </Typography>

                {copied ? (
                  <Typography width={"60px"} variant={"body2"} noWrap={true}>
                    کپی شد
                  </Typography>
                ) : (
                  <Button
                    startIcon={<ContentCopy />}
                    color={"success"}
                    sx={{
                      borderRadius: 2000,
                      px: 2,
                      backgroundColor: "success.100",
                    }}
                    style={{ whiteSpace: "nowrap" }}
                  >
                    کپی کد
                  </Button>
                )}
              </Stack>
            </Card>
          </CopyToClipboard>
        </DialogContent>
      </Dialog>
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
            {lgAndUp && <SpinAction onSubmit={handleSpinClick} />}
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
                mustSpin={mustSpin}
                prizeNumber={prizeNumber}
                onStop={handleSpinStop}
              />
            </Box>
            {!lgAndUp && (
              <SpinAction
                onSubmit={({ winner }) => {
                  handleSpinClick({ winner });
                }}
              />
            )}
          </Stack>
        </Grid>
      </Grid>
    </>
  );
}
