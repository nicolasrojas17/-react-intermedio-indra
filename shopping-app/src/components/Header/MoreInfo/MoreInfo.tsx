import MoreIcon from "@mui/icons-material/MoreVert";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Box } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import * as React from "react";
import { useEffect, useState } from "react";
import { ProductCart } from "../../App";
import Notification from "./Notification";

export type MoreInfoProps = {
  shoppingCart: ProductCart[];
};

const MoreInfo = ({ shoppingCart }: MoreInfoProps) => {
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
      <MenuItem>
        <Notification icon={<AccountCircleIcon />} numberOfNotifications={0} text="Perfil" />
      </MenuItem>
      <MenuItem>
        <Notification icon={<ShoppingCartIcon />} numberOfNotifications={amountProducts} text="Carrito de compras" />
      </MenuItem>
    </Menu>
  );
  return (
    <div>
      <Box display={{ xs: "none", md: "flex" }}>
        <Notification icon={<AccountCircleIcon />} numberOfNotifications={0} />
        <Notification icon={<ShoppingCartIcon />} numberOfNotifications={amountProducts} />
      </Box>
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
    </div>
  );
};

export default MoreInfo;
