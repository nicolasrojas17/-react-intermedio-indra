import { Container, Grid } from "@mui/material";
import CardItem from "../components/Card/CardItem";
import Navbar from "../components/Header/NavBar";
import { useCallback, useEffect, useState } from "react";
import CardSkeleton from "../components/Card/CardSkeleton";

const Home = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [products, setProducts] = useState([]);

  const fetchProducts = useCallback(async () => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((json) => setProducts(json))
      .catch((error) => console.error(error))
      .finally(() => setIsLoading(false));
  }, []);

  useEffect(() => {
    setTimeout(() => {
      fetchProducts();
    }, 1);
  }, [fetchProducts]);

  return (
    <>
      <Navbar />
      <Container>
        <Grid container spacing={2} my={2}>
          {isLoading
            ? Array.from(new Array(12)).map((_, index) => [<CardSkeleton key={index + 1} />])
            : products.map((product: any, index) => [
                <CardItem
                  key={product.id}
                  img={product.image}
                  altImg={`card item-${index + 1}`}
                  title={product.title}
                  description={product.description}
                />,
              ])}
        </Grid>
      </Container>
    </>
  );
};

export default Home;