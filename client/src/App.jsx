import { Route, Routes } from "react-router"
import Footer from "./components/footer/Footer.jsx"
import Header from "./components/header/Header.jsx"
import Catalog from "./components/catalog/Catalog.jsx"
import Home from "./components/home/Home.jsx"

function App() {

  return (
    <div className="default-bg">
      <Header />

      <Routes >

        <Route path="/Catalog" element={<Catalog />} />
        <Route path="/" element={<Home />} />
        
      </Routes>

      <Footer />
    </div>

  )
}

export default App
