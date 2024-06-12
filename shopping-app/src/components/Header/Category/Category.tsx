import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

export type CategoryProps = {
  categories: string[];
  category: string;
  setCategory: (value: string) => void;
};

const Category = ({ categories, category, setCategory }: CategoryProps) => {
  const handleChangeCategory = (event: any) => {
    setCategory(event.target.value as string);
  };
  
  return (
    <FormControl sx={{ m: 1, minWidth: 180 }}>
      <InputLabel id="demo-simple-select-helper-label">Category</InputLabel>
      <Select
        labelId="demo-simple-select-helper-label"
        id="demo-simple-select-helper"
        value={category}
        label="Category"
        onChange={handleChangeCategory}
      >
        <MenuItem value="">
          <em>All products</em>
        </MenuItem>
        {categories.map((category, index) => (
          <MenuItem key={index + 1} value={category}>
            {category}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default Category;
