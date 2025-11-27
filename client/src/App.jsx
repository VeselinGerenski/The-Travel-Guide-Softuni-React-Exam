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
import UserContext from "./contexts/UserContext.js"
import { useState } from "react"

function App() {
  const [user, setUser] = useState({});

  const loginHandler = (user) => {
    setUser(user) 
  };

  const logoutHandler = () => {
    setUser({})
  }

  const contextValue = {
    user,
    isAuthenticated: !!user.email,
    onLogin: loginHandler,
    onLogout: logoutHandler,
  }

  return (
    <div className={useBackground()}>
      <UserContext.Provider value={contextValue}>
        <Header />

        <Routes >
          <Route path="/" element={<Home />} />
          <Route path="/Catalog" element={<Catalog />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/create" element={<CreateCity />} />
          <Route path="/details/:cityId" element={<DetailsCity />} />
          <Route path="/edit/:cityId" element={<EditCity />} />

          <Route path="*" element={<Page404 />} />
        </Routes>
        <Footer />

      </UserContext.Provider>
    </div>

  )
}

export default App
