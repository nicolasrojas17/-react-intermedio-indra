import MenuIcon from "@mui/icons-material/Menu";
import { AppBar, Box, Container, Drawer, IconButton, Toolbar, Typography } from "@mui/material";
import { ReactElement, useEffect, useState } from "react";
import Menu from "./Menu";
import MoreInfo from "./MoreInfo/MoreInfo";
import NavListDrawer from "./NavListDrawer";
import Search from "./Search/Search";
import { useLocation } from "react-router-dom";
import { ProductCart } from "../App";

export type MenuItem = {
  title: string;
  path: string;
  icon: ReactElement;
};

export type NavbarProps = {
  navLinks: MenuItem[];
  shoppingCart: ProductCart[];
};

const Navbar = ({ navLinks, shoppingCart }: NavbarProps) => {
  const [open, setOpen] = useState<boolean>(false);

  const [activePage, setActivePage] = useState("/");
  const location = useLocation();

  useEffect(() => setOpen(false), [location]);

  return (
    <Box position="sticky" top={0} zIndex={100}>
      <AppBar position="static">
        <Container maxWidth="xl">
          <Toolbar>
            <Box display={{ xs: "block", md: "none" }}>
              <IconButton color="inherit" size="large" onClick={() => setOpen(true)}>
                <MenuIcon />
              </IconButton>
            </Box>
            <Typography variant="h6" flexGrow={1}>
              Curso React Intermedio
            </Typography>
            <Search />
            <MoreInfo   shoppingCart={shoppingCart}/>
          </Toolbar>
        </Container>
      </AppBar>

      <Drawer sx={{ display: { xs: "block", md: "none" } }} open={open} anchor="left" onClose={() => setOpen(false)}>
        <NavListDrawer navLinks={navLinks} />
      </Drawer>

      <Menu activePage={activePage} setActivePage={setActivePage} navLinks={navLinks} />
    </Box>
  );
};

export default Navbar;
