import InboxIcon from "@mui/icons-material/Inbox";
import MenuIcon from "@mui/icons-material/Menu";
import { AppBar, Box, Container, Drawer, IconButton, Toolbar, Typography } from "@mui/material";
import { ReactElement, useState } from "react";
import NavListDrawer from "./NavListDrawer";
import Search from "./Search/Search";
import MoreInfo from "./MoreInfo/MoreInfo";

export type MenuItem = {
  title: string;
  path: string;
  icon: ReactElement;
};

const navLinks: MenuItem[] = [
  { title: "Home", path: "/", icon: <InboxIcon /> },
  { title: "Profile", path: "/profile", icon: <InboxIcon /> },
];

const Navbar = () => {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <>
      <AppBar position="static">
        <Container maxWidth="xl">
          <Toolbar>
            <Box>
              <IconButton color="inherit" size="large" onClick={() => setOpen(true)}>
                <MenuIcon />
              </IconButton>
            </Box>
            <Typography variant="h6" sx={{ flexGrow: 1 }}>
              Curso React Intermedio
            </Typography>
            <Search />
            <MoreInfo />
          </Toolbar>
        </Container>
      </AppBar>

      <Drawer open={open} anchor="left" onClose={() => setOpen(false)}>
        <NavListDrawer navLinks={navLinks} />
      </Drawer>
    </>
  );
};

export default Navbar;
