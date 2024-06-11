import { Box, Rating, Typography } from "@mui/material";

export type CardRatingProps = {
  rating: number;
  reviews: number;
};

const CardRating = ({ rating, reviews = 0 }: CardRatingProps) => {
  return (
    <Box px={2} mb={2} display="flex" alignItems="center" justifyContent={"center"} width={"100%"}>
      <Rating name="read-only" value={rating} precision={0.5} readOnly />
      <Typography ml={2} variant="caption">{` (${reviews} reviews) `}</Typography>
    </Box>
  );
};

export default CardRating;
