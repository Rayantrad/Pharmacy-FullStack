import React from "react";
import Navbar from "../Components/Navbar"
import Footer from "../Components/Footer"
import { Outlet } from "react-router";

function MainLayout() {
  return (
    <div>
      <Navbar />
        <div className="min-h-[80vh]">
          <Outlet />
        </div>
      <Footer />
    </div>
  );
}

export default MainLayout;
