import ReplayIcon from "@mui/icons-material/Replay";
import { Box, Button, Container, Grid, Typography } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Cart from "../../components/Cart/Cart";
import { ShoppingCartContext } from "../../hooks/ShoppingCartContextProvider";
import { formatPrice } from "../../util/utils";

const CartPage = () => {
  const navigate = useNavigate();

  const shoppingContextData = useContext(ShoppingCartContext);
  const { shoppingCart } = shoppingContextData;

  const [subTotal, setSubTotal] = useState<number>(0);
  const [shipping, setShipping] = useState<number>(0);
  const [total, setTotal] = useState<number>(0);

  useEffect(() => {
    const subTotal = shoppingCart.reduce((acc, item) => acc + item.product.price * item.amount, 0);
    const percentShipping = 0.05;
    setSubTotal(subTotal);
    setShipping(subTotal * percentShipping);
    setTotal(subTotal + subTotal * percentShipping);
  }, [shoppingCart]);

  if (shoppingCart.length === 0) navigate("/store");

  return (
    <Container>
      <Grid container maxWidth={"lg"} spacing={2} mb={5} justifyContent={"center"}>
        <Grid item xs={12} lg={8} px={2} mt={5} mx={1} border={1} borderColor={"rgb(221, 221, 221)"}>
          <Typography variant="h5" align="center" pb={2} borderBottom={1} borderColor={"rgb(221, 221, 221)"}>
            Shopping Cart
          </Typography>
          <Cart viewTotal={false} />
          <Box display={"flex"} justifyContent={"center"} my={2}>
            <Button startIcon={<ReplayIcon />} variant="outlined" component={Link} to={"/store"}>
              Continue Shopping
            </Button>
          </Box>
        </Grid>

        <Grid item xs={12} lg={3} mt={5} mx={1} p={2} border={1} borderColor={"rgb(221, 221, 221)"} height={"min-content"}>
          <Typography variant="h5" align="center" pb={2} mb={2} borderBottom={1} borderColor={"rgb(221, 221, 221)"}>
            Cart Summary
          </Typography>

          <Box display={"flex"} justifyContent={"space-between"}>
            <Typography variant="body1" fontWeight={"bold"}>
              Subtotal
            </Typography>
            <Typography variant="body1">{`$${formatPrice(subTotal)}`}</Typography>
          </Box>
          <Box display={"flex"} justifyContent={"space-between"}>
            <Typography variant="body1" fontWeight={"bold"}>
              Shipping (5%)
            </Typography>
            <Typography variant="body1"> {`$${formatPrice(shipping)}`}</Typography>
          </Box>
          <Box display={"flex"} justifyContent={"space-between"} mt={2} pt={2} borderTop={1} borderColor={"rgb(221, 221, 221)"}>
            <Typography variant="body1" fontWeight={"bold"}>
              Total
            </Typography>
            <Typography variant="body1"> {`$${formatPrice(total)}`}</Typography>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default CartPage;
