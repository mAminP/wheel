"use client";
import {
  AppBar,
  Button,
  MenuItem,
  Toolbar,
  Menu,
  ListItemText,
  ListItemIcon,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import React from "react";
import { AccountCircle, ContentCut, Logout } from "@mui/icons-material";
import { deleteCookie } from "cookies-next";
import { logout } from "@/redux/features/user/user.slice";

export default function SiteAppBar() {
  const { user } = useAppSelector((state) => state.user);
  const theme = useTheme();

  const smAndUp = useMediaQuery(theme.breakpoints.up("sm"));
  const mdAndUp = useMediaQuery(theme.breakpoints.up("md"));
  const dispatch = useAppDispatch();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleLogout = () => {
    deleteCookie("Authorization");
    dispatch(logout());
    handleClose()
  };
  return (
    <AppBar position="absolute" elevation={0} color={"transparent"}>
      <Toolbar sx={{ display: "flex", justifyContent: "end" }}>
        {user && (
          <>
            <Button
              variant={"contained"}
              sx={{ borderRadius: 1000 }}
              disableElevation={true}
              onClick={handleClick}
              size={'small'}
            >
              <AccountCircle fontSize={'small'} sx={{ mr: smAndUp ? 1 : 0 }} />
              {smAndUp && user.mobile_number}
            </Button>
            <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
              <MenuItem onClick={handleLogout}>
                <ListItemIcon>
                  <Logout fontSize="small" />
                </ListItemIcon>
                <ListItemText>خروج</ListItemText>
              </MenuItem>
            </Menu>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
}
