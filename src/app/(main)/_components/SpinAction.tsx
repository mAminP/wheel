"use client";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import Box from "@mui/material/Box";
import {
  Button,
  Chip,
  Paper,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { KeyboardArrowLeft } from "@mui/icons-material";
import { useSnackbar } from "notistack";
import { useMutation } from "@tanstack/react-query";
import { $axios } from "@/Providers/axios";
import {
    setReward, toggleAllRewardsDialog,
    toggleDialog,
    toggleSpin,
    updateUser,
} from "@/redux/features/user/user.slice";

export default function SpinAction() {
  const { user, spin, reward, dialog } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const theme = useTheme();
  const smAndUp = useMediaQuery(theme.breakpoints.up("sm"));
  const mdAndUp = useMediaQuery(theme.breakpoints.up("md"));

  const { isPending, mutateAsync } = useMutation({
    mutationKey: ["getasdsd"],
    mutationFn: () => {
      return $axios.get("/api/user/reward");
    },
    onError(e: any) {
      enqueueSnackbar({ message: e.response.data.message, variant: "error" });
    },
    onSuccess({ data }, values) {
      dispatch(updateUser({ user: data.data.user }));
      dispatch(setReward({ reward: data.data.reward }));
      dispatch(toggleSpin(true));
    },
  });

  if (!user) return <></>;

  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <Paper
        variant={"elevation"}
        elevation={0}
        sx={{
          p: "6px 6px",
          display: "flex",
          gap: 1,
          alignItems: "center",
          minWidth: { xs: "310px", sm: "400px", md: "600px" },
          width: "100%",
          borderRadius: 100,
        }}
      >
        <Chip
          label={`تعداد شانس: ${user.remainingChance}`}
          color={"primary"}
          variant={"outlined"}
          size={"medium"}
        />
        <LoadingButton
          variant={"contained"}
          disableElevation={true}
          color="primary"
          disabled={user.remainingChance <= 0}
          fullWidth={true}
          sx={{ borderRadius: 100 }}
          onClick={() => {
            mutateAsync();
          }}
          loading={isPending || spin}
        >
          <Typography>
            {smAndUp && "گردونه رو "}
            بچرخون
          </Typography>
          {mdAndUp && <KeyboardArrowLeft sx={{ ml: 1 }} />}
        </LoadingButton>
        {reward && !spin && (
          <Button
            variant={"contained"}
            disableElevation={true}
            color="primary"
            disabled={dialog}
            sx={{ borderRadius: 100, whiteSpace: "nowrap", px: 3 }}
            onClick={() => {
              dispatch(toggleAllRewardsDialog(true));
            }}
          >
            جوایز
          </Button>
        )}
      </Paper>
    </Box>
  );
}
