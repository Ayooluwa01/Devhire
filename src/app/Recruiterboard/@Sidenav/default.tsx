"use client";
import Link from "next/link";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { logout, removeToken } from "@/Redux/Tokenslice";
import axios from "axios";
import { RootState } from "@/Redux/store";
import { Home, Briefcase, FileText, Star } from "lucide-react";

export default function DefaultSidenav() {
  const userProfile = useSelector((state: RootState) => state.Token.userbio);
  const router = useRouter();

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
      link: "/",
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
      <div className="text-center ">
        <img
          src="https://banner2.cleanpng.com/20180419/kje/kisspng-computer-icons-sport-clip-art-volleyball-player-5ad933de06ce78.8738085315241840300279.jpg"
          alt="User"
          className="w-20 h-20 rounded-full mx-auto border-2 border-gray-300"
        />
        <h2 className="text-lg font-semibold mt-3">
          {userProfile?.name || "User Name"}
        </h2>
        <p className="text-gray-500 text-sm">
          {userProfile?.email || "User Role"}
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
      await axios.post(
        "http://localhost:9000/logout",
        {},
        { withCredentials: true }
      );

      dispatch(logout());
      dispatch(removeToken());
      router.push("/login");
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
