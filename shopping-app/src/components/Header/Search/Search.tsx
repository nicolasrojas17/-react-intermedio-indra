import SearchIcon from "@mui/icons-material/Search";
import { Drawer, IconButton } from "@mui/material";
import InputBase from "@mui/material/InputBase";
import { alpha, styled } from "@mui/material/styles";
import { useState } from "react";

const SearchContainer = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  width: "100%",
  [theme.breakpoints.up("md")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
  },
}));

const StyledInputBaseMobile = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    width: "100%",
  },
  backgroundColor: theme.palette.common.white,
  borderRadius: "15px",
  margin: "25px 5px",
}));

const Search = () => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <IconButton sx={{ display: { xs: "flex", md: "none" } }} onClick={() => setOpen(true)} color="inherit">
        <SearchIcon />
      </IconButton>

      <SearchContainer sx={{ display: { xs: "none", md: "block" } }}>
        <SearchIconWrapper>
          <SearchIcon />
        </SearchIconWrapper>
        <StyledInputBase placeholder="Buscar…" inputProps={{ "aria-label": "search" }} />
      </SearchContainer>

      <Drawer
        open={open}
        anchor="top"
        onClose={() => setOpen(false)}
        PaperProps={{ sx: { backgroundColor: "inherit", boxShadow: "none" } }}
        sx={{ display: { xs: "block", md: "none" } }}
      >
        <SearchContainer sx={{ display: { xs: "contents", md: "none" } }}>
          <SearchIconWrapper sx={{ zIndex: 2 }}>
            <SearchIcon />
          </SearchIconWrapper>
          <StyledInputBaseMobile placeholder="Buscar…" inputProps={{ "aria-label": "search" }} />
        </SearchContainer>
      </Drawer>
    </>
  );
};

export default Search;
