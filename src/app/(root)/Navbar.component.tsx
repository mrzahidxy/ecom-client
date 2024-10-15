"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import { FiMenu, FiShoppingCart } from "react-icons/fi";
import { Sidebar } from "./Siebar.component";
import { signOut, useSession } from "next-auth/react";
import { CiLogin } from "react-icons/ci";
import useCartStore from "@/store/useStore";

type Props = {};

export const Navbar = (props: Props) => {
  const { data: session, status } = useSession();
  const [dropdownVisible, setDropDownVisible] = useState<boolean>(false);
  const [showSidebar, setShowSidebar] = useState<boolean>(false);
  const [fixedNavbar, setFixedNavbar] = useState<number>(0);
  const cartItems = useCartStore((state) => state.cartItems);

  const cartItemsCount = cartItems.length;

  // /console.log(cartItems)

  const handleDropdownClick = () => {
    setDropDownVisible(!dropdownVisible);
  };

  const handleScrollHeight = () => {
    setFixedNavbar(window.scrollY);
  };

  useEffect(() => {
    addEventListener("scroll", handleScrollHeight);
  }, []);

  return (
    <nav
      className={`w-full py-3 px-3 md:px-10 shadow-md ${
        fixedNavbar > 100 ? "fixed z-50 bg-white" : ""
      }`}
    >
      <div className="flex flex-row justify-between items-center container">
        <Link
          href="/"
          className="flex items-center gap-1 text-2xl font-semibold"
        >
          <FiShoppingCart className=" text-blue-500" /> Buynow
        </Link>
        {showSidebar && <Sidebar setShowSidebar={setShowSidebar} />}

        <button
          className="block md:hidden"
          onClick={() => setShowSidebar((prevShowSidebar) => !prevShowSidebar)}
        >
          <FiMenu />
        </button>

        <div className="hidden md:flex gap-6 items-center cursor-pointer text-2xl">
          <div className="flex flex-row items-center gap-1 relative group">
            <Link href="/cart" className="flex items-center relative">
              <span className="absolute left-5 bottom-3 text-xs bg-blue-500 text-white px-1 rounded-full">
                {cartItemsCount}
              </span>{" "}
              <FiShoppingCart />
            </Link>
          </div>

          {session?.user ? (
            <div
              className="relative group flex gap-1 items-center"
              onClick={handleDropdownClick}
            >
              {/* <Image width={100} height={100} alt=""
                  src="https://fakeimg.pl/200/"
                  className="w-6 h-6 rounded-full cursor-pointer"
                /> */}
              <span className="text-lg">{session?.user?.name}</span>

              {dropdownVisible && (
                <div className="z-10 absolute right-0 mt-2 py-2 w-36 bg-white border border-gray-300 rounded shadow-lg top-[30px]">
                  <Link
                    href={"/profile"}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Profile
                  </Link>
                  <Link
                    href={"/order"}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Orders
                  </Link>
                  <button
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    onClick={() => signOut()}
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link
              className="text-sm flex items-center font-semibold space-x-2"
              href={"/auth/login"}
            >
              <CiLogin className="text-xl" />
              <span>Login</span>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};
