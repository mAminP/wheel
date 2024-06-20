"use client";

import {
  Button,
  Card,
  Dialog,
  DialogContent,
  Grid,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import { Close, ContentCopy } from "@mui/icons-material";
import { useEffect, useState } from "react";
// @ts-ignore
import { CopyToClipboard } from "react-copy-to-clipboard";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { toggleDialog } from "@/redux/features/user/user.slice";
import Box from "@mui/material/Box";
import Image from "next/image";

export default function WinDialog() {
  const { dialog, reward } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (dialog) {
      setCopied(false);
    }
  }, [dialog]);
  const handleClose = () => {
    dispatch(toggleDialog(false));
  };

  if (!reward) {
    return <></>;
  }
  return (
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
          display={"flex"}
          alignItems={"center"}
          justifyContent={"center"}
        >
          <Box
            sx={{
              position: "relative",
              borderRadius: 5,
              aspectRatio: 1,
              width: 250,
            }}
          >
            <Image
              src={"/win.jpg"}
              alt={"win"}
              fill={true}
              style={{ objectFit: "contain" }}
            />
          </Box>
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
          <Typography variant={"body1"}>
            شما برنده {reward.title} شدید
          </Typography>
        </Grid>
      </Grid>
      <DialogContent>
        <CopyToClipboard text={reward.code} onCopy={() => setCopied(true)}>
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
                {reward.code}
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
  );
}
