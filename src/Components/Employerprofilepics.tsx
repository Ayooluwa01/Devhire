"use client";
import axios from "axios";
import { useDropzone } from "react-dropzone";
import socket from "@/lib/socket";
import { useState, useCallback, SetStateAction } from "react";

export function Employerpicture({ userid }: any) {
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
