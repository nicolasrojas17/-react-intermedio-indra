import { Grid } from "@mui/material";
import { ProductCart } from "../components/App";
import CardItem from "../components/Card/CardItem";
import { Product } from "../interfaces/Product";

export type HomeProps = {
  shoppingCart: ProductCart[];
  setShoppingCart: (value: ProductCart[]) => void;
  products: Product[];
  isLoading: boolean;
};

const Home = ({ setShoppingCart, shoppingCart, isLoading, products }: HomeProps) => {
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
