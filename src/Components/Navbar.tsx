"use client";
import Image from "next/image";
import logo from "../Images/logo.png";
import Link from "next/link";
import { useTypewriter, Cursor } from "react-simple-typewriter";
import {
  AdjustmentsHorizontalIcon,
  XCircleIcon,
} from "@heroicons/react/24/solid";
import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";

export default function Navbar() {
  const [click, setClick] = useState(false);
  const [text] = useTypewriter({
    words: ["WELCOME TO DEVHIRE "],
    loop: 0,
  });

  const toggleMenu = () => {
    setClick((prev) => !prev);
  };

  // Prevent background scrolling when menu is open
  useEffect(() => {
    if (click) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [click]);

  return (
    <>
      {/* Header */}
      <nav className="bg-white shadow-md p-3">
        <div className="flex flex-row items-center justify-center w-full sticky">
          <Image
            src={logo}
            width={20}
            height={80}
            alt="DevHire Logo"
            className="mr-4"
          />
          <div className="text-gray-700 text-lg font-medium text-center max-w-[70%]">
            {text} <Cursor cursorColor="red" />
          </div>
        </div>
      </nav>

      {/* Main Navigation */}
      <nav className="flex items-center justify-between w-full px-6 py-2 bg-[#040554] text-white shadow-md sticky">
        {/* Left Section */}
        <div className="flex items-center space-x-6">
          <h3 className="text-lg font-bold">Devhire</h3>
          <Link href="#" className="text-sm hover:text-red-500 py-2">
            How DevHire Works
          </Link>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-6">
          <Link href="#" className="hover:text-red-500">
            JOBS
          </Link>
          <Link href="#" className="hover:text-red-500">
            COMPANIES
          </Link>
          <Link href="#" className="hover:text-red-500">
            POST A JOB
          </Link>
        </div>

        {/* Right Section */}
        <div className="hidden lg:flex space-x-4 ">
          <Link href="#" className="hover:text-red-500 py-2">
            FOR EMPLOYERS
          </Link>
          <Link href="/login" className="hover:text-red-500 py-2">
            LOG IN
          </Link>
          <Link
            href="/Signup"
            className="bg-red-600 px-4 py-2 rounded hover:bg-red-700"
          >
            SIGN UP
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex">
          {!click && (
            <AdjustmentsHorizontalIcon
              className="h-7 w-7 cursor-pointer"
              onClick={toggleMenu}
            />
          )}
        </div>
      </nav>

      {/* Mobile Menu (Animated) */}
      <AnimatePresence>
        {click && (
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="fixed top-0 left-0 w-full h-screen bg-[#040554] text-white flex flex-col items-center space-y-6 py-10 z-50"
          >
            <nav className="grid grid-cols-1 gap-8 text-center text-lg">
              <XCircleIcon
                className="h-12 w-32 cursor-pointer"
                onClick={toggleMenu}
              />
              <Link href="#" className="hover:text-red-600 font-medium">
                JOBS
              </Link>
              <Link href="#" className="hover:text-red-600 font-medium">
                COMPANIES
              </Link>
              <Link href="/" className="hover:text-red-600 font-medium">
                POST A JOB
              </Link>
              <Link href="/login" className="hover:text-red-600 font-medium">
                SIGN IN
              </Link>
              <Link href="/Signup" className="hover:text-red-600 font-medium">
                SIGN UP
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
