import { Route, Routes } from "react-router"
import Footer from "./components/footer/Footer.jsx"
import Header from "./components/header/Header.jsx"
import Catalog from "./components/catalog/Catalog.jsx"
import Home from "./components/home/Home.jsx"
import Register from "./components/register/Register.jsx"
import Login from "./components/login/Login.jsx"
import CreateCity from "./components/create-city/CreateCity.jsx"
import DetailsCity from "./components/details-city/DetailsCity.jsx"
import EditCity from "./components/edit-city/EditCity.jsx"
import Page404 from "./components/page-404/Page404.jsx"
import useBackground from "./hooks/useBackground.js"
import GuestGuard from "./components/guards/GuestGuard.jsx"
import AuthGuard from "./components/guards/AuthGuard.jsx"

function App() {

  return (
    <div className={useBackground()}>
      <Header />

      <Routes >
        <Route path="/" element={<Home />} />
        <Route path="/Catalog" element={<Catalog />} />
        <Route path="/details/:cityId" element={<DetailsCity />} />

        <Route element={<GuestGuard />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>

        <Route element={<AuthGuard />}>
          <Route path="/create" element={<CreateCity />} />
          <Route path="/edit/:cityId" element={<EditCity />} />
        </Route>

        <Route path="*" element={<Page404 />} />
      </Routes>

      <Footer />
    </div>

  )
}

export default App
