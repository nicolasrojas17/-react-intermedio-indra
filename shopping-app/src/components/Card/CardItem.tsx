import { Box, Button, CardActions, CardContent, CardMedia, Grid, Stack, Typography } from "@mui/material";
import Card from "@mui/material/Card";
import { useState } from "react";
import CardDiscount from "./CardDiscount";
import CardRating from "./CardRating";
import CardModalInfo from "./CardModalInfo";

export type CardItemProps = {
  img: string;
  altImg: string;
  title: string;
  description: string;
  price: string;
};

const CardItem = ({ img, altImg, title, description, price }: CardItemProps) => {
  const [rating, setRating] = useState<number>(4);

  const priceCol = Number(price) * 3936;
  const discount = 80;
  const priceDiscount = priceCol * (discount / 100);
  const COP = new Intl.NumberFormat("en-DE");

  return (
    <Grid item xs={12} sm={6} md={4} lg={3}>
      <Card sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
        <Stack direction="row" m={2} position={"absolute"}>
          <CardDiscount discount={discount} />
        </Stack>
        <CardMedia sx={{ height: 200, width: "100%" }} component={"img"} image={img} alt={altImg} loading="lazy" />
        <CardContent sx={{ flexGrow: 1 }}>
          <Typography gutterBottom variant="h5" component="div">
            {title}
          </Typography>
          <Typography
            variant="body2"
            mt={2}
            sx={{ display: "-webkit-box", WebkitLineClamp: 4, WebkitBoxOrient: "vertical", overflow: "hidden" }}
          >
            {description}
          </Typography>
        </CardContent>
        <Box py={2}>
          <Typography variant="h6" px={2}>{`$ ${COP.format(priceDiscount).split(",")[0]}`}</Typography>
          <Typography variant="body2" px={2} sx={{ textDecoration: "line-through" }}>{`$ ${
            COP.format(priceCol).split(",")[0]
          }`}</Typography>
        </Box>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <CardRating rating={rating} setRating={setRating} />
          <CardActions sx={{ display: "flex", justifyContent: "space-between" }}>
            <CardModalInfo title={title} description={description} altImg={altImg} img={img} />
          </CardActions>
        </Box>
        <Button>Add to cart</Button>
      </Card>
    </Grid>
  );
};

export default CardItem;
