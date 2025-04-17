"use client";
import React, { useEffect, useState } from "react";
import { Briefcase, Edit, PlusCircle, Users } from "lucide-react";
import Link from "next/link";
import socket from "@/lib/socket";
import { useSelector } from "react-redux";
import { RootState } from "@/Redux/store";

export default function Homepage() {
  const userid = useSelector((state: RootState) => state.Token.userbio);
  const [numberofjobs, setnumberofjobs] = useState();
  useEffect(() => {
    socket.emit("Totalofalljobs", userid?.user_id);
    socket.on("Totalofjobs", (numberofjobs) => {
      setnumberofjobs(numberofjobs);
    });

    return () => {
      socket.off("Totalofjobs");
    };
  }, [socket]);
  return (
    <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-10">
      {/* Welcome Message */}
      <div className="bg-blue-600 text-white p-6 rounded-lg shadow-md text-center ">
        <h1 className="text-2xl font-bold">Hello, {userid?.name}</h1>
        <p className="mt-2 text-sm">
          Looking for jobs? Browse our latest job openings to view & apply to
          the best jobs today!
        </p>
      </div>

      {/* Job Posted Section */}
      <div className="bg-gray-200 p-6 rounded-lg shadow-md text-center">
        <h1 className="text-2xl font-bold text-gray-700">Job Posted</h1>
        <p className="mt-2 text-xl font-semibold text-gray-800">
          {numberofjobs}
        </p>
        <p className="text-gray-600">Jobs Posted So Far</p>
      </div>

      {/* Post a New Job */}
      <Link href="/Recruiterboard/Jobposting" className="block">
        <div className="relative bg-white p-6 rounded-lg shadow-md text-center border border-gray-300 cursor-pointer">
          <PlusCircle className="w-10 h-10 text-blue-600 mx-auto" />
          <h2 className="text-xl font-semibold mt-2 text-gray-700">
            Post a New Job
          </h2>
          <p className="text-gray-500 text-sm mt-1">
            Create and publish new job listings.
          </p>
        </div>
      </Link>

      {/* Edit Previous Jobs */}
      <Link href="/Recruiterboard/Alljobs">
        <div className="bg-white p-6 rounded-lg shadow-md text-center border border-gray-300 cursor-pointer">
          <Edit className="w-10 h-10 text-yellow-600 mx-auto" />
          <h2 className="text-xl font-semibold mt-2 text-gray-700">
            Edit Previous Jobs
          </h2>
          <p className="text-gray-500 text-sm mt-1">
            Modify or update job postings.
          </p>
        </div>
      </Link>

      {/* Manage Applications */}
      <Link href="/Recruiterboard/Alljobs">
        <div className="bg-white p-6 rounded-lg shadow-md text-center border border-gray-300 cursor-pointer">
          <Briefcase className="w-10 h-10 text-green-600 mx-auto" />
          <h2 className="text-xl font-semibold mt-2 text-gray-700">
            Manage Applications
          </h2>
          <p className="text-gray-500 text-sm mt-1">
            Review and manage job applications.
          </p>
        </div>
      </Link>

      {/* View Candidates */}
      <Link href="/Recruiterboard/Applicants">
        <div className="bg-white p-6 rounded-lg shadow-md text-center border border-gray-300 cursor-pointer">
          <Users className="w-10 h-10 text-purple-600 mx-auto" />
          <h2 className="text-xl font-semibold mt-2 text-gray-700">
            View Candidates
          </h2>
          <p className="text-gray-500 text-sm mt-1">
            Explore and evaluate potential candidates.
          </p>
        </div>
      </Link>
    </div>
  );
}
