import { Container } from "@mui/material";
import Home from "../pages/Home";
import Navbar, { MenuItem } from "./Header/NavBar";
import { Route, Routes } from "react-router-dom";
import Profile from "../pages/Profile";
import PersonIcon from "@mui/icons-material/Person";
import HomeIcon from "@mui/icons-material/Home";
import { useState } from "react";

const navLinks: MenuItem[] = [
  { title: "Home", path: "/", icon: <HomeIcon /> },
  { title: "Profile", path: "/profile", icon: <PersonIcon /> },
];

export interface ProductCart {
  idProduct: number;
  amount: number;
}

const App = () => {
  const [shoppingCart, setShoppingCart] = useState<ProductCart[]>([]);

  return (
    <>
      <Navbar navLinks={navLinks} shoppingCart={shoppingCart} />
      <Container maxWidth={"xl"}>
        <Routes>
          <Route path="/" element={<Home shoppingCart={shoppingCart} setShoppingCart={setShoppingCart} />} />
          <Route path="/home" element={<Home shoppingCart={shoppingCart} setShoppingCart={setShoppingCart} />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </Container>
    </>
  );
};

export default App;
