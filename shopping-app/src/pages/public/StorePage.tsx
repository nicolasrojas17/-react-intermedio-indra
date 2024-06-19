import { Box, Chip, Grid } from "@mui/material";
import Stack from "@mui/material/Stack";
import { useContext } from "react";
import CardItem from "../../components/Card/CardItem";
import CardItemSkeleton from "../../components/Card/CardItemSkeleton";
import Category from "../../components/Header/Category/Category";
import { StoreContext } from "../../hooks/StoreContextProvider";
import { Product } from "../../interfaces/Product";

const StorePage = () => {
  const storeContextData = useContext(StoreContext);
  const { isLoading, productsFiltered, category, search } = storeContextData;
  const { handleRemoveCategory, handleRemoveSearch } = storeContextData;

  if (isLoading) {
    return (
      <Grid container maxWidth={"xl"} spacing={2} my={5} justifyContent={"center"}>
        {[...Array(16)].map((_, index) => (
          <CardItemSkeleton key={index + 1} />
        ))}
      </Grid>
    );
  }

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
        {productsFiltered.map((product: Product, index) => [
          <CardItem key={product.id} product={product} altImg={`card item-${index + 1}`} />
        ])}
      </Grid>
    </>
  );
};

export default StorePage;
