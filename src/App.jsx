import { Route, Routes } from "react-router"
import Footer from "./components/footer/Footer.jsx"
import Header from "./components/header/Header.jsx"
import Home from "./components/home/Home.jsx"
import Login from "./components/auth/login/Login.jsx"
import CreateCity from "./components/create-city/CreateCity.jsx"
import DetailsCity from "./components/details-city/DetailsCity.jsx"
import EditCity from "./components/edit-city/EditCity.jsx"
import useBackground from "./hooks/useBackground.js"
import Page404 from "./components/page-404/Page404.jsx"
import Profile from "./components/profile/Profile.jsx"
import Register from "./components/auth/register/Register.jsx"
import Logout from "./components/auth/logout/Logout.jsx"
import AuthGuard from "./components/auth/guards/AuthGuard.jsx"
import GuestGuard from "./components/auth/guards/GuestGuard.jsx"
import Destinations from "./components/destinations/Destinations.jsx"

function App() {
  return (
    <div className={useBackground()}>
      <Header />

      <Routes >
        <Route path="/" element={<Home />} />
        <Route path="/destinations" element={<Destinations />} />
        <Route path="/details/:cityId" element={<DetailsCity />} />

        <Route element={<GuestGuard />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>

        <Route element={<AuthGuard />}>
          <Route path="/logout" element={<Logout />} />
          <Route path="/create" element={<CreateCity />} />
          <Route path="/edit/:cityId" element={<EditCity />} />
          <Route path="/profile" element={<Profile />} />
        </Route>

        <Route path="*" element={<Page404 />} />
      </Routes>

      <Footer />
    </div>

  )
}

export default App
