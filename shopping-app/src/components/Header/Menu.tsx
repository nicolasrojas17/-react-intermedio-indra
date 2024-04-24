import { AppBar, Container, Tab, Tabs } from "@mui/material";
import { MenuItem } from "./NavBar";
import { Link } from "react-router-dom";

export type AppBarProps = {
  activePage: string;
  navLinks: MenuItem[];
  setActivePage: (value: string) => void;
};

const Menu = ({ activePage, navLinks, setActivePage }: AppBarProps) => {
  return (
    <AppBar
      position="static"
      sx={{
        boxShadow: "0 4px 5px rgba(0, 0, 0, 0.14)",
        display: { xs: "none", md: "block" },
      }}
    >
      <Container maxWidth="xl">
        <Tabs
          sx={{ justifyContent: "center" }}
          aria-label="basic tabs example"
          indicatorColor="secondary"
          textColor="inherit"
          variant="fullWidth"
          value={activePage}
          onChange={(_, newValue) => {
            setActivePage(newValue);
          }}
        >
          {navLinks.map((item) => (
            <Tab key={item.title} label={item.title} value={item.path} component={Link} to={item.path} />
          ))}
        </Tabs>
      </Container>
    </AppBar>
  );
};

export default Menu;
