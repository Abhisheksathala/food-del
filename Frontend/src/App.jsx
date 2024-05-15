import React, { useState } from 'react'
import { Routes, Route } from 'react-router-dom'

import Navbar from './components/Navbar/Navbar'
import PlaceOrder from './pages/placeOrder/PlaceOrder';
import Cart from './pages/Cart/Cart';
import Footer from './components/Footer/Footer';
import Home from './pages/Home/Home';
import LoginpopUP from './components/LoginpopUp/LoginpopUP';
import Verify from './pages/verify/verify';
import Myorders from "./pages/Myorders/Myorders"
const App = () => {

const [showLogin,setshowLogin] = useState(false)

  return (
    <>
    {
      showLogin?<LoginpopUP setshowLogin={setshowLogin}/>:null
    }
    <div className='app'>
      <Navbar setshowLogin={setshowLogin}/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/order" element={<PlaceOrder />} />
        <Route path="/verify" element={<Verify />} />
        <Route path="/myorders" element={<Myorders />} />
        
       
      </Routes>
      <Footer></Footer>
    </div>
    </>
  )
}

export default App
