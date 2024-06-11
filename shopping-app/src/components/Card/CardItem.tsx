import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { Box, Button, CardActions, CardContent, CardMedia, Grid, IconButton, Stack, Typography } from "@mui/material";
import Card from "@mui/material/Card";
import { useEffect, useState } from "react";
import { Product } from "../../interfaces/Product";
import { formatPrice } from "../../util/utils";
import { ProductCart } from "../App";
import CardDiscount from "./CardDiscount";
import CardItemSkeleton from "./CardItemSkeleton";
import CardModalInfo from "./CardModalInfo";
import CardRating from "./CardRating";

export type CardItemProps = {
  product: Product;
  altImg: string;
  isLoading: boolean;
  shoppingCart?: ProductCart[];
  setShoppingCart?: (value: ProductCart[]) => void;
};

const CardItem = ({ product, altImg, isLoading, shoppingCart, setShoppingCart }: CardItemProps) => {
  const [productItem, setProductItem] = useState<ProductCart>();
  const [openModalInfo, setOpenModalInfo] = useState<boolean>(false);

  const handleOpen = () => setOpenModalInfo(true);

  const handleAddToCart = () => {
    if (shoppingCart && setShoppingCart && product.id) {
      const productFind = shoppingCart.find((item) => item.idProduct === product.id);
      if (!productFind) {
        setShoppingCart([...shoppingCart, { idProduct: product.id, amount: 1 }]);
        return;
      }
      setShoppingCart(
        shoppingCart.map((item) => {
          return item.idProduct === product.id ? { ...item, amount: productFind.amount ? productFind.amount + 1 : 1 } : item;
        })
      );
    }
  };

  const handleRemoveFromCart = () => {
    if (shoppingCart && setShoppingCart && product.id) {
      const productFind = shoppingCart.find((item) => item.idProduct === product.id);
      if (!productFind) {
        return;
      }
      if (productFind.amount === 1) {
        setShoppingCart(shoppingCart.filter((item) => item.idProduct !== product.id));
        return;
      }
      setShoppingCart(
        shoppingCart.map((item) => {
          return item.idProduct === product.id ? { ...item, amount: productFind.amount ? productFind.amount - 1 : 0 } : item;
        })
      );
    }
  };

  useEffect(() => {
    setProductItem(shoppingCart?.find((item) => item.idProduct === product.id));
  }, [shoppingCart, product]);

  return (
    <>
      {isLoading ? (
        <CardItemSkeleton />
      ) : (
        <Grid item xs={12} sm={6} md={4} lg={3}>
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
            {product.discount > 0 && (
              <Stack direction="row" m={2} position={"absolute"}>
                <CardDiscount discount={product.discount} color="success" />
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
                    <Typography variant="h6" px={2}>{`$ ${formatPrice(product.priceDiscount)}`}</Typography>
                    <Typography variant="body2" px={2} sx={{ textDecoration: "line-through" }}>{`$ ${formatPrice(
                      product.price
                    )}`}</Typography>
                  </>
                ) : (
                  <Typography variant="h6" px={2}>{`$ ${formatPrice(product.priceDiscount)}`}</Typography>
                )}
              </Box>
              {productItem && (
                <Box display={"flex"} alignItems={"center"} pr={2}>
                  <IconButton onClick={handleRemoveFromCart}>
                    <RemoveIcon color="inherit" />
                  </IconButton>
                  <Typography variant="body1">{productItem.amount}</Typography>
                  <IconButton onClick={handleAddToCart}>
                    <AddIcon color="inherit" />
                  </IconButton>
                </Box>
              )}
            </Box>

            <Box display={"flex"} justifyContent={"space-between"} alignItems={"center"}>
              <CardRating rating={product.rating.rate} reviews={product.rating.count} />
              <CardActions sx={{ display: "flex", justifyContent: "space-between" }}>
                <CardModalInfo
                  product={product}
                  altImg={altImg}
                  handleAddToCart={handleAddToCart}
                  handleRemoveFromCart={handleRemoveFromCart}
                  amount={productItem?.amount ?? 0}
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
