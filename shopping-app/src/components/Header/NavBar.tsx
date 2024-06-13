import CloseIcon from "@mui/icons-material/Close";
import ShoppingCartCheckoutIcon from "@mui/icons-material/ShoppingCartCheckout";
import { AppBar, Box, Button, Container, Drawer, IconButton, Toolbar, Typography } from "@mui/material";
import { ReactElement, useState } from "react";
import { Link } from "react-router-dom";
import { Product } from "../../interfaces/Product";
import { ProductCart } from "../App";
import Cart from "../Cart/Cart";
import MoreInfo from "./MoreInfo/MoreInfo";
import Search from "./Search/Search";

export type MenuItem = {
  title: string;
  path: string;
  icon: ReactElement;
};

export type NavbarProps = {
  shoppingCart: ProductCart[];
  search: string;
  cartProducts: ProductCart[];
  setSearch: (search: string) => void;
  handleRemoveAllItemsCart: (value: number) => void;
  handleAddProductToCart: (product: Product, amount: number) => void;
  handleRemoveProductFromCart: (productId: number) => void;
};

const Navbar = ({
  shoppingCart,
  search,
  cartProducts,
  setSearch,
  handleRemoveAllItemsCart,
  handleAddProductToCart,
  handleRemoveProductFromCart,
}: NavbarProps) => {
  const [cartOpen, setCartOpen] = useState<boolean>(false);

  return (
    <Box position="sticky" top={0} zIndex={100}>
      <AppBar position="static">
        <Container maxWidth="xl">
          <Toolbar sx={{ justifyContent: "space-between" }}>
            <Typography variant="h6">Curso React Intermedio</Typography>
            <Search search={search} setSearch={setSearch} />
            <MoreInfo shoppingCart={shoppingCart} setCartOpen={setCartOpen} />
          </Toolbar>
        </Container>
      </AppBar>

      <Drawer
        anchor="right"
        open={cartOpen}
        onClose={() => setCartOpen(false)}
        PaperProps={{ sx: { width: { xs: "100%", md: "inherit" } } }}
      >
        <IconButton
          sx={{ position: "absolute", top: 0, right: 0, margin: 1, marginRight: 3, zIndex: 1 }}
          onClick={() => setCartOpen(false)}
        >
          <CloseIcon />
        </IconButton>

        <Cart
          viewTotal={true}
          cartProducts={cartProducts}
          handleRemoveAllItemsCart={handleRemoveAllItemsCart}
          handleAddProductToCart={handleAddProductToCart}
          handleRemoveProductFromCart={handleRemoveProductFromCart}
        />
        <Box display={"flex"} justifyContent={"center"} mx={5}>
          <Button
            fullWidth
            startIcon={<ShoppingCartCheckoutIcon />}
            variant="outlined"
            color="success"
            component={Link}
            to={"/cart"}
            onClick={() => setCartOpen(false)}
          >
            Go to Cart
          </Button>
        </Box>
      </Drawer>
    </Box>
  );
};

export default Navbar;
