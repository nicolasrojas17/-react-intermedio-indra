import { Box, Container, Grid, Typography } from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Product } from "../interfaces/Product";
import { getProductById } from "../services/productService";
import { formatPrice } from "../util/utils";

const StoreDetailPage = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState<Product>();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const fetchProduct = useCallback(async () => {
    await getProductById(productId ?? "", setProduct, setIsLoading);
  }, []);

  useEffect(() => {
    fetchProduct();
  }, [fetchProduct]);

  isLoading && <div>Loading...</div>;

  return (
    <Container>
      <Grid container maxWidth={"lg"} spacing={2} mb={5} justifyContent={"center"}>
        <Grid item xs={12} lg={8} px={2} mt={5} mx={1} border={1} borderColor={"rgb(221, 221, 221)"}>
          <Box width={{ xs: "100%", md: "50%" }} ml={2}>
            <Typography variant="h5" fontWeight={"bold"} mx={1} my={3}>
              {product?.title}
            </Typography>
            <Box display={"flex"} justifyContent={"space-between"} alignItems={"center"} py={2}>
              <Box>
                {(product?.discount ?? 0) > 0 ? (
                  <>
                    <Box display={"flex"} alignItems={"center"}>
                      <Typography variant="subtitle1" pl={2} pr={1} color={"error"}>{`-${product?.discount}%`}</Typography>
                      <Typography variant="h6">{`$ ${formatPrice(product?.priceDiscount ?? 0)}`}</Typography>
                    </Box>
                    <Typography variant="body2" px={2} sx={{ textDecoration: "line-through" }}>
                      {`$ ${formatPrice(product?.price ?? 0)}`}
                    </Typography>
                  </>
                ) : (
                  <Typography variant="h6" px={2}>{`$ ${formatPrice(product?.priceDiscount ?? 0)}`}</Typography>
                )}
              </Box>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default StoreDetailPage;
