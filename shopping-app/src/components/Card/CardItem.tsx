import { Box, Button, CardActions, CardContent, CardMedia, Grid, IconButton, Skeleton, Stack, Typography } from "@mui/material";
import Card from "@mui/material/Card";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import { useEffect, useState } from "react";
import CardDiscount from "./CardDiscount";
import CardRating from "./CardRating";
import CardModalInfo from "./CardModalInfo";
import { Product } from "../App";

export type CardItemProps = {
  id?: number;
  img?: string;
  altImg?: string;
  title?: string;
  description?: string;
  price?: string;
  isLoading: boolean;
  shoppingCart?: Product[];
  setShoppingCart?: (value: Product[]) => void;
};

const CardItem = ({ id, img, altImg, title, description, price, isLoading, shoppingCart, setShoppingCart }: CardItemProps) => {
  const [rating, setRating] = useState<number>(4);
  const [product, setProduct] = useState<Product>();

  const priceCol = Number(price) * 3936;
  const discount = 80;
  const priceDiscount = priceCol * (discount / 100);
  const COP = new Intl.NumberFormat("en-DE");

  const handleAddToCart = () => {
    if (shoppingCart && setShoppingCart && id) {
      const product = shoppingCart.find((item) => item.idProduct === id);
      if (!product) {
        setShoppingCart([...shoppingCart, { idProduct: id, amount: 1 }]);
        return;
      }
      setShoppingCart( shoppingCart.map((item) => {
        return item.idProduct === id ? { ...item, amount: product?.amount ? product.amount + 1 : 1  } : item;
      }));
    }
  };

  const handleRemoveFromCart = () => {
    if (shoppingCart && setShoppingCart && id) {
      const product = shoppingCart.find((item) => item.idProduct === id);
      if (!product) {
        return;
      }
      if (product.amount === 1) {
        setShoppingCart(shoppingCart.filter((item) => item.idProduct !== id));
        return;
      }
      setShoppingCart(
        shoppingCart.map((item) => {
          return item.idProduct === id ? { ...item, amount: product.amount ? product.amount - 1 : 0 } : item;
        })
      );
    }
  }

  useEffect(() => {
    setProduct(shoppingCart?.find((item) => item.idProduct === id));
  }, [shoppingCart, id]);

  return (
    <Grid item xs={12} sm={6} md={4} lg={3}>
      <Card sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
        {isLoading ? (
          <>
            <Skeleton variant="rectangular" width={"100%"} height={200} />
            <CardContent>
              <Skeleton variant="text" width={"100%"} height={20} />
              <Skeleton variant="text" width={"100%"} height={20} />
              <Skeleton variant="text" width={"100%"} height={20} />
              <Skeleton variant="text" width={"80%"} height={20} />
              <Skeleton variant="text" width={"30%"} height={20} sx={{ marginTop: 2 }} />
              <Skeleton variant="text" width={"40%"} height={25} />
            </CardContent>
          </>
        ) : (
          <>
            <Stack direction="row" m={2} position={"absolute"}>
              <CardDiscount discount={discount} />
            </Stack>
            <CardMedia height={200} width={"100%"} component={"img"} image={img} alt={altImg} loading="lazy" />
            <CardContent sx={{ flexGrow: 1 }}>
              <Typography gutterBottom variant="h5" component="div">
                {title}
              </Typography>
              <Typography
                variant="body2"
                mt={2}
                display={"-webkit-box"}
                overflow={"hidden"}
                sx={{ WebkitLineClamp: 4, WebkitBoxOrient: "vertical" }}
              >
                {description}
              </Typography>
            </CardContent>

            <Box display={"flex"} justifyContent={"space-between"} alignItems={"center"} py={2}>
              <Box>
                <Typography variant="h6" px={2}>{`$ ${COP.format(priceDiscount).split(",")[0]}`}</Typography>
                <Typography variant="body2" px={2} sx={{ textDecoration: "line-through" }}>{`$ ${
                  COP.format(priceCol).split(",")[0]
                }`}</Typography>
              </Box>
              {product && (
                <Box display={"flex"} alignItems={"center"} pr={2}>
                  <IconButton onClick={handleRemoveFromCart}>
                    <RemoveCircleIcon color="primary" />
                  </IconButton>
                  <Typography variant="body1">{product.amount}</Typography>
                  <IconButton onClick={handleAddToCart}>
                    <AddCircleIcon color="primary" />
                  </IconButton>
                </Box>
              )}
            </Box>

            <Box display={"flex"} justifyContent={"space-between"} alignItems={"center"}>
              <CardRating rating={rating} setRating={setRating} />
              <CardActions sx={{ display: "flex", justifyContent: "space-between" }}>
                <CardModalInfo title={title ?? ""} description={description ?? ""} altImg={altImg ?? ""} img={img ?? ""} />
              </CardActions>
            </Box>
            <Button onClick={handleAddToCart}>Add to cart</Button>
          </>
        )}
      </Card>
    </Grid>
  );
};

export default CardItem;
