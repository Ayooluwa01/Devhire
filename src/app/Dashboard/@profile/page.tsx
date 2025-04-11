"use client";

import Link from "next/link";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { logout, removeToken } from "@/Redux/Tokenslice";
import axios from "axios";
import { RootState } from "@/Redux/store";
import { User, Settings, Bookmark, Briefcase, LogOut } from "lucide-react";

export default function ProfileSidebar() {
  const userProfile = useSelector((state: RootState) => state.Token.userbio);
  const router = useRouter();

  const links = [
    {
      name: "Your Profile",
      icon: <User className="w-5 h-5 mr-2" />,
      link: `/Dashboard/userdetails/${userProfile?.id || "id"}`,
    },
    {
      name: "Your Settings",
      icon: <Settings className="w-5 h-5 mr-2" />,
      link: "/Dashboard",
    },
    {
      name: "Saved Jobs",
      icon: <Bookmark className="w-5 h-5 mr-2" />,
      link: "/Dashboard/Jobs/saved-jobs",
    },
    {
      name: "Applied Jobs",
      icon: <Briefcase className="w-5 h-5 mr-2" />,
      link: "/Dashboard/Jobs/applied-jobs",
    },
  ];

  return (
    <div className="p-6 h-full bg-white shadow-lg rounded-2xl">
      <div className="text-center">
        <img
          src="https://i.pravatar.cc/150?img=3"
          alt="User"
          className="w-20 h-20 rounded-full mx-auto shadow-md"
        />
        <h2 className="text-xl font-semibold mt-4">
          {userProfile?.name || "User Name"}
        </h2>
        <p className="text-gray-500 text-sm">
          {userProfile?.email || "user@email.com"}
        </p>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-4 space-y-9">
        {links.map(({ name, link, icon }) => (
          <Link
            href={link}
            key={name}
            className="flex items-center  justify-start px-4 py-3 text-gray-700 hover:bg-gradient-to-r hover:from-red-400 hover:to-red-600 hover:text-white rounded-lg transition-all duration-300"
          >
            {icon}
            <span className="text-sm font-medium">{name}</span>
          </Link>
        ))}
      </div>

      <div className="mt-8">
        <LogoutButton />
      </div>
    </div>
  );
}

export function LogoutButton() {
  const dispatch = useDispatch();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      document.cookie = "next-auth.session-token=; max-age=0; path=/";
      document.cookie = "role=; max-age=0; path=/";
      await signOut({ redirect: false });
      await axios.post(
        "http://localhost:9000/logout",
        {},
        { withCredentials: true }
      );

      router.push("/login");
      window.location.reload();
      dispatch(logout());
      dispatch(removeToken());
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <button
      onClick={handleLogout}
      className="flex items-center justify-center w-full px-4 py-3 bg-gradient-to-r from-red-400 to-red-600 text-white font-medium rounded-lg hover:scale-105 transition-all duration-300 shadow-md"
    >
      <LogOut className="w-5 h-5 mr-2" />
      Logout
    </button>
  );
}
