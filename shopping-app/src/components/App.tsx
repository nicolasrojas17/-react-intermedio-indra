import HomeIcon from "@mui/icons-material/Home";
import PersonIcon from "@mui/icons-material/Person";
import { Container } from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import { Product } from "../interfaces/Product";
import Home from "../pages/Home";
import Profile from "../pages/Profile";
import { getProducts } from "../services/productService";
import Navbar, { MenuItem } from "./Header/NavBar";

const navLinks: MenuItem[] = [
  { title: "Home", path: "/", icon: <HomeIcon /> },
  { title: "Cart", path: "/cart", icon: <PersonIcon /> },
];

export interface ProductCart {
  idProduct: number;
  amount: number;
}

const App = () => {
  const [shoppingCart, setShoppingCart] = useState<ProductCart[]>([]);

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [products, setProducts] = useState<Product[]>([]);
  const [productsFiltered, setProductsFiltered] = useState<Product[]>(products);

  const [search, setSearch] = useState<string>(() => {
    const searchParams = new URLSearchParams(window.location.search);
    return searchParams.get("q") ?? "";
  });

  const fetchProducts = useCallback(async () => {
    await getProducts(setProducts, setIsLoading);
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  useEffect(() => setProductsFiltered(products), [products]);
  useEffect(() => {
    setProductsFiltered(products.filter((product) => product.title.toLowerCase().includes(search.toLowerCase())));
  }, [search, products]);

  return (
    <>
      <Navbar navLinks={navLinks} shoppingCart={shoppingCart} search={search} setSearch={setSearch} />
      <Container maxWidth={"xl"}>
        <Routes>
          <Route
            path="/"
            element={
              <Home
                shoppingCart={shoppingCart}
                setShoppingCart={setShoppingCart}
                isLoading={isLoading}
                products={productsFiltered}
              />
            }
          />
          <Route
            path="/home"
            element={
              <Home
                shoppingCart={shoppingCart}
                setShoppingCart={setShoppingCart}
                isLoading={isLoading}
                products={productsFiltered}
              />
            }
          />
          <Route path="/cart" element={<Profile />} />
        </Routes>
      </Container>
    </>
  );
};

export default App;
