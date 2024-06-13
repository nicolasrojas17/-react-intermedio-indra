import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { useContext } from "react";
import { StoreContext } from "../../../hooks/StoreContextProvider";

const Category = () => {
  const storeContextData = useContext(StoreContext);
  const { categories, category, handleChangeCategory } = storeContextData;

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
        {categories.map((category) => (
          <MenuItem key={category} value={category}>
            {category}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default Category;
