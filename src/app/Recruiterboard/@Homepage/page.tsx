import React from "react";
import { Briefcase, Edit, PlusCircle, Users } from "lucide-react";
import Link from "next/link";

export default function Homepage() {
  return (
    <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-10">
      {/* Welcome Message */}
      <div className="bg-blue-600 text-white p-6 rounded-lg shadow-md text-center ">
        <h1 className="text-2xl font-bold">Hello, Ayooluwa!</h1>
        <p className="mt-2 text-sm">
          Looking for jobs? Browse our latest job openings to view & apply to
          the best jobs today!
        </p>
      </div>

      {/* Job Posted Section */}
      <div className="bg-gray-200 p-6 rounded-lg shadow-md text-center">
        <h1 className="text-2xl font-bold text-gray-700">Job Posted</h1>
        <p className="mt-2 text-xl font-semibold text-gray-800">0</p>
        <p className="text-gray-600">Jobs Posted So Far</p>
      </div>

      {/* Post a New Job */}
      <div className="bg-white p-6 rounded-lg shadow-md text-center border border-gray-300 cursor-pointer">
        <PlusCircle className="w-10 h-10 text-blue-600 mx-auto" />
        <h2 className="text-xl font-semibold mt-2 text-gray-700">
          <Link href="/Recruiterboard/Jobposting">Post a New Job</Link>
        </h2>
        <p className="text-gray-500 text-sm mt-1">
          Create and publish new job listings.
        </p>
      </div>

      {/* Edit Previous Jobs */}
      <div className="bg-white p-6 rounded-lg shadow-md text-center border border-gray-300 cursor-pointer">
        <Edit className="w-10 h-10 text-yellow-600 mx-auto" />
        <h2 className="text-xl font-semibold mt-2 text-gray-700">
          <Link href="/Recruiterboard/Alljobs"> Edit Previous Jobs </Link>
        </h2>
        <p className="text-gray-500 text-sm mt-1">
          Modify or update job postings.
        </p>
      </div>

      {/* Manage Applications */}
      <div className="bg-white p-6 rounded-lg shadow-md text-center border border-gray-300 cursor-pointer">
        <Briefcase className="w-10 h-10 text-green-600 mx-auto" />
        <h2 className="text-xl font-semibold mt-2 text-gray-700">
          Manage Applications
        </h2>
        <p className="text-gray-500 text-sm mt-1">
          Review and manage job applications.
        </p>
      </div>

      {/* View Candidates */}
      <div className="bg-white p-6 rounded-lg shadow-md text-center border border-gray-300 cursor-pointer">
        <Users className="w-10 h-10 text-purple-600 mx-auto" />
        <h2 className="text-xl font-semibold mt-2 text-gray-700">
          View Candidates
        </h2>
        <p className="text-gray-500 text-sm mt-1">
          Explore and evaluate potential candidates.
        </p>
      </div>
    </div>
  );
}
