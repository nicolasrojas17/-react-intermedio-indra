import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import RemoveShoppingCartIcon from "@mui/icons-material/RemoveShoppingCart";
import { Box, IconButton, TableCell, TableRow, Typography } from "@mui/material";
import { Product } from "../../interfaces/Product";
import { formatPrice } from "../../util/utils";
import { ProductCart } from "../App";

export type CartViewDesktopProps = {
  cartProducts: ProductCart[];
  viewTotal: boolean;
  handleRemoveAllItemsCart: (value: number) => void;
  handleAddProductToCart: (product: Product, amount: number) => void;
  handleRemoveProductFromCart: (productId: number) => void;
};
const CartViewDesktop = ({
  cartProducts,
  viewTotal,
  handleRemoveAllItemsCart,
  handleAddProductToCart,
  handleRemoveProductFromCart,
}: CartViewDesktopProps) => {
  return (
    <>
      {cartProducts.map((cart) => (
        <TableRow
          key={cart.product.id}
          sx={{ display: { xs: "none", md: "table-row" }, "&:last-child td, &:last-child th": { border: 0 } }}
        >
          <TableCell align="right">
            <img src={cart.product.image} alt={cart.product.title} width="50" />
          </TableCell>
          <TableCell align="right" sx={{ maxWidth: "250px" }}>
            {cart.product.title}
          </TableCell>
          <TableCell align="center">
            <Box display={"flex"} alignItems={"center"} pr={2}>
              <IconButton onClick={() => handleRemoveProductFromCart(cart.product.id)}>
                <RemoveIcon color="inherit" />
              </IconButton>
              <Typography variant="body1"> {cart.amount}</Typography>
              <IconButton onClick={() => handleAddProductToCart(cart.product, 1)}>
                <AddIcon color="inherit" />
              </IconButton>
            </Box>
          </TableCell>
          <TableCell align="center">{`$${formatPrice(cart.product.price)}`}</TableCell>
          <TableCell align="center">{`$${formatPrice(cart.product.price * cart.amount)}`}</TableCell>
          <TableCell align="center">
            <IconButton
              size="large"
              aria-label="show more"
              aria-haspopup="true"
              onClick={() => handleRemoveAllItemsCart(cart.product.id)}
              color="inherit"
            >
              <RemoveShoppingCartIcon />
            </IconButton>
          </TableCell>
        </TableRow>
      ))}
      {viewTotal && (
        <TableRow sx={{ display: { xs: "none", md: "table-row" } }}>
          <TableCell colSpan={5} align="right" sx={{ border: 0 }}>
            Total:
          </TableCell>
          <TableCell align="center" sx={{ border: 0 }}>
            {`$${formatPrice(cartProducts.reduce((acc, item) => acc + item.product.price * item.amount, 0))}`}
          </TableCell>
        </TableRow>
      )}
    </>
  );
};

export default CartViewDesktop;
