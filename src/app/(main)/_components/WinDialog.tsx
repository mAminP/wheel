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
import { useState } from "react";
// @ts-ignore
import { CopyToClipboard } from "react-copy-to-clipboard";

export default function WinDialog() {
  const [winnerDialog, setWinnerDialog] = useState<boolean>(false);
  const [copied, setCopied] = useState(false);
  const code = "aV2vW";

  const handleClose = () => {
    setWinnerDialog(false);
  };
  return (
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
  );
}
