import { Chip, Stack } from "@mui/material";

export type ChipItemProps = {
  text: string;
  color: "success" | "error" | "warning" | "info";
};

const ChipItem = ({ text, color }: ChipItemProps) => {
  return (
    <Stack spacing={1} width={"100%"}>
      <Stack direction="row" spacing={1}>
        <Chip label={text} color={color} sx={{ width: "100%", boxShadow: 25 }} />
      </Stack>
    </Stack>
  );
};

export default ChipItem;
