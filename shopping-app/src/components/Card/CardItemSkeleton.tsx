import { Box, Card, CardContent, Grid, Skeleton } from "@mui/material";

const CardItemSkeleton = () => {
  return (
    <Grid item xs={12} sm={6} md={4} lg={3} px={2} mt={2} pr={0}>
      <Card sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
        <Skeleton variant="rectangular" width={"100%"} height={200} />
        <CardContent>
          <Skeleton variant="text" width={"100%"} height={40} />
          <Box width={"100%"} display={"flex"} justifyContent={"space-between"} alignItems={"center"} mt={2}>
            <Box width={"100%"} display={"flex"} alignItems={"center"}>
              <Skeleton variant="text" width={"25%"} height={30} />
              <Skeleton variant="text" width={"70%"} height={45} sx={{ marginLeft: "8px" }} />
            </Box>
            <Box width={"100%"} display={"flex"} justifyContent={"end"} alignItems={"center"}>
              <Skeleton variant="text" width={"25px"} height={35} />
              <Skeleton variant="text" width={"35px"} height={35} sx={{ margin: "0px 8px" }} />
              <Skeleton variant="text" width={"25px"} height={35} />
            </Box>
          </Box>
          <Skeleton variant="text" width={"80%"} height={35} sx={{margin:"auto", marginTop:"10px"}} />
        </CardContent>
        <Skeleton variant="rectangular" width={"100%"} height={30} sx={{ bottom: 0 }} />
      </Card>
    </Grid>
  );
};

export default CardItemSkeleton;
