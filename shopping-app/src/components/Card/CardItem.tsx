import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { Box, Button, CardActions, CardContent, CardMedia, Grid, IconButton, Stack, Typography } from "@mui/material";
import Card from "@mui/material/Card";
import { useContext, useEffect, useState } from "react";
import { Product } from "../../interfaces/Product";
import { formatPrice } from "../../util/utils";
import { ProductCart } from "../App";
import CardItemSkeleton from "./CardItemSkeleton";
import CardModalInfo from "./CardModalInfo";
import CardRating from "./CardRating";
import ChipItem from "../Chip/ChipItem";
import { StoreContext } from "../../hooks/StoreContextProvider";

export type CardItemProps = {
  product: Product;
  altImg: string;
  shoppingCart?: ProductCart[];
  setShoppingCart?: (value: ProductCart[]) => void;
};

const CardItem = ({ product, altImg, shoppingCart, setShoppingCart }: CardItemProps) => {
  const storeContextData = useContext(StoreContext);
  const { isLoading } = storeContextData;

  const [productItem, setProductItem] = useState<ProductCart>();
  const [openModalInfo, setOpenModalInfo] = useState<boolean>(false);
  const [productInCart, setProductInCart] = useState<number>(0);
  const [amountProductsToAddCart, setAmountProductsToAddCart] = useState<number>(1);

  const handleOpen = () => setOpenModalInfo(true);

  const handleResetAmountProducts = () => setAmountProductsToAddCart(1);

  const handleAddToCart = () => {
    if (shoppingCart && setShoppingCart && product.id) {
      const productFind = shoppingCart.find((item) => item.product.id === product.id);
      if (!productFind) {
        setShoppingCart([...shoppingCart, { product, amount: amountProductsToAddCart }]);
        handleResetAmountProducts();
        return;
      }
      setShoppingCart(
        shoppingCart.map((item) => {
          return item.product.id === product.id
            ? { ...item, amount: productFind.amount ? productFind.amount + amountProductsToAddCart : amountProductsToAddCart }
            : item;
        })
      );
      handleResetAmountProducts();
    }
  };

  const handleRemoveProductsAmount = () => {
    if (amountProductsToAddCart === 1) return;
    setAmountProductsToAddCart(amountProductsToAddCart - 1);
  };

  const handleAddProductsAmount = () => {
    setAmountProductsToAddCart(amountProductsToAddCart + 1);
  };

  useEffect(() => {
    setProductInCart(productItem?.amount ?? 0);
  }, [productItem]);

  useEffect(() => {
    setProductItem(shoppingCart?.find((item) => item.product.id === product.id));
  }, [shoppingCart, product]);

  return (
    <>
      {isLoading ? (
        <CardItemSkeleton />
      ) : (
        <Grid item xs={12} sm={6} md={4} lg={3} px={2} mt={2} pr={0}>
          <Card
            sx={{
              height: "100%",
              display: "flex",
              flexDirection: "column",
              border: 1,
              borderColor: (productItem?.amount ?? 0) > 0 ? "success.main" : "transparent",
              ":hover": { boxShadow: 6 },
            }}
          >
            {productInCart > 0 && (
              <Stack direction="row" m={2} position={"absolute"}>
                <ChipItem text={`${productInCart} in cart`} color="success" />
              </Stack>
            )}

            <CardMedia
              height={200}
              width={"100%"}
              component={"img"}
              image={product.image}
              alt={altImg}
              loading="lazy"
              onClick={handleOpen}
              sx={{ cursor: "pointer" }}
            />
            <CardContent sx={{ flexGrow: 1, paddingBottom: 0 }}>
              <Typography
                gutterBottom
                variant="h5"
                component="div"
                display={"-webkit-box"}
                overflow={"hidden"}
                onClick={handleOpen}
                sx={{ WebkitLineClamp: 1, WebkitBoxOrient: "vertical" }}
              >
                {product.title}
              </Typography>
            </CardContent>

            <Box display={"flex"} justifyContent={"space-between"} alignItems={"center"} py={2}>
              <Box>
                {product.discount > 0 ? (
                  <>
                    <Box display={"flex"} alignItems={"center"}>
                      <Typography variant="subtitle1" pl={2} pr={1} color={"error"}>{`-${product.discount}%`}</Typography>
                      <Typography variant="h6">{`$ ${formatPrice(product.priceDiscount)}`}</Typography>
                    </Box>
                    <Typography variant="body2" px={2} sx={{ textDecoration: "line-through" }}>{`$ ${formatPrice(
                      product.price
                    )}`}</Typography>
                  </>
                ) : (
                  <Typography variant="h6" px={2}>{`$ ${formatPrice(product.priceDiscount)}`}</Typography>
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

            <Box display={"flex"} justifyContent={"space-between"} alignItems={"center"}>
              <CardRating rating={product.rating.rate} reviews={product.rating.count} />
              <CardActions sx={{ display: "flex", justifyContent: "space-between" }}>
                <CardModalInfo
                  product={product}
                  altImg={altImg}
                  handleAddToCart={handleAddToCart}
                  handleAddProductsAmount={handleAddProductsAmount}
                  handleRemoveProductsAmount={handleRemoveProductsAmount}
                  amountProductsToAddCart={amountProductsToAddCart}
                  productInCart={productInCart}
                  openModalInfo={openModalInfo}
                  setOpenModalInfo={setOpenModalInfo}
                />
              </CardActions>
            </Box>
            <Button onClick={handleAddToCart}>Add to cart</Button>
          </Card>
        </Grid>
      )}
    </>
  );
};

export default CardItem;
