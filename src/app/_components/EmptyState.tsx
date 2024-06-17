import { Grid, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import { CheckBoxOutlineBlank } from "@mui/icons-material";

export default function EmptyState() {
  return (
    <Grid container={true} justifyContent={"center"}>
      <Grid item xs={12} sm={5} md={4}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <CheckBoxOutlineBlank sx={{ color: "grey.500", fontSize: 45 }} />
          <Typography color={"grey.500"} variant={"subtitle1"}>
            دیتا یافت نشد
          </Typography>
        </Box>
      </Grid>
    </Grid>
  );
}
