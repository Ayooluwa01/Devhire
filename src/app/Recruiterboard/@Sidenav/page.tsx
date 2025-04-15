"use client";
import Link from "next/link";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { logout, removeToken } from "@/Redux/Tokenslice";
import axios from "axios";
import { useDropzone } from "react-dropzone";
import { RootState } from "@/Redux/store";
import { Home, Briefcase, FileText, Star } from "lucide-react";
import socket from "@/lib/socket";
import { useState, useEffect, useCallback, SetStateAction } from "react";
import Cookies from "js-cookie";

export default function Sidenav() {
  const userProfile = useSelector((state: RootState) => state.Token.userbio);
  const userpics = useSelector((state: RootState) => state.Token.userprofile);
  const dispatch = useDispatch();
  const router = useRouter();

  const [profile, setProfile] = useState(userpics.logoimage);

  useEffect(() => {
    const handleProfilePicUpdate = (ppics: string) => {
      setProfile(ppics);
    };

    socket.on("logoimage", handleProfilePicUpdate);

    // Cleanup socket listener when component unmounts or userProfile changes
    return () => {
      socket.off("logo", handleProfilePicUpdate);
    };
  }, [userProfile?.user_id]);

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
        <EmployerProfilepicture userid={userProfile?.user_id} />
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
    </div>
  );
}

function EmployerProfilepicture({ userid }: any) {
  return (
    <div className="mt-4">
      <EmployerFileUploadForm userid={userid} />
    </div>
  );
}

function EmployerFileUploadForm({ userid }: any) {
  const [files, setFiles] = useState<File[]>([]);

  const onDrop = useCallback((acceptedFiles: SetStateAction<File[]>) => {
    setFiles(acceptedFiles);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [], // images only
    },
    multiple: false, // just 1 profile picture ideally
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (files.length === 0) return alert("Please select a file");

    const formData = new FormData();
    const api = "f96ff36c5f624e202a69ace510f36ea0";
    formData.append("file", files[0]);
    formData.append("api_key", api);

    try {
      const res = await axios.post(
        "https://api.imghippo.com/v1/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (res.data?.data?.view_url) {
        const picurlObject = { picurl: res.data.data.view_url, userid };
        socket.emit("logo", picurlObject);
      } else {
        alert("Image upload failed.");
      }
    } catch (err) {
      console.error("Upload error:", err);
      alert("Error uploading image, please try again.");
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
          <li className="text-sm text-gray-700">{files[0].name}</li>
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

function LogoutButton() {
  const dispatch = useDispatch();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await signOut({ redirect: false });
      Cookies.remove("next-auth.session-token", { path: "/" });
      Cookies.remove("role", { path: "/" });
      router.push("/login");
      dispatch(logout());
      dispatch(removeToken());
    } catch (error) {
      console.error("Logout failed:", error);
      alert("Error logging out. Please try again.");
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
