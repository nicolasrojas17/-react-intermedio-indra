import CloseIcon from "@mui/icons-material/Close";
import MenuIcon from "@mui/icons-material/Menu";
import { AppBar, Box, Container, Drawer, IconButton, Toolbar, Typography } from "@mui/material";
import { ReactElement, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Product } from "../../interfaces/Product";
import { ProductCart } from "../App";
import Cart from "../Cart/Cart";
import Menu from "./Menu";
import MoreInfo from "./MoreInfo/MoreInfo";
import NavListDrawer from "./NavListDrawer";
import Search from "./Search/Search";

export type MenuItem = {
  title: string;
  path: string;
  icon: ReactElement;
};

export type NavbarProps = {
  navLinks: MenuItem[];
  shoppingCart: ProductCart[];
  search: string;
  cartProducts: ProductCart[];
  setSearch: (search: string) => void;
  handleRemoveAllItemsCart: (value: number) => void;
  handleAddProductToCart: (product: Product, amount: number) => void;
  handleRemoveProductFromCart: (productId: number) => void;
};

const Navbar = ({
  navLinks,
  shoppingCart,
  search,
  cartProducts,
  setSearch,
  handleRemoveAllItemsCart,
  handleAddProductToCart,
  handleRemoveProductFromCart,
}: NavbarProps) => {
  const [open, setOpen] = useState<boolean>(false);
  const [cartOpen, setCartOpen] = useState<boolean>(false);

  const [activePage, setActivePage] = useState("/");
  const location = useLocation();

  useEffect(() => setOpen(false), [location]);

  return (
    <Box position="sticky" top={0} zIndex={100}>
      <AppBar position="static">
        <Container maxWidth="xl">
          <Toolbar sx={{ justifyContent: "space-between" }}>
            <Box display={{ xs: "block", md: "none" }}>
              <IconButton color="inherit" size="large" onClick={() => setOpen(true)}>
                <MenuIcon />
              </IconButton>
            </Box>
            <Typography variant="h6">Curso React Intermedio</Typography>
            <Search search={search} setSearch={setSearch} />
            <MoreInfo shoppingCart={shoppingCart} setCartOpen={setCartOpen} />
          </Toolbar>
        </Container>
      </AppBar>

      <Drawer anchor="right" open={cartOpen} onClose={() => setCartOpen(false)} PaperProps={{ sx: { width: {xs:"100%", md: "inherit" } } }}>
        <IconButton
          sx={{ position: "absolute", top: 0, right: 0, margin: 1, marginRight: 3, zIndex: 1 }}
          onClick={() => setCartOpen(false)}
        >
          <CloseIcon />
        </IconButton>

        <Cart
          cartProducts={cartProducts}
          handleRemoveAllItemsCart={handleRemoveAllItemsCart}
          handleAddProductToCart={handleAddProductToCart}
          handleRemoveProductFromCart={handleRemoveProductFromCart}
        />
      </Drawer>

      <Drawer sx={{ display: { xs: "block", md: "none" } }} open={open} anchor="left" onClose={() => setOpen(false)}>
        <NavListDrawer navLinks={navLinks} />
      </Drawer>

      <Menu activePage={activePage} setActivePage={setActivePage} navLinks={navLinks} />
    </Box>
  );
};

export default Navbar;
