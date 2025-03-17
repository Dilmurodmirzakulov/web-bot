import React, { useContext, useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavbarMenu from "./components/NavbarMenu";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import Exchange from "./pages/Exchange";
import Profile from "./pages/Profile";
import BonusProgram from "./pages/BonusProgram";
import About from "./pages/About";
import { getData } from "./api/data";
import { ExchangeDataContext } from "./ExchangeDataContext";

function App() {
  const { setData } = useContext(ExchangeDataContext);
  const handleGetData = async () => {
    try {
      const res = await getData("692196525");
      setData(res.data);
    } catch (error) {
      console.error("Error:", error);
    }
  }; 

  useEffect(() => {
    handleGetData();
  }, []);
  return (
    <Router>
      <NavbarMenu />
      <div className="mt-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/exchange" element={<Exchange />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/bonus" element={<BonusProgram />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </div>
      <Footer />
    </Router>
  );
}

export default App;
