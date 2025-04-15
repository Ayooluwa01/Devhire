"use client";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import axios from "axios";
import { RootState } from "@/Redux/store";
import { logout, removeToken, storeprofile } from "@/Redux/Tokenslice";
import { User, Settings, Bookmark, Briefcase, LogOut } from "lucide-react";
import { signOut } from "next-auth/react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import socket from "@/lib/socket";
import Link from "next/link";

export default function ProfileSidebar() {
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

      <div className="mt-8 grid grid-cols-1 gap-4 space-y-3">
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

function LogoutButton() {
  const dispatch = useDispatch();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      document.cookie = "next-auth.session-token=; max-age=0; path=/";
      document.cookie = "role=; max-age=0; path=/";
      // await signOut({ redirect: false });
      router.push("/login");
      Cookies.remove("next-auth.session-token", { path: "/" });
      Cookies.remove("role", { path: "/" });
      await signOut({ redirect: false });

      dispatch(logout());
      dispatch(removeToken());
      // await axios.post(
      //   "https://devhire-backend.onrender.com/logout",
      //   {},
      //   { withCredentials: true }
      // );

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

function Profilepicture({ userid }: any) {
  return (
    <div className="mt-4">
      <FileUploadForm userid={userid} />
    </div>
  );
}

function FileUploadForm({ userid }: any) {
  const [files, setFiles] = useState([]);
  const onDrop = useCallback((acceptedFiles) => {
    setFiles(acceptedFiles);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [], // images only
    },
    multiple: false, // just 1 profile picture ideally
  });

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (files.length === 0) return alert("Please select a file");

    const formData = new FormData();
    const api = "f96ff36c5f624e202a69ace510f36ea0";
    formData.append("file", files[0]);
    formData.append("api_key", api);

    try {
      // Replace with your upload endpoint
      const res = await axios.post(
        "https://api.imghippo.com/v1/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (res) {
        const picurlObject = { picurl: res.data.data.view_url, userid };
        socket.emit("ppics", picurlObject);
      } else {
        alert("Image upload failed.");
      }
    } catch (err) {
      console.error("Upload error:", err);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto p-1 border rounded-lg"
    >
      <div
        {...getRootProps()}
        className={`border-2 border-dashed p-10 text-center cursor-pointer rounded-lg ${
          isDragActive ? "bg-gray-100" : ""
        }`}
      >
        <input {...getInputProps()} />
        {isDragActive ? (
          <p>Drag your image here...</p>
        ) : (
          <p>Drag & drop or click to select your profile picture</p>
        )}
      </div>

      {files.length > 0 && (
        <ul className="mt-2">
          {FormData && (
            <li className="text-sm text-gray-700">{files[0].name}</li>
          )}
        </ul>
      )}
      <button
        type="submit"
        className="mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Upload
      </button>
    </form>
  );
}
