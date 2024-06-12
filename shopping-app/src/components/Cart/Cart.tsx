import RemoveShoppingCartIcon from "@mui/icons-material/RemoveShoppingCart";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { Box, IconButton, Typography } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { formatPrice } from "../../util/utils";
import { ProductCart } from "../App";
import { Product } from "../../interfaces/Product";

export type CartProps = {
  cartProducts: ProductCart[];
  handleRemoveAllItemsCart: (value: number) => void;
  handleAddProductToCart: (product: Product, amount: number) => void;
  handleRemoveProductFromCart: (productId: number) => void;
};

const Cart = ({ cartProducts, handleRemoveAllItemsCart, handleAddProductToCart, handleRemoveProductFromCart }: CartProps) => {
  return (
    <TableContainer sx={{ padding: 2 }}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell></TableCell>
            <TableCell align="right">Product</TableCell>
            <TableCell align="center">Quantity</TableCell>
            <TableCell align="center">Price</TableCell>
            <TableCell align="center">Total</TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {cartProducts.length === 0 && (
            <TableRow>
              <TableCell align="center" colSpan={6}>
                <Typography variant="h5" component="p">
                  No products in cart
                </Typography>
              </TableCell>
            </TableRow>
          )}
          {cartProducts.map((cart) => (
            <TableRow key={cart.product.id} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
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
              <TableCell align="center">{`$ ${formatPrice(cart.product.price)}`}</TableCell>
              <TableCell align="center">{`$ ${formatPrice(cart.product.price * cart.amount)}`}</TableCell>
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

          <TableRow>
            <TableCell colSpan={5} align="right">
              Total
            </TableCell>
            <TableCell align="center">
              {`$ ${formatPrice(cartProducts.reduce((acc, item) => acc + item.product.price * item.amount, 0))}`}
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default Cart;
