import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import RemoveShoppingCartIcon from "@mui/icons-material/RemoveShoppingCart";
import { Box, Grid, IconButton, TableCell, TableRow, Typography } from "@mui/material";
import { useContext } from "react";
import { ShoppingCartContext } from "../../hooks/ShoppingCartContextProvider";
import { formatPrice } from "../../util/utils";

export type CartViewMobileProps = {
  viewTotal: boolean;
};

const CartViewMobile = ({ viewTotal }: CartViewMobileProps) => {
  const shoppingContextData = useContext(ShoppingCartContext);
  const { shoppingCart, handleRemoveAllItemsCart, handleAddProductToCart, handleRemoveProductFromCart } = shoppingContextData;

  return (
    <>
      {shoppingCart.map((cart) => (
        <TableRow key={cart.product.id} sx={{ display: { xs: "table-row", md: "none" } }}>
          <TableCell>
            <Box display={"flex"} alignItems={"center"} pr={2} justifyContent={"space-between"}>
              <img
                style={{ marginRight: "24px" }}
                src={cart.product.image.includes("http") ? cart.product.image : `data:image/png;base64, ${cart.product.image}`}
                alt={cart.product.title}
                width="50"
              />
              <Typography variant="body2" mx={3}>
                {cart.product.title}
              </Typography>

              <IconButton
                size="large"
                aria-label="show more"
                aria-haspopup="true"
                onClick={() => handleRemoveAllItemsCart(cart.product.id)}
                color="inherit"
              >
                <RemoveShoppingCartIcon />
              </IconButton>
            </Box>

            <Box mt={2}>
              <Grid container alignItems={"center"}>
                <Grid item textAlign={"center"} xs={4}>
                  <Typography variant="body2" component={"p"} fontWeight={"bold"}>
                    Quantity
                  </Typography>
                </Grid>
                <Grid item textAlign={"center"} xs={4}>
                  <Typography variant="body2" component={"p"} fontWeight={"bold"}>
                    Price
                  </Typography>
                </Grid>
                <Grid item textAlign={"center"} xs={4}>
                  <Typography variant="body2" component={"p"} fontWeight={"bold"}>
                    Total
                  </Typography>
                </Grid>
                <Grid item textAlign={"center"} xs={4}>
                  <Typography variant="body2" component={"div"}>
                    <Box display={"flex"} alignItems={"center"} justifyContent={"center"}>
                      <IconButton onClick={() => handleRemoveProductFromCart(cart.product.id)}>
                        <RemoveIcon color="inherit" />
                      </IconButton>
                      <Typography variant="body1" component={"p"}>
                        {cart.amount}
                      </Typography>
                      <IconButton onClick={() => handleAddProductToCart(cart.product, 1)}>
                        <AddIcon color="inherit" />
                      </IconButton>
                    </Box>
                  </Typography>
                </Grid>
                <Grid item textAlign={"center"} xs={4}>
                  <Typography variant="body2" component={"p"}>
                    {`$${formatPrice(cart.product.price)}`}
                  </Typography>
                </Grid>
                <Grid item textAlign={"center"} xs={4}>
                  <Typography variant="body2" component={"p"}>
                    {`$${formatPrice(cart.product.price * cart.amount)}`}
                  </Typography>
                </Grid>
              </Grid>
            </Box>
          </TableCell>
        </TableRow>
      ))}

      {viewTotal && (
        <TableRow sx={{ display: { xs: "table-row", md: "none" } }}>
          <TableCell align="right" colSpan={3} sx={{ border: 0 }}>
            Total: {`$${formatPrice(shoppingCart.reduce((acc, item) => acc + item.product.price * item.amount, 0))}`}
          </TableCell>
        </TableRow>
      )}
    </>
  );
};

export default CartViewMobile;
