import { Container } from "@mui/material";
import { Navigate, Route, Routes } from "react-router-dom";
import useShoppingCart from "../hooks/useShoppingCart";
import { Product } from "../interfaces/Product";
import CartPage from "../pages/CartPage";
import StorePage from "../pages/StorePage";
import Navbar from "./Header/NavBar";
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
  const [
    shoppingCart,
    isLoading,
    categories,
    productsFiltered,
    category,
    search,
    setShoppingCart,
    setSearch,
    setCategory,
    handleRemoveCategory,
    handleRemoveSearch,
    handleRemoveAllItemsCart,
    handleAddProductToCart,
    handleRemoveProductFromCart,
  ] = useShoppingCart();

  return (
    <>
      <Navbar
        shoppingCart={shoppingCart}
        search={search}
        setSearch={setSearch}
        cartProducts={shoppingCart}
        handleRemoveAllItemsCart={handleRemoveAllItemsCart}
        handleAddProductToCart={handleAddProductToCart}
        handleRemoveProductFromCart={handleRemoveProductFromCart}
      />
      <Container maxWidth={"xl"}>
        <Routes>
          <Route
            path="/store"
            element={
              <StorePage
                shoppingCart={shoppingCart}
                setShoppingCart={setShoppingCart}
                isLoading={isLoading}
                products={productsFiltered}
                categories={categories}
                category={category}
                setCategory={setCategory}
                search={search}
                handleRemoveCategory={handleRemoveCategory}
                handleRemoveSearch={handleRemoveSearch}
              />
            }
          />
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
    </>
  );
};

export default App;
