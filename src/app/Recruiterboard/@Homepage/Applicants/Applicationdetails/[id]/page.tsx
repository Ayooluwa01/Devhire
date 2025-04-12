"use client";

import socket from "@/lib/socket";
import { useSearchParams } from "next/navigation";
import {
  JSXElementConstructor,
  Key,
  ReactElement,
  ReactNode,
  ReactPortal,
  useEffect,
  useState,
} from "react";

export default function Page() {
  const searchParams = useSearchParams();
  const detailsString = searchParams.get("details");
  const details = detailsString ? JSON.parse(detailsString) : null;

  const [applicant, setApplicant] = useState([]);

  useEffect(() => {
    // Emit request to server
    socket.emit("applicantdetail", details.applicant_email);

    // Handle response from server
    const handleApplicantData = (data: any) => {
      setApplicant(data); // Store applicant data in state
    };

    // Listen for event
    socket.on("applicantdata", handleApplicantData);

    // Cleanup to avoid memory leak
    return () => {
      socket.off("applicantdata", handleApplicantData);
    };
  }, [socket, details.applicant_email]);

  const education = applicant.education ? JSON.parse(applicant.education) : [];
  const experience = applicant.experience
    ? JSON.parse(applicant.experience)
    : [];
  const skills = applicant.skills
    ? JSON.parse(
        applicant.skills
          .replace(/'/g, '"')
          .replace(/{/g, "[")
          .replace(/}/g, "]")
      )
    : [];

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

        {/*  */}
        <div className="p-4">
          <h2 className="text-lg md:text-2xl font-bold text-center text-gray-700 border-b pt-6 pb-2">
            APPLICANT DETAILS
          </h2>

          <div className="flex flex-col md:flex-row items-center gap-4 py-4">
            <img
              src={
                applicant.Profilepicture || "https://via.placeholder.com/100"
              }
              alt="Applicant"
              className="w-24 h-24 md:w-32 md:h-32 rounded-full object-cover border"
            />
            <div className="text-center md:text-left">
              <h2 className="text-xl font-bold">{applicant.name}</h2>
              <p className="text-gray-500">{applicant.email}</p>
              <p className="text-gray-500">{applicant.number}</p>
              <p className="text-gray-500">{applicant.address}</p>
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <h3 className="font-semibold text-lg border-b pb-1">Bio</h3>
              <p className="text-gray-600 mt-2">
                {applicant.bio || "No bio available"}
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-lg border-b pb-1">Skills</h3>
              <div className="flex flex-wrap gap-2 mt-2">
                {skills.length > 0 ? (
                  skills.map(
                    (
                      skill:
                        | string
                        | number
                        | bigint
                        | boolean
                        | ReactElement<
                            unknown,
                            string | JSXElementConstructor<any>
                          >
                        | Iterable<ReactNode>
                        | ReactPortal
                        | Promise<
                            | string
                            | number
                            | bigint
                            | boolean
                            | ReactPortal
                            | ReactElement<
                                unknown,
                                string | JSXElementConstructor<any>
                              >
                            | Iterable<ReactNode>
                            | null
                            | undefined
                          >
                        | null
                        | undefined,
                      i: Key | null | undefined
                    ) => (
                      <span
                        key={i}
                        className="px-2 py-1 bg-gray-200 rounded text-sm"
                      >
                        {skill}
                      </span>
                    )
                  )
                ) : (
                  <p className="text-gray-400">No skills listed</p>
                )}
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-lg border-b pb-1">Education</h3>
              {education.length > 0 ? (
                education.map((edu, i) => (
                  <div key={i} className="mt-2">
                    <p className="font-medium">{edu.school}</p>
                    <p className="text-gray-500">
                      {edu.degree} — {edu.year}
                    </p>
                  </div>
                ))
              ) : (
                <p className="text-gray-400">No education details</p>
              )}
            </div>

            <div>
              <h3 className="font-semibold text-lg border-b pb-1">
                Experience
              </h3>
              {experience.length > 0 ? (
                experience.map(
                  (
                    exp: {
                      company:
                        | string
                        | number
                        | bigint
                        | boolean
                        | ReactElement<
                            unknown,
                            string | JSXElementConstructor<any>
                          >
                        | Iterable<ReactNode>
                        | ReactPortal
                        | Promise<
                            | string
                            | number
                            | bigint
                            | boolean
                            | ReactPortal
                            | ReactElement<
                                unknown,
                                string | JSXElementConstructor<any>
                              >
                            | Iterable<ReactNode>
                            | null
                            | undefined
                          >
                        | null
                        | undefined;
                      role:
                        | string
                        | number
                        | bigint
                        | boolean
                        | ReactElement<
                            unknown,
                            string | JSXElementConstructor<any>
                          >
                        | Iterable<ReactNode>
                        | ReactPortal
                        | Promise<
                            | string
                            | number
                            | bigint
                            | boolean
                            | ReactPortal
                            | ReactElement<
                                unknown,
                                string | JSXElementConstructor<any>
                              >
                            | Iterable<ReactNode>
                            | null
                            | undefined
                          >
                        | null
                        | undefined;
                      duration:
                        | string
                        | number
                        | bigint
                        | boolean
                        | ReactElement<
                            unknown,
                            string | JSXElementConstructor<any>
                          >
                        | Iterable<ReactNode>
                        | ReactPortal
                        | Promise<
                            | string
                            | number
                            | bigint
                            | boolean
                            | ReactPortal
                            | ReactElement<
                                unknown,
                                string | JSXElementConstructor<any>
                              >
                            | Iterable<ReactNode>
                            | null
                            | undefined
                          >
                        | null
                        | undefined;
                    },
                    i: Key | null | undefined
                  ) => (
                    <div key={i} className="mt-2">
                      <p className="font-medium">{exp.company}</p>
                      <p className="text-gray-500">
                        {exp.role} — {exp.duration}
                      </p>
                    </div>
                  )
                )
              ) : (
                <p className="text-gray-400">No experience listed</p>
              )}
            </div>
          </div>
        </div>
      </div>
      {/*  */}
    </div>
  );
}
