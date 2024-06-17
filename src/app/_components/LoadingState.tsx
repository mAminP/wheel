import { Grid, Skeleton } from "@mui/material";

export default function LoadingState() {
  return (
    <Grid container={true} spacing={2}>
      {Array.from({ length: 6 }).map((_, i) => {
        return (
          <Grid key={i} item xs={12} sm={6} md={4}>
            <Skeleton
              variant={"rounded"}
              width={"100%"}
              height={150}
              animation={"wave"}
            />
          </Grid>
        );
      })}
    </Grid>
  );
}
