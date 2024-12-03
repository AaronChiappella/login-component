"use client";

import { useSession } from "next-auth/react";
import React, { useState } from "react";
import { Button } from "./button";
import { signOut } from "next-auth/react";
import Link from "next/link";




const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { data: session, status } = useSession();






  return (
    <nav className="bg-blue-600 text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="text-lg font-bold">MyLogo</div>

          {/* Hamburger Button (Mobile) */}
          <div className="flex lg:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-white focus:outline-none"
            >
              <svg
                className="h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
                />
              </svg>
            </button>
          </div>

          {/* Menu */}
          <div
            className={`${
              isOpen ? "block" : "hidden"
            } lg:flex lg:items-center lg:space-x-6`}
          >
            <a href="/" className="block py-2 px-3 rounded-lg hover:bg-blue-500">
              Home
            </a>

            
            
            {session ? (
                <Button variant="destructive" onClick={() => signOut({ callbackUrl: "/" })}>
                    Logout
                </Button>
            ) : (
                <Link href="/login">
                <Button variant="default">Login</Button>
              </Link>            
            )}
          




          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
