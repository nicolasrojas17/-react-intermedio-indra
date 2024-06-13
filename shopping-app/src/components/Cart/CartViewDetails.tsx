import { Typography } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Product } from "../../interfaces/Product";
import { ProductCart } from "../App";
import CartViewDesktop from "./CartViewDesktop";
import CartViewMobile from "./CartViewMobile";

export type CartViewDetailsProps = {
  cartProducts: ProductCart[];
  viewTotal: boolean;
  handleRemoveAllItemsCart: (value: number) => void;
  handleAddProductToCart: (product: Product, amount: number) => void;
  handleRemoveProductFromCart: (productId: number) => void;
};

const CartViewDetails = ({
  cartProducts,
  viewTotal,
  handleRemoveAllItemsCart,
  handleAddProductToCart,
  handleRemoveProductFromCart,
}: CartViewDetailsProps) => {
  return (
    <TableContainer sx={{ padding: 2, width: "100%", overflow: "auto" }}>
      <Table aria-label="simple table">
        <TableHead sx={{ display: { xs: "none", md: "table-header-group" } }}>
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

          <CartViewDesktop
            cartProducts={cartProducts}
            viewTotal={viewTotal}
            handleRemoveAllItemsCart={handleRemoveAllItemsCart}
            handleAddProductToCart={handleAddProductToCart}
            handleRemoveProductFromCart={handleRemoveProductFromCart}
          />

          <CartViewMobile
            cartProducts={cartProducts}
            viewTotal={viewTotal}
            handleRemoveAllItemsCart={handleRemoveAllItemsCart}
            handleAddProductToCart={handleAddProductToCart}
            handleRemoveProductFromCart={handleRemoveProductFromCart}
          />
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default CartViewDetails;
