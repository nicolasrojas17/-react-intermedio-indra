import { Box, Chip, Grid, Typography } from "@mui/material";
import { ProductCart } from "../components/App";
import CardItem from "../components/Card/CardItem";
import { Product } from "../interfaces/Product";
import Category from "../components/Header/Category/Category";
import Stack from "@mui/material/Stack";
import { StoreContext } from "../hooks/StoreContextProvider";
import { useContext } from "react";

export type StorePageProps = {
  shoppingCart: ProductCart[];
  setShoppingCart: (value: ProductCart[]) => void;
};

const StorePage = (props: StorePageProps) => {
  const storeContextData = useContext(StoreContext);
  const { isLoading, productsFiltered, category, search } = storeContextData;
  const { handleRemoveCategory, handleRemoveSearch } = storeContextData;

  const { shoppingCart, setShoppingCart } = props;

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
        <Category />
      </Box>

      <Grid container maxWidth={"xl"} spacing={2} mb={5} justifyContent={"center"}>
        {isLoading
          ? Array.from(new Array(12)).map((_, index) => [
              <CardItem
                key={index + 1}
                product={{} as Product}
                altImg={`card item-${index + 1}`}
                shoppingCart={shoppingCart}
                setShoppingCart={setShoppingCart}
              />,
            ])
          : productsFiltered.map((product: Product, index) => [
              <CardItem
                key={product.id}
                product={product}
                altImg={`card item-${index + 1}`}
                shoppingCart={shoppingCart}
                setShoppingCart={setShoppingCart}
              />,
            ])}
        {productsFiltered.length === 0 && (
          <Typography variant="h5" component="h5">
            No products
          </Typography>
        )}
      </Grid>
    </>
  );
};

export default StorePage;
