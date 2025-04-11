"use client";
import socket from "@/lib/socket";
import { RootState } from "@/Redux/store";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

type Applicant = {
  email: string;
  img?: string;
  applicant_name: string;
  title: string;
};

export default function ApplicantsPage() {
  return (
    <div>
      <AllApplicantsList />
    </div>
  );
}

export function AllApplicantsList() {
  const userid = useSelector((state: RootState) => state.Token.userbio);
  const [applicantdata, setApplicatdata] = useState<Applicant[]>([]);

  useEffect(() => {
    if (!userid?.user_id) return;

    socket.emit("employerConnect", userid.user_id);
    socket.emit("getallapplicants", userid.user_id);

    socket.on("allapplicants", (data: Applicant[]) => {
      setApplicatdata(data);
    });

    return () => {
      socket.off("allapplicants");
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
                query: { details: JSON.stringify(applicant) },
              }}
            >
              <div className="flex items-center gap-4 p-2 hover:bg-gray-100 rounded-lg">
                <img
                  src={applicant.img || "https://via.placeholder.com/40"}
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
