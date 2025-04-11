"use client";
import Link from "next/link";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { logout, removeToken } from "@/Redux/Tokenslice";
import { RootState } from "@/Redux/store";
import { Home, Briefcase, FileText, Star } from "lucide-react";
import socket from "@/lib/socket";
import Cookies from "js-cookie";

import { useState, useEffect } from "react";
import { Profilepicture } from "@/app/Dashboard/@profile/page";

export default function DefaultSidenav() {
  const userProfile = useSelector((state: RootState) => state.Token.userbio);
  let userpics = useSelector((state: RootState) => state.Token.userprofile);
  const dispatch = useDispatch();

  const [profile, setProfile] = useState(userpics.Profilepicture);
  useEffect(() => {
    socket.on("ppics", (ppics) => {
      setProfile(ppics);
    });

    // socket.on("Profile", (data) => {
    //   dispatch(storeprofile(data));
    // });

    return () => {
      socket.off("ppics");
      socket.off("Profile");
    };
  }, [socket, dispatch, userProfile.user_id]);
  const links = [
    {
      name: "Dashboard",
      link: `/Recruiterboard`,
      icon: <Home className="w-5 h-5 inline mr-2" />,
    },
    {
      name: "Jobs",
      link: "/Recruiterboard/Alljobs",
      icon: <Briefcase className="w-5 h-5 inline mr-2" />,
    },
    {
      name: "Applications",
      link: "/Recruiterboard/Applicants",
      icon: <FileText className="w-5 h-5 inline mr-2" />,
    },
    {
      name: "Saved Talents",
      link: "/Dashboard/applied-jobs",
      icon: <Star className="w-5 h-5 inline mr-2" />,
    },
  ];

  return (
    <div className="h-screen w-full bg-white shadow-lg left-0 top-0 p-6 flex flex-col justify-between">
      {/* User Profile */}
      <div className="text-center">
        <img
          src={profile}
          alt="User"
          className="w-20 h-20 rounded-full mx-auto shadow-md"
        />

        <Profilepicture userid={userProfile.user_id} />
        <h2 className="text-xl font-semibold mt-4">
          {userProfile?.name || "User Name"}
        </h2>
        <p className="text-gray-500 text-sm">
          {userProfile?.email || "user@email.com"}
        </p>
      </div>

      {/* Navigation Links */}
      <nav className="mt-6 flex-1">
        {links.map(({ name, link, icon }) => (
          <Link
            href={link}
            key={name}
            className="py-7 px-4 rounded-lg hover:bg-gray-200 text-gray-700 font-medium flex items-center "
          >
            {icon} {name}
          </Link>
        ))}
        <LogoutButton />
      </nav>

      {/* Logout Button */}
    </div>
  );
}

function LogoutButton() {
  const dispatch = useDispatch();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await signOut({ redirect: false });
      // await axios.post(
      //   "http://https://devhire-backend.onrender.com/logout",
      //   {},
      //   { withCredentials: true }
      // );
      Cookies.remove("next-auth.session-token", { path: "/" });
      Cookies.remove("role", { path: "/" });
      router.push("/login");
      dispatch(logout());
      dispatch(removeToken());
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <button
      onClick={handleLogout}
      className="w-full py-3 mt-3 bg-red-500 text-white rounded-lg text-center cursor-pointer font-semibold shadow-md hover:bg-red-600"
    >
      Logout
    </button>
  );
}
