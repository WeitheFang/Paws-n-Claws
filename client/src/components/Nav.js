import React from "react";
import { Popover } from "@headlessui/react";
import { RiArrowDropDownLine } from "react-icons/ri";

import userIcon from "../assets/img/user.png";
import cartIcon from "../assets/img/cart.png";
import logo from "../assets/img/logo.png";

const NavigationBar = () => {
  return (
    <header className="flex w-full h-40 px-10 py-2">
      <div className="flex w-1/6 h-full items-center justify-center">Logo</div>
      <div className="flex flex-col justify-between h-full w-full bg-gray-400">
        <div>
          <form>
            <label
              htmlFor="default-search"
              className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
            >
              Search
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <svg
                  aria-hidden="true"
                  className="w-5 h-5 text-gray-500 dark:text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  ></path>
                </svg>
              </div>
              <input
                type="search"
                id="default-search"
                className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Search Mockups, Logos..."
                required
              />
              <button
                type="submit"
                className="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Search
              </button>
            </div>
          </form>
        </div>
        <div className="flex items-center justify-between">
          <Popover className="relative">
            <Popover.Button className="flex justify-between">
              Solutions {<RiArrowDropDownLine />}
            </Popover.Button>

            <Popover.Panel className="absolute z-10">
              <div className="flex flex-col justify-between p-2 bg-amber-100">
                <a href="/analytics">Analytics</a>
                <a href="/engagement">Engagement</a>
                <a href="/security">Security</a>
                <a href="/integrations">Integrations</a>
              </div>
            </Popover.Panel>
          </Popover>
        </div>
      </div>
    </header>
  );
};

export default NavigationBar;
