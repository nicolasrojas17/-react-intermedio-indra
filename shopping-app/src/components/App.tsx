import { Container } from "@mui/material";
import { Navigate, Route, Routes } from "react-router-dom";
import ShoppingCartContextProvider from "../hooks/ShoppingCartContextProvider";
import StoreContextProvider from "../hooks/StoreContextProvider";
import { Product } from "../interfaces/Product";
import CartPage from "../pages/CartPage";
import StoreDetailPage from "../pages/StoreDetailPage";
import StorePage from "../pages/StorePage";
import Navbar from "./Header/NavBar";
import LoginPage from "../pages/LoginPage";

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
  return (
    <StoreContextProvider>
      <ShoppingCartContextProvider>
        <Navbar />
        <Container maxWidth={"xl"}>
          <Routes>
            <Route path="/store" element={<StorePage />} />
            <Route path="/store/details/:productId" element={<StoreDetailPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route index element={<Navigate to="/store" replace />} />
            <Route path="*" element={<Navigate to="/store" replace />} />
          </Routes>
        </Container>
      </ShoppingCartContextProvider>
    </StoreContextProvider>
  );
};

export default App;
