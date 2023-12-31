import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Avatar from "./Avatar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAddressCard, faBars, faCircleArrowUp, faPenToSquare, faUser, faXmark } from "@fortawesome/free-solid-svg-icons";
import { getTasks } from "../redux/action/Task";

const Nav = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const auth = useSelector((state) => state.authReducer);
  const token = useSelector((state) => state.authReducer.token);
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
  };

  const closeHamburger = () => {
    setMenuOpen(false);
  }

  useEffect(() => {
    if(token){
      dispatch(getTasks());
    }
  }, [token, dispatch]);

  return (
    <nav className={` bg-white-800 shadow-md w-full dark:bg-gray-700 bg-gray-200 p-2 ${menuOpen && "transition-all duration-700 ease-in" }`}>
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white font-bold text-xl">
        <div className="inset-y-0 left-0 flex items-center">
            <img
              className="block lg:hidden h-10 w-auto"
              src="https://www.svgrepo.com/show/384978/donut-doughnut-sweet-dessert-food-fastfood.svg"
              alt="Logo"
            />
            <img
              className="hidden lg:block h-10 w-auto"
              src="https://www.svgrepo.com/show/384978/donut-doughnut-sweet-dessert-food-fastfood.svg"
              alt="Logo"
            />
          </div>
          
        </div>
        <div className="flex w-2/3 items-center ml-1">
          <label htmlFor="simple-search" className="sr-only">
            Search
          </label>
          <div className="relative w-full">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none ">
              <svg
                className="w-4 h-4"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="black"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
            </div>
            <input
              style={{
                borderBottom: "1px solid #ffbf00",
              }}
              type="text"
              id="simple-search"
              className="
                rounded-md
                focus:outline-none
                bg-white-50  text-gray-900 text-sm  focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5 max-sm:h-8 bg-gray-50 dark:bg-gray-700 dark:text-gray-200"
              placeholder="Search post by name..."
              required=""
            />
          </div>
        </div>
        {auth && auth?.token && (
          <div className="md:hidden ml-3">
              <Avatar auth={auth} />
            
          </div>
        )}
        {/* Hamburger menu button */}
        <div className="md:hidden">
          <button
            onClick={toggleMenu}
            className="ml-2 dark:text-gray-100 text-gray-900 hover:text-gray-300 focus:outline-none"
          >
            {menuOpen ? (
              <FontAwesomeIcon icon={faXmark} width={"30"} height={"40"} />
            ) : (
              <FontAwesomeIcon icon={faBars} width={"30"} height={"40"}/>
            )}
          </button>
        </div>

        {/* Navigation links for medium screens and larger */}
        <div
          className={`hidden md:flex space-x-4 ${
            menuOpen ? "block md:block" : "hidden"
          }`}
        >
          {auth.loaded && auth.token ? (
             <></>
          ) : (
            <div className="flex item-center">
              {location.pathname === "/login" ||
              location.pathname === "/signup" ||
              location.pathname === "/reset-password" ||
              location.pathname === "/forgot-password" ? (
                <></>
              ) : (
                <>
                  <button
                    className=" inline-block w-full rounded px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_rgba(0,0,0,0.2)] transition duration-150 ease-in-out hover:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus:outline-none focus:ring-0 active:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] bg-gradient-to-r from-pink-500 to-yellow-500 hover:from-pink-600 hover:to-yellow-600"
                    // hover:from-green-400 hover:to-blue-500
                    type="button"
                    data-te-ripple-init=""
                    data-te-ripple-color="light"
                    onClick={() => navigate("/login")}
                  >
                    Login
                  </button>
                  <button
                    className=" border-[#fuchsia] ml-2 inline-block w-full rounded px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-gray-900 dark:text-gray-50 hover:text-white shadow-[0_4px_9px_-4px_rgba(0,0,0,0.2)] transition duration-150 ease-in-out hover:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus:outline-none focus:ring-0 active:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] bg-gradient-to-r hover:from-pink-600 hover:to-yellow-600 max-sm:hidden"
                    type="button"
                    data-te-ripple-init=""
                    data-te-ripple-color="light"
                    onClick={() => navigate("/signup")}
                  >
                    Signup
                  </button>
                </>
              )}
            </div>
          )}
        </div>

        {/* Avatar and logout button */}
        <div className={`md:flex hidden items-center `}>
          {auth && auth?.token && (
            <>
              <Link to={`/user/${auth?.user?.id}`}>
                <Avatar auth={auth} />
              </Link>

              <svg
                onClick={handleLogout}
                className="ml-4 hover:cursor-pointer transition duration-300 transform hover:scale-110"
                xmlns="http://www.w3.org/2000/svg"
                width="25px"
                height="25px"
                viewBox="0 0 24 24"
                fill="none"
              >
                <defs>
                  <linearGradient
                    id="gradient"
                    x1="0%"
                    y1="0%"
                    x2="100%"
                    y2="0%"
                  >
                    <stop offset="0%" stopColor="#ec4899" />
                    <stop offset="100%" stopColor="#eab308" />
                  </linearGradient>
                </defs>
                <path
                  d="M15 16.5V19C15 20.1046 14.1046 21 13 21H6C4.89543 21 4 20.1046 4 19V5C4 3.89543 4.89543 3 6 3H13C14.1046 3 15 3.89543 15 5V8.0625M11 12H21M21 12L18.5 9.5M21 12L18.5 14.5"
                  className="fill-gradient-to-r from-pink-500 to-yellow-500 hover:from-pink-600 hover:to-yellow-600"
                  stroke="url(#gradient)"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </>
          )}
        </div>
      </div>

      {/* Mobile menu for md:screen */}
      <div
        className={`mt-5 md:hidden flex-col items-center transition-${menuOpen} ease-in-out duration-700 ${
          menuOpen ? "flex " : "hidden"
        }`}
      >
        {auth && auth?.token ? (
          <div onClick={closeHamburger}>
            <Link
              to={`/user/${auth?.user?.id}`}
              className="text-gray-900 dark:text-gray-50 hover:bg-gray-700 hover:text-white block py-2 rounded-md text-sm font-medium"
            ><FontAwesomeIcon icon={faUser} className="mr-2"/>
              Profile
            </Link>
            <Link
              to={`/user/edit/${auth?.user?.id}`}
              className="text-gray-900 dark:text-gray-50 hover:bg-gray-700 hover:text-white block py-2 rounded-md text-sm font-medium"
            ><FontAwesomeIcon icon={faPenToSquare} className="mr-2"/>
              Edit profile
            </Link>
            <Link
              to={`/create-post`}
              className="text-gray-900 dark:text-gray-50 hover:bg-gray-700 hover:text-white block py-2 rounded-md text-sm font-medium"
            ><FontAwesomeIcon icon={faCircleArrowUp} className="mr-2"/>
              New +
            </Link>
            <Link
              to="/about"
              className="text-gray-900 dark:text-gray-50 hover:bg-gray-700 hover:text-white block py-2 rounded-md text-sm font-medium"
            ><FontAwesomeIcon icon={faAddressCard} className="mr-2" />
              About Us
            </Link>
          </div>
        ) : (
          <>
            <Link
              to="/about"
              className="text-gray-900 dark:text-gray-50 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium mr-3"
            >
              About Us
            </Link>
          </>
        )}

        <div className="flex items-center mt-4 flex-col">
          {auth && auth?.token ? (
            <button
              className="bg-gradient-to-r from-pink-500 to-yellow-500 hover:from-pink-600 hover:to-yellow-600 text-white font-bold py-2 px-4 rounded"
              onClick={handleLogout}
            >
              Logout
            </button>
          ) : (
            <div onClick={closeHamburger}>
              <button
                className="m-2 inline-block w-full rounded px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_rgba(0,0,0,0.2)] transition duration-150 ease-in-out hover:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus:outline-none focus:ring-0 active:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] bg-gradient-to-r from-pink-500 to-yellow-500 hover:from-pink-600 hover:to-yellow-600"
                // hover:from-green-400 hover:to-blue-500
                type="button"
                data-te-ripple-init=""
                data-te-ripple-color="light"
                onClick={() => navigate("/login")}
              >
                Login
              </button>
              <button
                className="ml-1 border-[#fuchsia] m-2 inline-block w-full rounded px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-gray-900 dark:text-gray-50 hover:text-white shadow-[0_4px_9px_-4px_rgba(0,0,0,0.2)] transition duration-150 ease-in-out hover:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus:outline-none focus:ring-0 active:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] bg-gradient-to-r after:from-pink-600 after:to-yellow-600 "
                type="button"
                data-te-ripple-init=""
                data-te-ripple-color="light"
                onClick={() => navigate("/signup")}
              >
                Signup
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Nav;