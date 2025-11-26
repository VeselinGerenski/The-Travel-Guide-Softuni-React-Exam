import { Route, Routes } from "react-router"
import Footer from "./components/footer/Footer.jsx"
import Header from "./components/header/Header.jsx"
import Catalog from "./components/catalog/Catalog.jsx"
import Home from "./components/home/Home.jsx"
import Register from "./components/register/Register.jsx"

function App() {

  return (
    <div className="default-bg">
      <Header />

      <Routes >

        <Route path="/" element={<Home />} />
        <Route path="/Catalog" element={<Catalog />} />
        <Route path="/register" element={<Register />} />

        
      </Routes>

      <Footer />
    </div>

  )
}

export default App
