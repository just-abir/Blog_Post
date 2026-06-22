import React from "react";
import Navbar from "./section/Navbar";
import Hero from "./section/Hero";
import { Routes, Route } from "react-router-dom";
import Signup from "./section/Signup.";

const App = () => {
  return (
    <div className="bg-emerald-900">
      <Navbar />

      <Routes>
        <Route path="/" element={<Hero />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </div>
  );
};

export default App;
