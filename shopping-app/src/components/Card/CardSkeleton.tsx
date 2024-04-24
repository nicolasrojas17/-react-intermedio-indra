import { CardContent, Grid, Skeleton, Stack } from "@mui/material";
import Card from "@mui/material/Card";

const CardSkeleton = () => {
  return (
    <Grid item xs={12} sm={6} md={4} lg={3}>
      <Card>
        <Stack direction="row" m={2}>
          <Skeleton variant="rounded" width={100} />
        </Stack>
        <Skeleton variant="rectangular" width={"100%"} height={200} />
        <CardContent>
          <Skeleton variant="text" width={"100%"} height={20} />
          <Skeleton variant="text" width={"100%"} height={20} />
          <Skeleton variant="text" width={"100%"} height={20} />
          <Skeleton variant="text" width={"80%"} height={20} />
          <Skeleton variant="text" width={"30%"} height={20} sx={{ marginTop: 2 }} />
          <Skeleton variant="text" width={"40%"} height={25} />
        </CardContent>
      </Card>
    </Grid>
  );
};

export default CardSkeleton;
