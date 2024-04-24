import { Container } from "@mui/material";
import Home from "../pages/Home";
import Navbar, { MenuItem } from "./Header/NavBar";
import { Route, Routes } from "react-router-dom";
import Profile from "../pages/Profile";
import PersonIcon from '@mui/icons-material/Person';
import HomeIcon from '@mui/icons-material/Home';

const navLinks: MenuItem[] = [
  { title: "Home", path: "/", icon: <HomeIcon /> },
  { title: "Profile", path: "/profile", icon: <PersonIcon /> },
];

const App = () => {
  return (
    <>
      <Navbar navLinks={navLinks} />
      <Container maxWidth={"xl"}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </Container>
    </>
  );
};

export default App;
