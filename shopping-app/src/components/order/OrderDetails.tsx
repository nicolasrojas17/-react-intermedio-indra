import { useContext } from "react";
import { ShoppingCartContext } from "../../hooks/ShoppingCartContextProvider";
import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { formatPrice } from "../../util/utils";

const OrderDetails = () => {
  const shoppingContextData = useContext(ShoppingCartContext);
  const { orders } = shoppingContextData;

  return (
    <Box>
      {orders.length === 0 && (
        <Box mt={5}>
          <Typography variant="h5" textAlign={"center"} component="p">
            No orders
          </Typography>
        </Box>
      )}
      {orders.map((order: any, index: number) => {
        return (
          <Box mt={5} key={index + 1}>
            <Typography variant="h5" textAlign={"center"} component="p">
              Order ID : {order.id}
            </Typography>

            <TableContainer sx={{ padding: 2, width: "100%", overflow: "auto" }} key={index + 1}>
              <Table aria-label="simple table">
                <TableHead sx={{ display: { xs: "none", md: "table-header-group" } }}>
                  <TableRow>
                    <TableCell align="center">User</TableCell>
                    <TableCell align="center">Product</TableCell>
                    <TableCell align="center">Amount</TableCell>
                    <TableCell align="center">Price</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {order.cart.map((cart: any, index2: number) => {
                    return (
                      <TableRow key={index2 + 1}>
                        <TableCell align="center">{order.user}</TableCell>
                        <TableCell align="left">{cart.product.title}</TableCell>
                        <TableCell align="center">{cart.amount}</TableCell>
                        <TableCell align="center">$ {formatPrice(cart.amount * cart.product.price)}</TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        );
      })}
    </Box>
  );
};

export default OrderDetails;
