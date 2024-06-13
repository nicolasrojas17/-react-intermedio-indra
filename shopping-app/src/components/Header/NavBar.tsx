import CloseIcon from "@mui/icons-material/Close";
import ShoppingCartCheckoutIcon from "@mui/icons-material/ShoppingCartCheckout";
import { AppBar, Box, Button, Container, Drawer, IconButton, Toolbar, Typography } from "@mui/material";
import { ReactElement, useContext, useState } from "react";
import { Link } from "react-router-dom";
import { ShoppingCartContext } from "../../hooks/ShoppingCartContextProvider";
import Cart from "../Cart/Cart";
import MoreInfo from "./MoreInfo/MoreInfo";
import Search from "./Search/Search";

export type MenuItem = {
  title: string;
  path: string;
  icon: ReactElement;
};

const Navbar = () => {
  const shoppingContextData = useContext(ShoppingCartContext);
  const { shoppingCart } = shoppingContextData;

  const [cartOpen, setCartOpen] = useState<boolean>(false);

  return (
    <Box position="sticky" top={0} zIndex={100}>
      <AppBar position="static">
        <Container maxWidth="xl">
          <Toolbar sx={{ justifyContent: "space-between" }}>
            <Typography variant="h6" component={Link} to={"/store"} color={"secondary"} sx={{ textDecoration: "none" }}>
              Curso React Intermedio
            </Typography>
            <Search />
            <MoreInfo setCartOpen={setCartOpen} />
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

        <Cart viewTotal={true} />

        {shoppingCart.length > 0 && (
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
        )}
      </Drawer>
    </Box>
  );
};

export default Navbar;
