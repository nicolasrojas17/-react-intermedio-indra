import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import MoreIcon from "@mui/icons-material/MoreVert";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Badge, Box } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import * as React from "react";
import { useContext, useEffect, useState } from "react";
import { ShoppingCartContext } from "../../../hooks/ShoppingCartContextProvider";
import Notification from "./Notification";
import CategoryIcon from "@mui/icons-material/Category";
import { Link } from "react-router-dom";

export type MoreInfoProps = {
  setCartOpen: (open: boolean) => void;
};

const MoreInfo = ({ setCartOpen }: MoreInfoProps) => {
  const shoppingContextData = useContext(ShoppingCartContext);
  const { shoppingCart } = shoppingContextData;

  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState<null | HTMLElement>(null);
  const [amountProducts, setAmountProducts] = useState(0);

  useEffect(() => {
    setAmountProducts(shoppingCart.length);
  }, [shoppingCart]);

  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem sx={{ minWidth: 200 }} component={Link} to={"/login"} onClick={() => setMobileMoreAnchorEl(null)}>
        <Notification icon={<AccountCircleIcon />} text="Login" colorIcon="inherit" />
      </MenuItem>
      <MenuItem sx={{ minWidth: 200 }} component={Link} to={"/store"} onClick={() => setMobileMoreAnchorEl(null)}>
        <Notification icon={<CategoryIcon />} text="Products" colorIcon="inherit" />
      </MenuItem>
    </Menu>
  );
  return (
    <Box display={"flex"}>
      <Box display={{ xs: "none", md: "flex" }}>
        <Box component={Link} to={"/login"}>
          <Notification icon={<AccountCircleIcon />} />
        </Box>
        <Box component={Link} to={"/store"}>
          <Notification icon={<CategoryIcon />} />
        </Box>
        <Notification icon={<ShoppingCartIcon />} numberOfNotifications={amountProducts} onclick={() => setCartOpen(true)} />
      </Box>
      <IconButton sx={{ display: { xs: "flex", md: "none" } }} color="secondary" onClick={() => setCartOpen(true)}>
        <Badge badgeContent={amountProducts} color="error">
          <ShoppingCartIcon />
        </Badge>
      </IconButton>
      <Box display={{ xs: "flex", md: "none" }}>
        <IconButton
          size="large"
          aria-label="show more"
          aria-controls={mobileMenuId}
          aria-haspopup="true"
          onClick={handleMobileMenuOpen}
          color="inherit"
        >
          <MoreIcon />
        </IconButton>
      </Box>
      {renderMobileMenu}
    </Box>
  );
};

export default MoreInfo;
