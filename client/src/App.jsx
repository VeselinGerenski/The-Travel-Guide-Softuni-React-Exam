import { Route, Routes, useLocation } from "react-router"
import Footer from "./components/footer/Footer.jsx"
import Header from "./components/header/Header.jsx"
import Catalog from "./components/catalog/Catalog.jsx"
import Home from "./components/home/Home.jsx"
import Register from "./components/register/Register.jsx"
import Login from "./components/register/login/Login.jsx"
import CreateCity from "./components/create-city/CreateCity.jsx"
import DetailsCity from "./components/details-city/DetailsCity.jsx"
import EditCity from "./components/edit-city/EditCity.jsx"

function App() {
  const location = useLocation();
  const citiesBg = location.pathname === "/" || location.pathname === "/catalog"
  const backGround = citiesBg ? "cities-bg" : "default-bg"

  return (
    <div className={backGround}>
      <Header />

      <Routes >
        <Route path="/" element={<Home />} />
        <Route path="/Catalog" element={<Catalog />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/create" element={<CreateCity />} />
        <Route path="/details/:cityId" element={<DetailsCity />} />
        <Route path="/edit/:cityId" element={<EditCity />} />

      </Routes>

      <Footer />
    </div>

  )
}

export default App
