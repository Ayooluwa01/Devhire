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
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/Redux/store";
import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";
import axios from "axios";
import { logout, removeToken } from "@/Redux/Tokenslice";

export default function Navbar() {
  const [click, setClick] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter();
  const userProfile = useSelector((state: RootState) => state.Token.userbio);
  const handleLogout = async () => {
    try {
      document.cookie = "next-auth.session-token=; max-age=0; path=/";
      document.cookie = "role=; max-age=0; path=/";
      await signOut({ redirect: false });
      await axios.post(
        "http://192.168.122.198:9000/logout",
        {},
        { withCredentials: true }
      );
      setClick((prev) => !prev);
      router.push("/login");
      window.location.reload();
      dispatch(logout());
      dispatch(removeToken());
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };
  // const [text] = useTypewriter({
  //   words: [
  //     "WELCOME TO DEVHIRE - A PLATFORM FOR DEVELOPERS TO GET JOBS WITH EASE",
  //     "DEVHIRE - A PLACE MEANT TO BE",
  //   ],
  //   loop: 0,
  // });

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

      {/* Main Navigation */}
      <nav className="flex items-center justify-between w-full px-6 py-2 z-20  bg-blue-600 text-white shadow-md ">
        {/* Left Section */}
        <div className="flex items-center space-x-6">
          <h3 className="text-lg font-bold">Devhire</h3>
          <Link href="#" className="text-sm hover:text-red-500 py-2">
            How DevHire Works
          </Link>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-6">
          <Link href="/Dashboard" className="hover:text-red-500">
            JOBS
          </Link>
          <Link href="#" className="hover:text-red-500">
            CHATS
          </Link>
        </div>

        {/* Right Section */}
        <div className="hidden lg:flex space-x-4 ">
          <Link href="#" className="hover:text-red-500 py-2">
            FACEBOOK
          </Link>
          <Link href="/login" className="hover:text-red-500 py-2">
            LINKELDN
          </Link>
          <Link
            href="/Signup"
            className="bg-red-600 px-4 py-2 rounded hover:bg-red-700"
          >
            GITHUB
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
            className="fixed top-0 left-0 w-full h-screen bg-blue-950 text-white flex flex-col items-center space-y-6 py-10 z-50"
          >
            <nav className="grid grid-cols-1 gap-8 text-center text-lg">
              <XCircleIcon
                className="h-12 w-32 cursor-pointer"
                onClick={toggleMenu}
              />
              <Link
                href={`/Dashboard`}
                className="hover:text-red-600 font-medium"
                onClick={toggleMenu}
              >
                FIND JOBS
              </Link>

              <Link
                href={`/Dashboard`}
                className="hover:text-red-600 font-medium"
                onClick={toggleMenu}
              >
                CHATS
              </Link>
              {/* <Link
                href={`/Dashboard/userdetails/${userProfile?.id || "id"}`}
                className="hover:text-red-600 font-medium"
                onClick={toggleMenu}
              >
                SAVED JOBS
              </Link>
              <Link
                href={`/Dashboard/userdetails/${userProfile?.id || "id"}`}
                className="hover:text-red-600 font-medium"
                onClick={toggleMenu}
              >
                PROFILE
              </Link>
              <Link
                href="#"
                className="hover:text-red-600 font-medium"
                onClick={toggleMenu}
              >
                SETTINGS
              </Link>
              <Link
                href="#"
                className="hover:text-red-600 font-medium"
                onClick={toggleMenu}
              >
                SAVED JOBS
              </Link>
              <Link
                href="#"
                className="hover:text-red-600 font-medium"
                onClick={toggleMenu}
              >
                APPLIED JOBS
              </Link> */}
              <Link
                href="#"
                className="hover:text-red-600 font-medium"
                onClick={handleLogout}
              >
                LOG OUT
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
