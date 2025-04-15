"use client"; // Mark this as a Client Component

import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/Redux/store";
import socket from "@/lib/socket";
import Link from "next/link";
import { useRouter } from "next/navigation";
type UserBio = {
  user_id: number;
  name?: string;
  email?: string;
  // add any other fields you expect
};
export default function Employerjobdetails({ details, jobId }: any) {
  const [saved, setSaved] = useState(false);
  const employer_id = useSelector((state: RootState) => state.Token.userbio);
  const route = useRouter();

  //   const savejob = () => {

  //     socket.emit("savejob", ids);
  //     setSaved(true);
  //   };

  useEffect(() => {
    socket.on("jobdeleted", (info) => {
      route.push("/Recruiterboard/Alljobs");
    });
    return () => {
      socket.off("jobdeleted"); // Cleanup listener
    };
  }, [socket]);

  const deletejob = () => {
    const ids = [jobId, employer_id?.user_id];
    socket.emit("deletejob", ids);
  };

  return (
    <div className="container mx-auto p-6">
      <div className="bg-white rounded-lg p-6 mt-6">
        <p className="text-lg text-gray-600 mt-1 flex flex-row">
          <img
            src={details.imglink}
            className="w-24 rounded-full shadow-xl "
            alt="Company Logo"
          />
        </p>
        <br />
        <h1 className="text-2xl font-bold text-gray-800">{details.title}</h1>

        <p className="text-lg text-gray-600 mt-1">{details.salary}</p>

        <span className="inline-block text-sm font-semibold text-white bg-blue-500 px-3 py-1 rounded-full mt-2">
          {details.location}
        </span>
        <span className="inline-block text-sm font-semibold text-white bg-green-500 px-3 py-1 rounded-full ml-2">
          {details.type}
        </span>
        <span className="inline-block text-sm font-semibold text-white bg-purple-500 px-3 py-1 rounded-full ml-2">
          {details.work_mode}
        </span>

        <h2 className="text-xl font-semibold mt-6">Job Description</h2>
        <p className="text-gray-700 mt-2">{details.description}</p>

        <h2 className="text-xl font-semibold mt-6">Requirements</h2>
        <ul className="list-disc list-inside text-gray-700 mt-2">
          {details.requirements.map((req: string, index: number) => (
            <li key={index}>{req}</li>
          ))}
        </ul>

        <h2 className="text-xl font-semibold mt-6">Benefits</h2>
        <ul className="list-disc list-inside text-gray-700 mt-2">
          {details.benefits.map((benefit: string, index: number) => (
            <li key={index}>{benefit}</li>
          ))}
        </ul>

        <h2 className="text-xl font-semibold mt-6">Qualifications</h2>
        <p className="text-gray-700 mt-2">{details.qualifications}</p>

        <h2 className="text-xl font-semibold mt-6">Experience</h2>
        <p className="text-gray-700 mt-2">{details.experience}</p>

        {details.application_deadline && (
          <p className="mt-6 text-red-600 font-semibold">
            Application Deadline: {details.application_deadline}
          </p>
        )}

        <p>
          <span
            className={`inline-block text-lg font-semibold text-white px-3 py-3 cursor-pointer rounded-md mt-2 ${
              saved ? "bg-gray-500" : "bg-blue-500"
            }`}
          >
            <Link
              href={{
                pathname: `/Recruiterboard/Jobposting/Editjobs/${jobId}`,
                query: { details: JSON.stringify(details) },
              }}
            >
              Edit Job
            </Link>
          </span>
          <span
            className="inline-block text-lg font-semibold text-white bg-green-500 px-3 py-3 cursor-pointer rounded-md ml-2"
            onClick={deletejob}
          >
            Delete Job
          </span>
        </p>
      </div>
    </div>
  );
}
