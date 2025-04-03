"use client";
import Link from "next/link";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { logout, removeToken } from "@/Redux/Tokenslice";
import axios from "axios";
import { RootState } from "@/Redux/store";

export default function ProfileSidebar() {
  interface data {
    bio: any;
  }
  const userProfile = useSelector((state: RootState) => state.Token.userbio);
  const router = useRouter();

  // console.log("token=", userProfile);
  // console.log("userprofile : ", userProfile);

  const links = [
    {
      name: "Your Profile",
      link: `/Dashboard/userdetails/${userProfile?.id || "id"}`,
    },
    { name: "Your Settings", link: "/Dashboard/settings" },
    { name: "Saved Jobs", link: "/Dashboard/Jobs/saved-jobs" },
    { name: "Applied Jobs", link: "/Dashboard/applied-jobs" },
  ];

  return (
    <div className="p-4 h-full py-9">
      <div className="text-center">
        <img
          src="https://banner2.cleanpng.com/20180419/kje/kisspng-computer-icons-sport-clip-art-volleyball-player-5ad933de06ce78.8738085315241840300279.jpg"
          alt="User"
          className="w-16 h-16 rounded-full mx-auto"
        />
        <h2 className="text-lg font-semibold">
          {userProfile?.name || "User Name"}
        </h2>
        <p className="text-gray-500">{userProfile?.email || "User Role"}</p>
      </div>

      <div className="grid grid-cols-1 gap-7 py-8">
        {links.map(({ name, link }) => (
          <Link
            href={link}
            key={name}
            className="block bg-red-400 text-white p-4 rounded text-center"
          >
            {name}
          </Link>
        ))}
      </div>

      <div className="py-8">
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
    <div className="flex items-center justify-center ">
      <button
        onClick={handleLogout}
        className="cursor-pointer flex items-center justify-center px-6 py-3 bg-red-400 rounded-md shadow-md"
      >
        <h2 className="text-md text-white text-center font-semibold cursor-pointer">
          Logout
        </h2>
      </button>
    </div>
  );
}
