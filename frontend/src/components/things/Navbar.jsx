import React, { useEffect, useRef, useState } from "react";
import Button from "./Buttons";
import { Link } from "react-router-dom";
import { useMutation, useQuery } from "@apollo/client";
import { GET_AUTH_USER } from "../../graphql/queries/user.query";
import { LOGOUT } from "../../graphql/mutations/user.mutation";
import { MdLogout } from "react-icons/md";
import { FaBars, FaTimes } from "react-icons/fa";

const Navbar = () => {
  const { data } = useQuery(GET_AUTH_USER);
  // console.log("authUserData", data);

  const [logout, { loading, client }] = useMutation(LOGOUT, {
    // refetchQueries: [{ query: GET_AUTH_USER }],

    refetchQueries: ["GetAuthUsers"],
    // [{ query: GET_AUTH_USER }],
  });

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = async () => {
    // console.log("user is logging out");

    try {
      const { data } = await logout();
      // console.log("Logout response:", data);

      // Sometimes, you might want to reset the cache entirely, such as when a user logs out.
      //  To accomplish this, call client.resetStore.
      //  This method is asynchronous, because it also refetches any of your active queries.
      //when i doesn't reset the cache, ma vanda paila jo user thiyo useko transaction aauxa mero dashboard ma,
      // and i need to refresh the page to fetch mine, there are others methods also, such as: bypassing cache, persisting cache etc.
      //  Read documentation for better understanding

      client.resetStore();
    } catch (error) {
      console.error("Error logging out", error);
      toast.error(error.message);
    }

    // console.log("Logging out ...");
  };

  return (
    <div className="bg-zinc-100 z-20 flex px-4 sm:px-16 py-2 text-md justify-between items-center w-full  top-0">
      <img src="/logos.svg" alt="PennyPal" className="h-20" />

      <button
        className="sm:hidden text-2xl text-gray-800 focus:outline-none"
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
      >
        {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
      </button>

      <div className="hidden sm:flex gap-6 cursor-pointer">
        <Link to="/" className="hover:text-[#0070f0]">
          Home
        </Link>
        {data.authUser && (
          <Link to="/transactions" className="hover:text-[#0070f0]">
            Transactions
          </Link>
        )}

        {data.authUser && (
          <Link to="/dashboard" className="hover:text-[#0070f0]">
            Dashboard
          </Link>
        )}

        <Link to="/pricing" className="hover:text-[#0070f0]">
          Pricing
        </Link>
        <Link to="/about" className="hover:text-[#0070f0]">
          About
        </Link>
      </div>

      {/* mobile view  */}
      {isMobileMenuOpen && (
        <div className="absolute top-16 left-0 w-full bg-green-200/90 sm:hidden flex flex-col items-center gap-4 py-4 z-50">
          <Link
            to="/new"
            className="hover:text-[#0070f0]"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Home
          </Link>
          <Link
            to="/transactions"
            className="hover:text-[#0070f0]"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Transactions
          </Link>
          <Link
            to="/dashboard"
            className="hover:text-[#0070f0]"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Dashboard
          </Link>
          <Link
            to="/pricing"
            className="hover:text-[#0070f0]"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Pricing
          </Link>
          <Link
            to="/about"
            className="hover:text-[#0070f0]"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            About
          </Link>
        </div>
      )}

      {/* User Profile and Login/Logout */}
      <div className="flex gap-2 items-center" ref={dropdownRef}>
        {data?.authUser && (
          <img
            src={data?.authUser?.profilePicture}
            className="w-10 h-10 rounded-full border cursor-pointer"
            alt="Avatar"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          />
        )}

        {isDropdownOpen && (
          <div className="absolute right-4 z-50 top-12 mt-2 w-36 bg-white rounded-lg shadow-lg border border-gray-200">
            <div className="p-3">
              <p className="text-sm font-semibold text-gray-800">
                Name: {data.authUser.name}
              </p>
              <p className="text-xs pt-1 text-gray-600">
                Username: {data.authUser.username}
              </p>
              <p className="text-xs pt-1 text-gray-600">
                Gender: {data.authUser.gender}
              </p>
            </div>
            <hr className="border-gray-200 border-[1px]" />
            <button
              onClick={handleLogout}
              className="w-full text-left text-sm text-gray-700 cursor-pointer hover:bg-gray-100 px-2 py-1"
            >
              Logout
            </button>
          </div>
        )}

        {loading && (
          <div className="w-6 h-6 border-t-2 border-white border-b-2 mx-2 rounded-full animate-spin"></div>
        )}

        {/* {!data?.authUser && (
          <Link
            to="/login"
            className="bg-blue-600/80 py-2 text-zinc-100 px-3 rounded-full font-medium text-md cursor-pointer"
          >
            Login
          </Link>
        )} */}
        
        {
          !data.authUser && (
            <div className="flex gap-3">
              <Link
                to="/login"
                className="bg-blue-600/80 py-2 text-zinc-100 px-3  rounded-full font-medium text-md cursor-pointer"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="bg-green-600/90 py-2 text-zinc-100 px-3  rounded-full font-medium text-md cursor-pointer"
              >
                Signup
              </Link>
            </div>
          )
          // : (
          //   <button
          //     onClick={handleLogout}
          //     className="
          //     bg-red-600/80 text-zinc-100 px-3  rounded-full font-medium text-md cursor-pointer"
          //   >
          //     Logout
          //   </button>)
        }
        {/* {!loading && (
      <button onClick={handleLogout} className="relative z-50">
        <MdLogout className="mx-2 w-5 h-5 text-zinc-300/80 cursor-pointer" />
      </button>
      )} */}
      </div>
    </div>
  );
};

export default Navbar;

{
  /* {!loading && (
  <button
    onClick={handleLogout}
    className={` ${
      !data.authUser ? "bg-[#0070f0]" : "bg-red-600/80"
    } text-zinc-100 px-3  rounded-full font-medium text-md cursor-pointer`}
  >
    {!data.authUser ? "Login" : "LogOut"}
  </button>
)} */
}
