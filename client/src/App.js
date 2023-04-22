import "./App.css";
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavigationBar from "./components/Nav";
import AnnouncementBanner from "./components/AnnouncementBanner";
import Home from "./pages/Home";

function App() {
  return (
    <BrowserRouter>
      <AnnouncementBanner />
      <NavigationBar />
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
