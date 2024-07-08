import { Box, Container } from "@mui/material";
import { useContext } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import ShoppingCartContextProvider from "../hooks/ShoppingCartContextProvider";
import StoreContextProvider from "../hooks/StoreContextProvider";
import { UserContext } from "../hooks/UserContextProvider";
import { Product } from "../interfaces/Product";
import { ROLE } from "../interfaces/User";
import AdminProductsPage from "../pages/private/AdminProductsPage";
import CartPage from "../pages/public/CartPage";
import LoginPage from "../pages/public/LoginPage";
import StoreDetailPage from "../pages/public/StoreDetailPage";
import StorePage from "../pages/public/StorePage";
import Footer from "./Footer/Footer";
import Navbar from "./Header/NavBar";
import { extendTheme } from "@chakra-ui/react";
import OrdersPage from "../pages/private/OrdersPage";

export const themeChakra = extendTheme({
  colors: {
    brand: { 50: "#FFFFFF", 500: "#000000" },
  },
});

export interface ProductCart {
  product: Product;
  amount: number;
}

const App = () => {
  const userContext = useContext(UserContext);
  const { user } = userContext;
  return (
    <StoreContextProvider>
      <ShoppingCartContextProvider>
        <Box position={"relative"} minHeight={"100vh"} paddingBottom={"100px"}>
          <Navbar />
          <Container maxWidth={"xl"}>
            <Routes>
              <Route path="/store" element={<StorePage />} />
              <Route path="/store/details/:productId" element={<StoreDetailPage />} />
              <Route path="/cart" element={<CartPage />} />
              <Route
                path="/login"
                element={
                  <ProtectedRouteIsLogged role={user.role}>
                    <LoginPage />
                  </ProtectedRouteIsLogged>
                }
              />
              <Route
                path="/admin/products"
                element={
               //   <ProtectedRouteAdmin role={user.role}>
                    <AdminProductsPage />
                //  </ProtectedRouteAdmin>
                }
              />
              <Route
                path="/admin/orders"
                element={
                  <ProtectedRouteAdmin role={user.role}>
                    <OrdersPage />
                  </ProtectedRouteAdmin>
                }
              />
              <Route
                path="/user/orders"
                element={
                  <ProtectedRouteUser role={user.role}>
                    <OrdersPage />
                  </ProtectedRouteUser>
                }
              />
              <Route index element={<Navigate to="/store" replace />} />
              <Route path="*" element={<Navigate to="/store" replace />} />
            </Routes>
          </Container>
          <Footer />
        </Box>
      </ShoppingCartContextProvider>
    </StoreContextProvider>
  );
};

interface ProtectedRoute {
  role: ROLE;
  redirectPath?: string;
  children: any;
}

const ProtectedRouteAdmin = ({ role, redirectPath = "/login", children }: ProtectedRoute) => {
  return protectedRoute(role, ROLE.ADMIN, redirectPath, children);
};

const ProtectedRouteUser = ({ role, redirectPath = "/login", children }: ProtectedRoute) => {
  return protectedRoute(role, ROLE.USER, redirectPath, children);
};

const ProtectedRouteIsLogged = ({ role, redirectPath = "/store", children }: ProtectedRoute) => {
  return protectedRoute(role, ROLE.NOT_LOGGED, redirectPath, children);
};

const protectedRoute = (role: ROLE, roleToCompare: ROLE, redirectPath: string, children: any) => {
  if (role !== roleToCompare) return <Navigate to={redirectPath} replace />;
  return children;
};

export default App;
