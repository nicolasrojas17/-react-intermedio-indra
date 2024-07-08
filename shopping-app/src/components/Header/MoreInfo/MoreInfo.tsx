import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import MoreIcon from "@mui/icons-material/MoreVert";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Badge, Box, Divider, ListItemIcon } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import * as React from "react";
import { useContext, useEffect, useState } from "react";
import { ShoppingCartContext } from "../../../hooks/ShoppingCartContextProvider";
import Notification from "./Notification";
import CategoryIcon from "@mui/icons-material/Category";
import { Link } from "react-router-dom";
import { UserContext } from "../../../hooks/UserContextProvider";
import { ROLE } from "../../../interfaces/User";
import Logout from "@mui/icons-material/Logout";
import InventoryIcon from "@mui/icons-material/Inventory";
import ChecklistIcon from "@mui/icons-material/Checklist";

export type MoreInfoProps = {
  setCartOpen: (open: boolean) => void;
};

const MoreInfo = ({ setCartOpen }: MoreInfoProps) => {
  const userContext = useContext(UserContext);
  const { user, setUser } = userContext;

  const shoppingContextData = useContext(ShoppingCartContext);
  const { shoppingCart } = shoppingContextData;

  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState<null | HTMLElement>(null);
  const [privateAnchorEl, setPrivateAnchorEl] = useState<null | HTMLElement>(null);
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

  const isPrivateMenuOpen = Boolean(privateAnchorEl);

  const handlePrivateMenuClose = () => {
    setPrivateAnchorEl(null);
  };

  const handlePrivateMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setPrivateAnchorEl(event.currentTarget);
  };

  const logout = () => {
    setUser({ username: "", role: ROLE.NOT_LOGGED });
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
      {user.role === ROLE.NOT_LOGGED && (
        <MenuItem sx={{ minWidth: 200 }} component={Link} to={"/login"} onClick={() => setMobileMoreAnchorEl(null)}>
          <Notification icon={<AccountCircleIcon />} text="Login" colorIcon="inherit" />
        </MenuItem>
      )}

      <MenuItem sx={{ minWidth: 200 }} component={Link} to={"/store"} onClick={() => setMobileMoreAnchorEl(null)}>
        <Notification icon={<CategoryIcon />} text="Products" colorIcon="inherit" />
      </MenuItem>
      {user.role === ROLE.ADMIN && (
        <MenuItem sx={{ minWidth: 200 }} component={Link} to={"/admin/products"} onClick={() => setPrivateAnchorEl(null)}>
          <Notification icon={<InventoryIcon />} text="Admin Products" colorIcon="inherit" />
        </MenuItem>
      )}
      {user.role === ROLE.ADMIN && (
        <MenuItem sx={{ minWidth: 200 }} component={Link} to={"/admin/orders"} onClick={() => setPrivateAnchorEl(null)}>
          <Notification icon={<ChecklistIcon />} text="Admin Orders" colorIcon="inherit" />
        </MenuItem>
      )}

      {user.role === ROLE.USER && (
        <MenuItem sx={{ minWidth: 200 }} component={Link} to={"/user/orders"} onClick={() => setPrivateAnchorEl(null)}>
          <Notification icon={<ChecklistIcon />} text="Orders" colorIcon="inherit" />
        </MenuItem>
      )}

      {user.role !== ROLE.NOT_LOGGED && (
        <MenuItem onClick={logout}>
          <ListItemIcon sx={{ marginLeft: 2 }}>
            <Logout />
          </ListItemIcon>
          Logout
        </MenuItem>
      )}
    </Menu>
  );
  const privateMenuId = "primary-search-account-menu-private";
  const renderMenuPrivate = (
    <Menu
      anchorEl={privateAnchorEl}
      anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      id={privateMenuId}
      keepMounted
      transformOrigin={{ horizontal: "right", vertical: "top" }}
      open={isPrivateMenuOpen}
      onClose={handlePrivateMenuClose}
    >
      {user.role === ROLE.ADMIN && (
        <MenuItem sx={{ minWidth: 200 }} component={Link} to={"/admin/products"} onClick={() => setPrivateAnchorEl(null)}>
          <Notification icon={<InventoryIcon />} text="Admin Products" colorIcon="inherit" />
        </MenuItem>
      )}
      {user.role === ROLE.ADMIN && (
        <MenuItem sx={{ minWidth: 200 }} component={Link} to={"/admin/orders"} onClick={() => setPrivateAnchorEl(null)}>
          <Notification icon={<ChecklistIcon />} text="Admin Orders" colorIcon="inherit" />
        </MenuItem>
      )}
      {user.role === ROLE.USER && (
        <MenuItem sx={{ minWidth: 200 }} component={Link} to={"/user/orders"} onClick={() => setPrivateAnchorEl(null)}>
          <Notification icon={<ChecklistIcon />} text="Orders" colorIcon="inherit" />
        </MenuItem>
      )}

      <Divider />
      <MenuItem onClick={logout}>
        <ListItemIcon sx={{ marginLeft: 2 }}>
          <Logout />
        </ListItemIcon>
        Logout
      </MenuItem>
    </Menu>
  );

  return (
    <Box display={"flex"}>
      <Box display={{ xs: "none", md: "flex" }}>
        {user.role === ROLE.NOT_LOGGED ? (
          <Box component={Link} to={"/login"}>
            <Notification icon={<AccountCircleIcon />} colorIcon="secondary" />
          </Box>
        ) : (
          <Box>
            <IconButton
              size="large"
              onClick={handlePrivateMenuOpen}
              aria-label="show more"
              aria-haspopup="true"
              aria-controls={privateMenuId}
              color="secondary"
            >
              <AccountCircleIcon />
            </IconButton>
            {renderMenuPrivate}
          </Box>
        )}

        <Box component={Link} to={"/store"}>
          <Notification icon={<CategoryIcon />} colorIcon="secondary" />
        </Box>
        <Notification
          icon={<ShoppingCartIcon />}
          colorIcon="secondary"
          numberOfNotifications={amountProducts}
          onclick={() => setCartOpen(true)}
        />
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
