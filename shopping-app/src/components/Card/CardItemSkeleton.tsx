import { Card, CardContent, Grid, Skeleton } from "@mui/material";

const CardItemSkeleton = () => {
  return (
    <Grid item xs={12} sm={6} md={4} lg={3}>
      <Card
        sx={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
        }}
      >
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

export default CardItemSkeleton;
