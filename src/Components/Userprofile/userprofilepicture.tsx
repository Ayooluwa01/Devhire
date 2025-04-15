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
export function USerProfilepicture({ userid }: any) {
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
