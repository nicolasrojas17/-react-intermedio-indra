import { Grid } from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import CardItem from "../components/Card/CardItem";
import { ProductCart } from "../components/App";
import { generateDiscount, transformPrice } from "../util/utils";
import { Product } from "../interfaces/Product";

export type HomeProps = {
  shoppingCart: ProductCart[];
  setShoppingCart: (value: ProductCart[]) => void;
};

const Home = ({ setShoppingCart, shoppingCart }: HomeProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [products, setProducts] = useState<Product[]>([]);

  const fetchProducts = useCallback(async () => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((json) =>
        json.map((product: any) => {
          const priceCol = transformPrice(product.price);
          const discount = generateDiscount(priceCol);
          const priceWithDiscount = discount > 0 ? priceCol * (discount / 100) : priceCol;
          return { ...product, discount, price: priceCol, priceDiscount: priceWithDiscount };
        })
      )
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
        ? Array.from(new Array(12)).map((_, index) => [
            <CardItem
              key={index + 1}
              isLoading={isLoading}
              product={{} as Product}
              altImg={`card item-${index + 1}`}
              shoppingCart={shoppingCart}
              setShoppingCart={setShoppingCart}
            />,
          ])
        : products.map((product: Product, index) => [
            <CardItem
              key={product.id}
              product={product}
              altImg={`card item-${index + 1}`}
              isLoading={isLoading}
              shoppingCart={shoppingCart}
              setShoppingCart={setShoppingCart}
            />,
          ])}
    </Grid>
  );
};

export default Home;
