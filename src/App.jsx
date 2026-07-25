import './App.css'
import {Routes, Route} from "react-router";

// import Navbar from './components/navbar/Navbar'
import{HomePage, Shop, About, Contact,} from "./pages/index.jsx";

function App() {


  return (
    <>
        <Routes>
  {/* <Navbar /> */}
  <Route path="/" index element={<HomePage />} />
         {/* <Route path="/features" element={<Features />} /> */}
         <Route path="/shop" element={<div>test</div>} />
         <Route path="/about" element={<About/>} />
         <Route path="/contact" element={<Contact/>} />

         </Routes>

    </>
  )
}

export default App
