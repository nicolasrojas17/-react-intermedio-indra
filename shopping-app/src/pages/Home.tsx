import { Grid } from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import CardItem from "../components/Card/CardItem";
import { Product } from "../components/App";

export type HomeProps = {
  shoppingCart: Product[];
  setShoppingCart: (value: Product[]) => void;
};

const Home = ({ setShoppingCart, shoppingCart }: HomeProps) => {
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
    fetchProducts();
  }, [fetchProducts]);

  return (
    <Grid container maxWidth={"xl"} spacing={2} my={2}>
      {isLoading
        ? Array.from(new Array(12)).map((_, index) => [<CardItem key={index + 1} isLoading={isLoading} />])
        : products.map((product: any, index) => [
            <CardItem
              key={product.id}
              id={product.id}
              img={product.image}
              altImg={`card item-${index + 1}`}
              price={product.price}
              title={product.title}
              description={product.description}
              isLoading={isLoading}
              shoppingCart={shoppingCart}
              setShoppingCart={setShoppingCart}
            />,
          ])}
    </Grid>
  );
};

export default Home;
