import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import ContactPage from "./pages/ContactPage";
import BlogPage from "./pages/BlogPage";
import Card from "./components/Card";
import BookingPage from "./pages/BookingPage";


function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/contactus" element={<ContactPage />} />
          <Route path="/blogs" element={<BlogPage />} />     
          <Route path="/bookings" element={<BookingPage />} />         
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
