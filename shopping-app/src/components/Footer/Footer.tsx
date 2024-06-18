import { Box, Container, Grid, Typography } from "@mui/material";
import { FC, ReactElement } from "react";

export const Footer: FC = (): ReactElement => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        width: "100%",
        height: "100px",
        backgroundColor: "primary.main",
        opacity: "0.8",
        paddingTop: "1rem",
        paddingBottom: "1rem",
        position: "absolute",
        bottom: 0,
      }}
    >
      <Container maxWidth="lg">
        <Grid container direction="column" alignItems="center">
          <Grid item xs={12}>
            <Typography color="white" variant="h5">
              React Starter App - Fake Store
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography color="white" variant="subtitle1">
              {`${new Date().getFullYear()} | React | Material UI | React Router`}
            </Typography>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Footer;
