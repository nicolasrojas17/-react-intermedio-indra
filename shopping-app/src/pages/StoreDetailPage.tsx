import { Box, Button, CircularProgress, Container, Grid, IconButton, Stack, Typography } from "@mui/material";
import { useCallback, useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Product } from "../interfaces/Product";
import { getProductById } from "../services/productService";
import { formatPrice } from "../util/utils";
import CardRating from "../components/Card/CardRating";
import { ShoppingCartContext } from "../hooks/ShoppingCartContextProvider";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import ChipItem from "../components/Chip/ChipItem";
import { ProductCart } from "../components/App";

const StoreDetailPage = () => {
  const { productId } = useParams();

  const shoppingContextData = useContext(ShoppingCartContext);
  const { amountProductsToAddCart, shoppingCart } = shoppingContextData;
  const { handleRemoveProductsAmount, handleAddProductsAmount, handleAddToCart } = shoppingContextData;

  const [product, setProduct] = useState<Product>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [productItem, setProductItem] = useState<ProductCart>();
  const [productInCart, setProductInCart] = useState<number>(0);

  const fetchProduct = useCallback(async () => {
    await getProductById(productId ?? "", setProduct, setIsLoading);
  }, [productId]);

  useEffect(() => {
    fetchProduct();
  }, [fetchProduct]);

  useEffect(() => {
    setProductInCart(productItem?.amount ?? 0);
  }, [productItem]);

  useEffect(() => {
    setProductItem(shoppingCart?.find((item) => item.product.id === Number(productId)));
  }, [shoppingCart, productId]);

  if (isLoading) {
    return (
      <Container sx={{ marginTop: 5, textAlign: "center" }}>
        <CircularProgress />
      </Container>
    );
  }

  return (
    <Container>
      <Grid container maxWidth={"xl"} spacing={2} mb={5} justifyContent={"center"}>
        <Grid item xs={12} px={2} mt={5} mx={1} border={1} borderColor={"rgb(221, 221, 221)"}>
          <Box display={{ xs: "block", md: "flex" }} alignItems={"center"} justifyContent={"center"} my={3}>
            <Box width={{ xs: "100%", md: "50%" }} height={{ xs: "300px" }} mr={2}>
              <img
                alt={product?.title}
                src={product?.image}
                loading="lazy"
                width={"100%"}
                style={{ objectFit: "contain", height: "-webkit-fill-available" }}
              />
            </Box>
            <Box width={{ xs: "100%", md: "50%" }} ml={2} position={"relative"}>
              {productInCart > 0 && (
                <Stack direction="row" m={2} mr={5} position={"absolute"} right={0}>
                  <ChipItem text={`${productInCart} in cart`} color="success" />
                </Stack>
              )}

              <Typography variant="h5" fontWeight={"bold"} mx={1} my={3}>
                {product?.title}
              </Typography>
              <Typography variant="body1" mx={1} my={3}>
                {product?.description}
              </Typography>

              <CardRating rating={product?.rating.rate ?? 0} reviews={product?.rating.count ?? 0} />

              <Box display={"flex"} justifyContent={"space-between"} alignItems={"center"} py={2}>
                <Box>
                  {(product?.discount ?? 0) > 0 ? (
                    <>
                      <Box display={"flex"} alignItems={"center"}>
                        <Typography variant="subtitle1" pl={2} pr={1} color={"error"}>{`-${product?.discount ?? 0}%`}</Typography>
                        <Typography variant="h5" fontWeight={"bold"}>
                          {`$ ${formatPrice(product?.priceDiscount ?? 0)}`}
                        </Typography>
                      </Box>
                      <Typography variant="body2" px={2} sx={{ textDecoration: "line-through" }}>
                        {`$ ${formatPrice(product?.price ?? 0)}`}
                      </Typography>
                    </>
                  ) : (
                    <Typography variant="h5" px={2} fontWeight={"bold"}>
                      {`$ ${formatPrice(product?.priceDiscount ?? 0)}`}
                    </Typography>
                  )}
                </Box>

                <Box display={"flex"} alignItems={"center"} pr={2}>
                  <IconButton onClick={handleRemoveProductsAmount} disabled={amountProductsToAddCart <= 1}>
                    <RemoveIcon color="inherit" />
                  </IconButton>
                  <Typography variant="body1">{amountProductsToAddCart}</Typography>
                  <IconButton onClick={handleAddProductsAmount}>
                    <AddIcon color="inherit" />
                  </IconButton>
                </Box>
              </Box>

              <Button sx={{ width: "100%", my: 2 }} variant="outlined" onClick={() => handleAddToCart(product!)}>
                Add to cart
              </Button>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default StoreDetailPage;
