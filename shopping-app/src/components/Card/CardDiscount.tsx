import { Chip, Stack } from "@mui/material";

export type CardDiscountProps = {
  discount: number;
};
const CardDiscount = ({ discount }: CardDiscountProps) => {
  return (
    <Stack spacing={1}>
      <Stack direction="row" spacing={1}>
        <Chip label={`${discount}% off`} color="success" />
      </Stack>
    </Stack>
  );
};

export default CardDiscount;
