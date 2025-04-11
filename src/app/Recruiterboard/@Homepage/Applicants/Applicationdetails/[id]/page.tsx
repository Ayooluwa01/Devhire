"use client";

import { useSearchParams } from "next/navigation";

export default function Page() {
  const searchParams = useSearchParams();
  const detailsString = searchParams.get("details");
  const details = detailsString ? JSON.parse(detailsString) : null;

  if (!details) {
    return (
      <div className="p-6 text-center text-gray-500">
        No Applicant Details Found
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center bg-gray-100 p-4 md:p-6">
      <div className="bg-white shadow-lg rounded-2xl p-4 md:p-6 w-full max-w-3xl space-y-6">
        {/* JOB DETAILS */}
        <h2 className="text-lg md:text-2xl font-bold text-center text-gray-700 border-b pb-2">
          JOB DETAILS
        </h2>

        <div className="border-t pt-4 grid grid-cols-1 gap-4 text-sm md:grid-cols-2">
          <div>
            <p className="font-semibold">Applied For:</p>
            <p className="text-gray-700">{details.title}</p>
            <p className="text-gray-500 text-sm">
              {details.company} • {details.location}
            </p>
          </div>

          <div>
            <p className="font-semibold">Work Mode:</p>
            <p className="text-gray-600">{details.work_mode}</p>
          </div>

          <div>
            <p className="font-semibold">Type:</p>
            <p className="text-gray-600">{details.type}</p>
          </div>

          <div>
            <p className="font-semibold">Job Function:</p>
            <p className="text-gray-600">{details.job_function}</p>
          </div>

          <div>
            <p className="font-semibold">Level:</p>
            <p className="text-gray-600">{details.level}</p>
          </div>

          <div>
            <p className="font-semibold">Salary:</p>
            <p className="text-gray-600">{details.salary}</p>
          </div>

          <div>
            <p className="font-semibold">Application Deadline:</p>
            <p className="text-gray-600">
              {new Date(details.application_deadline).toDateString()}
            </p>
          </div>
        </div>

        <div>
          <h3 className="font-semibold mb-1">Description</h3>
          <p className="text-gray-700 text-sm">{details.description}</p>
        </div>

        <div>
          <h3 className="font-semibold mb-1">Requirements</h3>
          <ul className="list-disc pl-5 text-gray-700 text-sm space-y-1">
            {details.requirements?.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-semibold mb-1">Benefits</h3>
          <ul className="list-disc pl-5 text-gray-700 text-sm space-y-1">
            {details.benefits?.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-semibold mb-1">Qualifications</h3>
          <p className="text-gray-700 text-sm">
            {details.qualifications?.replace(/[{}"]/g, "")}
          </p>
        </div>

        <div>
          <h3 className="font-semibold mb-1">Experience</h3>
          <p className="text-gray-700 text-sm">
            {details.experience?.replace(/[{}"]/g, "")}
          </p>
        </div>

        {/* APPLICANT DETAILS */}
        <h2 className="text-lg md:text-2xl font-bold text-center text-gray-700 border-b pt-6 pb-2">
          APPLICANT DETAILS
        </h2>

        <div className="flex flex-col md:flex-row items-center gap-4">
          <img
            src={details.imglink || "https://via.placeholder.com/100"}
            alt="Applicant Image"
            className="w-24 h-24 md:w-20 md:h-20 rounded-full object-cover"
          />
          <div className="text-center md:text-left">
            <h2 className="text-xl font-bold">{details.applicant_name}</h2>
            <p className="text-gray-500">{details.applicant_email}</p>
            <p className="text-gray-500">{details.applicant_phone}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
