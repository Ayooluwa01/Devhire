"use client";
import Workexperiencecard from "@/Components/Workexperince";
import socket from "@/lib/socket";
import { RootState } from "@/Redux/store";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export default function Userdetailpage() {
  const [profilebtn, setprofilebtn] = useState(false);
  const userProfile = useSelector(
    (state: RootState) => state.Token.userprofile
  );
  const userBio = useSelector((state: RootState) => state.Token.userprofile);

  useEffect(() => {
    if (!userBio?.bio) {
      setprofilebtn(true); // Set the button to true if bio is missing
    }
  }, [userBio]); // Only run this effect when userBio changes

  return (
    <div>
      <div></div>
      <div className="flex items-center space-x-4 gap-y-7">
        <img
          src="https://banner2.cleanpng.com/20180419/kje/kisspng-computer-icons-sport-clip-art-volleyball-player-5ad933de06ce78.8738085315241840300279.jpg"
          alt="User"
          className="w-16 h-16 rounded-full"
        />
        <div>
          <h2 className="text-lg font-semibold">{userProfile.name}</h2>
          <p className="text-gray-500">{userProfile.role}</p>
          {profilebtn && (
            <p className="text-white bg-blue-600 cursor-pointer rounded-lg px-4 py-2 hover:bg-blue-700 transition-colors">
              <Link href="/Dashboard/profile">Complete your Profile</Link>
            </p>
          )}
        </div>
      </div>

      <div className="border-2 border-gray-100 my-7"></div>

      {/* Bio */}

      <div>
        <div className="my-3">
          <p className="text-md font-semibold">Short Bio</p>
        </div>
        <p className="text-md ">{userBio?.bio || "N/A"}</p>
      </div>
      <div className="border-2 border-gray-100 my-7"></div>
      <Skillsection />
      <div className="border-2 border-gray-100 my-7"></div>
      <Workexperience />
      <div className="border-2 border-gray-100 my-7"></div>
      <Education />
    </div>
  );
}

export function Skillsection() {
  const userBio = useSelector((state: RootState) => state.Token.userprofile);

  let skills: string[] = [];

  if (typeof userBio.skills === "string") {
    // Ensure proper formatting by removing special characters
    skills = userBio.skills
      .replace(/[{}"]/g, "") // Remove `{}`, and extra `"`
      .split(",") // Split into an array
      .map((skill) => skill.trim()); // Trim spaces
  } else if (Array.isArray(userBio.skills)) {
    skills = userBio.skills;
  }

  return (
    <div className="cursor-pointer">
      <div className="my-3">
        <p className="text-md font-semibold">Skills</p>
      </div>
      <div className="flex flex-row gap-x-4 flex-wrap gap-y-2 ">
        {skills.map((skill, index) => (
          <span
            key={index}
            className="bg-blue-600 px-4 py-2 text-white  p-3 border border-gray-300 rounded-lg shadow-md"
          >
            {skill}
          </span>
        ))}
      </div>
    </div>
  );
}

export function Workexperience() {
  return (
    <div className="py-4">
      <p className="text-md font-semibold">Work Experience</p>
      <Workexperiencecard />
    </div>
  );
}
interface EducationItem {
  school: string;
  degree: string;
  year: string;
}

export function Education() {
  const userBio = useSelector((state: RootState) => state.Token.userprofile);

  // Ensure education is an array
  // const education: EducationItem[] = Array.isArray(userBio?.education)
  //   ? userBio.education
  //   : [];

  let education: EducationItem[] = [];

  if (typeof userBio?.education === "string") {
    try {
      education = JSON.parse(userBio.education);
      console.log("Parsed Education Data:", education);
    } catch (error) {
      console.error("Error parsing education data:", error);
    }
  } else if (Array.isArray(userBio?.education)) {
    education = userBio.education;
  }

  console.log("Final Education Array:", education);

  return (
    <div>
      <p className="text-md font-semibold my-4">Education</p>

      {education.length > 0 ? (
        <div className="space-y-4">
          {education.map((edu, index) => (
            <div
              key={index}
              className="p-3 border border-gray-300 rounded-lg shadow-md bg-white"
            >
              <h3 className="text-lg font-semibold">{edu.degree}</h3>
              <p className="text-sm text-gray-500">{edu.school}</p>
              <span className="text-xs text-gray-600 px-2 py-1 rounded">
                {edu.year}
              </span>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500">No education details available</p>
      )}
    </div>
  );
}
