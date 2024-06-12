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
  const [categories, setCategories] = useState<string[]>([]);

  const [productsFiltered, setProductsFiltered] = useState<Product[]>(products);
  const [category, setCategory] = useState<string>("");

  const [search, setSearch] = useState<string>(() => {
    const searchParams = new URLSearchParams(window.location.search);
    return searchParams.get("q") ?? "";
  });

  const fetchProducts = useCallback(async () => {
    await getProducts(setProducts, setIsLoading);
  }, []);

  const handleRemoveCategory = () => setCategory("");
  const handleRemoveSearch = () => {
    setSearch("");
    window.history.pushState({}, "", window.location.pathname);
  };

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  useEffect(() => setProductsFiltered(products), [products]);

  useEffect(() => {
    const categoriesSearch = products.map((product) => product.category);
    const uniqueCategories = [...new Set(categoriesSearch)];
    setCategories(uniqueCategories);
  }, [products]);

  useEffect(() => {
    let filtered = products;
    if (category) filtered = filtered.filter((product) => product.category === category);
    if (search) filtered = filtered.filter((product) => product.title.toLowerCase().includes(search.toLowerCase()));
    setProductsFiltered(filtered);
  }, [category, products, search]);

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
            path="/home"
            element={
              <Home
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
          <Route path="/cart" element={<Profile />} />
        </Routes>
      </Container>
    </>
  );
};

export default App;
