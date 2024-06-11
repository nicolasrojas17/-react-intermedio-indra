import MailIcon from "@mui/icons-material/Mail";
import { useState, useEffect } from "react";
import MoreIcon from "@mui/icons-material/MoreVert";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Box } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import * as React from "react";
import Notification from "./Notification";
import { ProductCart } from "../../App";


export type MoreInfoProps = {
  shoppingCart: ProductCart[];
};

const MoreInfo = ({ shoppingCart }: MoreInfoProps) => {
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState<null | HTMLElement>(null);
  const [amountProducts, setAmountProducts] = useState(0);

  useEffect(() => {
    let amount = 0;
    shoppingCart.forEach((product) => {
      amount += product.amount;
    });
    setAmountProducts(amount);
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
        <Notification icon={<ShoppingCartIcon />} numberOfNotifications={amountProducts} text="Carrito de compras" />
      </MenuItem>
      <MenuItem>
        <Notification icon={<MailIcon />} numberOfNotifications={0} text="Mensajes" />
      </MenuItem>
    </Menu>
  );
  return (
    <div>
      <Box display={{ xs: "none", md: "flex" }}>
        <Notification icon={<ShoppingCartIcon />} numberOfNotifications={amountProducts} />
        <Notification icon={<MailIcon />} numberOfNotifications={0} />
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
