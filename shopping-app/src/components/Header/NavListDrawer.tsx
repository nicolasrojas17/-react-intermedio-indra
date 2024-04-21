import { Box, List, ListItem, ListItemButton, Typography, ListItemIcon } from "@mui/material";
import { MenuItem } from "./NavBar";

export type NavListDrawerProps = {
  navLinks: MenuItem[];
};
const NavListDrawer = ({ navLinks }: NavListDrawerProps) => {
  return (
    <Box sx={{ width: 250 }}>
      <nav>
        <List>
          {navLinks.map((link: MenuItem, index) => (
            <ListItem key={index + 1} disablePadding>
              <ListItemButton component="a" href={link.path} key={index + 1}>
                <ListItemIcon>{link.icon}</ListItemIcon>
                <Typography variant="body1"> {link.title}</Typography>
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </nav>
    </Box>
  );
};

export default NavListDrawer;
