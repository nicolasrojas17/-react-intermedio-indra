import { CardActions, CardContent, CardMedia, Grid, Stack, Typography } from "@mui/material";
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
};

const CardItem = ({ img, altImg, title, description }: CardItemProps) => {
  const [rating, setRating] = useState<number>(4);
  return (
    <Grid item xs={12} sm={6} md={4} lg={3}>
      <Card sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
        <Stack direction="row" m={2}>
          <CardDiscount discount={80} />
        </Stack>
        <CardMedia sx={{ height: 200, width: "100%" }} component={"img"} image={img} alt={altImg} loading="lazy" />
        <CardContent sx={{ flexGrow: 1 }}>
          <Typography gutterBottom variant="h5" component="div">
            {title}
          </Typography>
          <Typography
            variant="body2"
            my={2}
            sx={{ display: "-webkit-box", WebkitLineClamp: 4, WebkitBoxOrient: "vertical", overflow: "hidden" }}
          >
            {description}
          </Typography>
        </CardContent>
        <CardRating rating={rating} setRating={setRating} />
        <CardActions sx={{ display: "flex", justifyContent: "space-between" }}>
          <CardModalInfo title={title} description={description} altImg={altImg} img={img} />
        </CardActions>
      </Card>
    </Grid>
  );
};

export default CardItem;
