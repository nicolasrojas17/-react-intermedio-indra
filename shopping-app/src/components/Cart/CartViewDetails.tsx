import { Typography } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { useContext } from "react";
import { ShoppingCartContext } from "../../hooks/ShoppingCartContextProvider";
import CartViewDesktop from "./CartViewDesktop";
import CartViewMobile from "./CartViewMobile";

export type CartViewDetailsProps = {
  viewTotal: boolean;
};

const CartViewDetails = ({ viewTotal }: CartViewDetailsProps) => {
  const shoppingContextData = useContext(ShoppingCartContext);
  const { shoppingCart } = shoppingContextData;

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
          {shoppingCart.length === 0 && (
            <TableRow>
              <TableCell align="center" colSpan={6}>
                <Typography variant="h5" component="p">
                  No products in cart
                </Typography>
              </TableCell>
            </TableRow>
          )}

          <CartViewDesktop viewTotal={viewTotal} />
          <CartViewMobile viewTotal={viewTotal} />
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default CartViewDetails;
