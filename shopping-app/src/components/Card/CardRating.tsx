import { Box, Rating, Typography } from "@mui/material";

export type CardRatingProps = {
  rating: number;
  setRating: (rating: number) => void;
};

const CardRating = ({ rating, setRating }: CardRatingProps) => {
  return (
    <Box px={2}>
      <Typography component="legend">Calificación</Typography>
      <Rating
        name="simple-controlled"
        value={rating}
        precision={0.5}
        onChange={(_, newValue) => {
          setRating(newValue ?? 0);
        }}
      />
    </Box>
  );
};

export default CardRating;
