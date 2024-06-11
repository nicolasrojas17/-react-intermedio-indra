import { Chip, Stack } from "@mui/material";

export type CardDiscountProps = {
  discount: number;
  color: "success" | "error" | "warning" | "info";
};
const CardDiscount = ({ discount, color }: CardDiscountProps) => {
  return (
    <Stack spacing={1} width={"100%"}>
      <Stack direction="row" spacing={1}>
        <Chip label={`${discount}% off`} color={color} sx={{ width: "100%", boxShadow:25 }}/>
      </Stack>
    </Stack>
  );
};

export default CardDiscount;
