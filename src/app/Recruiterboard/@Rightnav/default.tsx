"use client";
import React, { useEffect, useState } from "react";
import { Bell, MessageCircle, PhoneCall } from "lucide-react";
import socket from "@/lib/socket";
import { useSelector } from "react-redux";
import { RootState } from "@/Redux/store";
type Applicant = {
  email: any;
  applicant_name: string;
  Profilepicture: any;
  title: string;
};
export default function DefaultApplicantsList() {
  const userid = useSelector((state: RootState) => state.Token.userbio);
  const [applicantdata, setApplicatdata] = useState<Applicant[]>([]);

  useEffect(() => {
    if (!userid?.user_id) return;
    socket.emit("employerConnect", userid.user_id);

    socket.emit("getapplicants", userid.user_id);
    socket.on("applicants", (data) => {
      setApplicatdata(data);
    });

    return () => {
      socket.off("getapplicants"); // Cleanup event listener if needed
      socket.off("applicants");
    };
  }, [userid?.user_id, socket]);

  return (
    <div className="flex bg-gray-100 p-6 rounded-lg shadow-lg w-full max-w-3xl mx-auto relative">
      {/* Left Section: Applicants List */}
      <div className="flex-1 bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold text-gray-700">New Applicants</h2>
        <p className="text-gray-500 text-sm">Today</p>
        <div className="mt-4 space-y-4">
          {applicantdata.map((applicant, index) => (
            <div
              key={index}
              className="flex items-center gap-4 p-2 hover:bg-gray-100 rounded-lg"
            >
              <img
                src={
                  applicant.Profilepicture || "https://via.placeholder.com/40"
                }
                alt="Profile"
                className="w-10 h-10 rounded-full object-cover"
              />
              <div>
                <p className="font-medium text-gray-800">
                  {applicant.applicant_name}
                </p>
                <p className="text-sm text-gray-500">
                  Applied for {applicant.title}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Right Section: Actions (Fixed to Right Side) */}
      <div className="flex flex-col items-center bg-white p-4 rounded-lg shadow-md overflow-hidden fixed right-16 top-1/2 transform -translate-y-1/2">
        <button className="p-2 rounded-full bg-gray-200 hover:bg-gray-300 mb-3">
          <MessageCircle className="w-5 h-5 text-gray-600" />
        </button>
        <button className="p-2 rounded-full bg-gray-200 hover:bg-gray-300 mb-3">
          <Bell className="w-5 h-5 text-gray-600" />
        </button>
        <button className="p-2 rounded-full bg-gray-200 hover:bg-gray-300">
          <PhoneCall className="w-5 h-5 text-gray-600" />
        </button>
      </div>
    </div>
  );
}
