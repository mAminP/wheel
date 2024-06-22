"use client";

import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Grid, Grow,
  IconButton,
  LinearProgress,
  Typography,
} from "@mui/material";
import { Close } from "@mui/icons-material";
import { toggleAllRewardsDialog } from "@/redux/features/user/user.slice";
import { useQuery } from "@tanstack/react-query";
import { $axios } from "@/Providers/axios";
import RewardCard from "@/app/(main)/_components/RewardCard";

export default function AllRewardsDialog() {
  const { allRewardsDialog } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const handleClose = () => {
    dispatch(toggleAllRewardsDialog(false));
  };
  const { data, isLoading } = useQuery({
    staleTime: 1,
    enabled: allRewardsDialog,
    queryKey: ["userRewards"],
    queryFn: () => {
      return $axios.get("/api/user/rewards");
    },
    select({ data }) {
      return data.data.map((a: any) => a.reward);
    },
  });
  return (
    <>
      <Dialog
        fullWidth={true}
        maxWidth={"xs"}
        PaperProps={{
          sx: {
            borderRadius: 5,
          },
        }}
        open={allRewardsDialog}
        onClose={handleClose}
      >
        <Grow in={isLoading}>
          <LinearProgress variant={"indeterminate"} />
        </Grow>
        <DialogTitle
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Typography variant={"subtitle2"} color={"primary"}>
            جوایز شما
          </Typography>
          <IconButton color={"primary"} onClick={handleClose}>
            <Close />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <Grid spacing={2} container={true}>
            {data &&
              data.map((item: any, index: number) => {
                return (
                  <Grid item xs={12} key={index}>
                    <RewardCard item={item} />
                  </Grid>
                );
              })}
          </Grid>
        </DialogContent>
      </Dialog>
    </>
  );
}
