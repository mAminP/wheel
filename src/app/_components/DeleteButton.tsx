"use client";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Popover,
  Typography,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { Delete } from "@mui/icons-material";
import React, { useState } from "react";
import { ButtonProps } from "@mui/material/Button/Button";

type Props = {
  onSubmit?: () => void;
  isLoading?: boolean;
  // slot?: React.ReactNode | null;
  buttonProps?: ButtonProps;
};
export default function DeleteButton({
  onSubmit,
  isLoading,
  buttonProps,
}: Props) {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const handleSubmit = () => {
    onSubmit && onSubmit();
  };
  return (
    <>
      <Button
        aria-describedby={id}
        color={"error"}
        variant="contained"
        disableElevation={true}
        onClick={handleClick}
        startIcon={<Delete />}
        {...buttonProps}
      >
        حذف
      </Button>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        <Card elevation={0} title={"آیا مطمئن هستید؟"}>
          <CardContent>آیا از حذف این مورد اطمیان دارید ؟</CardContent>
          <CardActions
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "end",
            }}
          >
            <Button onClick={handleClose}>انصراف</Button>
            <LoadingButton
              loading={isLoading}
              onClick={handleSubmit}
              disableElevation={true}
              autoFocus
              variant="contained"
              color={"error"}
            >
              حذف
            </LoadingButton>
          </CardActions>
        </Card>
      </Popover>
    </>
  );
}
