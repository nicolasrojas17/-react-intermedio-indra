import { Container } from "@mui/material";
import { Navigate, Route, Routes } from "react-router-dom";
import StoreContextProvider from "../hooks/StoreContextProvider";
import useShoppingCart from "../hooks/useShoppingCart";
import { Product } from "../interfaces/Product";
import CartPage from "../pages/CartPage";
import StorePage from "../pages/StorePage";
import Navbar from "./Header/NavBar";
import StoreDetailPage from "../pages/StoreDetailPage";

/*
const navLinks: MenuItem[] = [
  { title: "Store", path: "/store", icon: <HomeIcon /> },
  { title: "Cart", path: "/cart", icon: <PersonIcon /> },
];
*/

export interface ProductCart {
  product: Product;
  amount: number;
}

const App = () => {
  const [shoppingCart, setShoppingCart, handleRemoveAllItemsCart, handleAddProductToCart, handleRemoveProductFromCart] =
    useShoppingCart();

  return (
    <StoreContextProvider>
      <Navbar
        shoppingCart={shoppingCart}
        cartProducts={shoppingCart}
        handleRemoveAllItemsCart={handleRemoveAllItemsCart}
        handleAddProductToCart={handleAddProductToCart}
        handleRemoveProductFromCart={handleRemoveProductFromCart}
      />
      <Container maxWidth={"xl"}>
        <Routes>
          <Route path="/store" element={<StorePage shoppingCart={shoppingCart} setShoppingCart={setShoppingCart} />} />
          <Route path="/store/details/:productId" element={<StoreDetailPage />} />
          <Route
            path="/cart"
            element={
              <CartPage
                shoppingCart={shoppingCart}
                handleRemoveAllItemsCart={handleRemoveAllItemsCart}
                handleAddProductToCart={handleAddProductToCart}
                handleRemoveProductFromCart={handleRemoveProductFromCart}
              />
            }
          />
          <Route index element={<Navigate to="/store" replace />} />
          <Route path="*" element={<Navigate to="/store" replace />} />
        </Routes>
      </Container>
    </StoreContextProvider>
  );
};

export default App;
