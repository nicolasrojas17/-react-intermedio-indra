import { Box, Chip, Grid, Typography } from "@mui/material";
import { ProductCart } from "../components/App";
import CardItem from "../components/Card/CardItem";
import { Product } from "../interfaces/Product";
import Category from "../components/Header/Category/Category";
import Stack from "@mui/material/Stack";

export type StorePageProps = {
  shoppingCart: ProductCart[];
  products: Product[];
  isLoading: boolean;
  categories: string[];
  category: string;
  search: string;
  setShoppingCart: (value: ProductCart[]) => void;
  setCategory: (value: string) => void;
  handleRemoveCategory: () => void;
  handleRemoveSearch: () => void;
};

const StorePage = (props: StorePageProps) => {
  const { shoppingCart, isLoading, products, categories, category, search } = props;
  const { setShoppingCart, setCategory, handleRemoveCategory, handleRemoveSearch } = props;

  return (
    <>
      <Box
        display={"flex"}
        justifyContent={"end"}
        flexDirection={{ xs: "column-reverse", md: "row" }}
        alignItems={"center"}
        width={"100%"}
        mr={3}
        mt={3}
      >
        <Stack direction="row" flexWrap={"wrap"} justifyContent={"center"} spacing={1}>
          {search && <Chip label={`Search: ${search}`} variant="outlined" onDelete={handleRemoveSearch} />}
          {category && <Chip label={`Category: ${category}`} variant="outlined" onDelete={handleRemoveCategory} />}
        </Stack>
        <Category categories={categories} category={category} setCategory={setCategory} />
      </Box>

      <Grid container maxWidth={"xl"} spacing={2} mb={5} justifyContent={"center"}>
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
        {products.length === 0 && (
          <Typography variant="h5" component="h5">
            No products
          </Typography>
        )}
      </Grid>
    </>
  );
};

export default StorePage;
