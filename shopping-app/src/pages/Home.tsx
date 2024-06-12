import { Box, Grid } from "@mui/material";
import { ProductCart } from "../components/App";
import CardItem from "../components/Card/CardItem";
import { Product } from "../interfaces/Product";
import Category from "../components/Header/Category/Category";

export type HomeProps = {
  shoppingCart: ProductCart[];
  setShoppingCart: (value: ProductCart[]) => void;
  products: Product[];
  isLoading: boolean;
  categories: string[];
  category: string;
  setCategory: (value: string) => void;
};

const Home = ({ setShoppingCart, shoppingCart, isLoading, products, categories, category, setCategory }: HomeProps) => {
  return (
    <>
      <Box display={"flex"} justifyContent={"end"} mr={3} mt={3}>
        <Category categories={categories} category={category} setCategory={setCategory} />
      </Box>

      <Grid container maxWidth={"xl"} spacing={2} mb={5}>
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
    </>
  );
};

export default Home;
