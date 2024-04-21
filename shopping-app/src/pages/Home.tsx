import { Container, Grid } from "@mui/material";
import CardItem from "../components/Card/CardItem";
import Navbar from "../components/Header/NavBar";

const Home = () => {
  return (
    <>
      <Navbar />
      <Container>
        <Grid container spacing={2} my={2}>
          {Array.from(new Array(5)).map((_, index) => [
            <CardItem
              img="https://img.bestdealplus.com/ae04/kf/H60f45167f9954369878c22c23050eda3A.jpg"
              altImg={`card item-${index + 1}`}
              title="Commodo ea mollit."
              description="Velit sint amet irure esse consectetur ut id excepteur veniam ea occaecat ea consequat veniam. Velit sint amet irure esse consectetur ut id excepteur veniam ea occaecat ea consequat veniam. Velit sint amet irure esse consectetur ut id excepteur veniam ea occaecat ea consequat veniam. Velit sint amet irure esse consectetur ut id excepteur veniam ea occaecat ea consequat veniam. Velit sint amet irure esse consectetur ut id excepteur veniam ea occaecat ea consequat veniam."
              key={index + 1}
            />,
          ])}
        </Grid>
      </Container>
    </>
  );
};

export default Home;
