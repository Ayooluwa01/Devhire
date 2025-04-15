"use client";
import React, { useEffect, useState } from "react";
import { Bell, MessageCircle, PhoneCall } from "lucide-react";
import socket from "@/lib/socket";
import { useSelector } from "react-redux";
import { RootState } from "@/Redux/store";
import Link from "next/link";

type Applicant = {
  email: any;
  applicant_name: string;
  Profilepicture: any;
  title: string;
};
export default function ApplicantsList() {
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
      socket.off("getapplicants");
      socket.off("applicants");
    };
  }, [userid?.user_id]);

  return (
    <div className="flex bg-gray-100 p-6 rounded-lg shadow-lg w-full max-w-3xl mx-auto relative">
      <div className="flex-1 bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold text-gray-700">Applicants</h2>
        <p className="text-gray-500 text-sm">List of all applicants</p>

        <div className="mt-4 space-y-4">
          {applicantdata.map((applicant, index) => (
            <Link
              key={index}
              href={{
                pathname: `/Recruiterboard/Applicants/Applicationdetails/${applicant.email}`,
                query: { details: JSON.stringify(applicant) }, // Send only that applicant's data
              }}
            >
              <div className="flex items-center gap-4 p-2 hover:bg-gray-100 rounded-lg">
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
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
