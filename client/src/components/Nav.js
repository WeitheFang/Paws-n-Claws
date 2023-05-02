import React from "react";
import Auth from "../utils/auth";
import { Link } from "react-router-dom";
import { Popover } from "@headlessui/react";
import { RiArrowDropDownLine } from "react-icons/ri";

import userIcon from "../assets/img/user.png";
import cartIcon from "../assets/img/cart.png";
import logo from "../assets/img/logo.png";

const NavigationBar = () => {
  return (
    <header className="p-2 text-black bg-neutral-100">
      <div className="container mx-auto flex items-center justify-between">
        <Link to="/" className="mr-3">
          <img src={logo} alt="logo" className="maw-w-[3rm] rounded-md" />
        </Link>
        <nav>
          <ul className="flex items-center gap-2">
            {Auth.loggedIn() ? (
              <>
                <li className="mx-1">
                  <Link to="/orderHistory">Order History:</Link>
                </li>
                <li className="mx-1">
                  <button
                    onClick={() => Auth.logout()}
                    className="flex items-center gap-1"
                  >
                    <span>Logout</span>
                  </button>
                </li>
              </>
            ) : (
              <>
                <li className="mx-1">
                  <Link to="/signup">Signup</Link>
                </li>
                <li className="mx-1">
                  <Link to="/login">Login</Link>
                </li>
              </>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default NavigationBar;
