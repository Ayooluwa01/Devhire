"use client";
import { Button } from "@/Components/ui/button";
import Workexperiencecard from "@/Components/Workexperince";
import { RootState } from "@/Redux/store";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

type UserProfile = {
  Profilepicture: string;
  education: string | EducationItem[]; // Allow for string or array type
  skills: string[] | string | null;
  bio?: string;
  name: string;
  role: string;
};

type EducationItem = {
  id: string;
  school: string;
  degree: string;
  year: string;
};

interface EducationProps {
  education: EducationItem[];
}

export default function Userdetailpage() {
  const router = useRouter();
  const [profilebtn, setProfileBtn] = useState(false);

  const userProfileData = useSelector<RootState, UserProfile | null>(
    (state) => state.Token.userprofile
  );

  let skills: string[] = [];
  let education: EducationItem[] = [];

  if (userProfileData?.skills) {
    if (typeof userProfileData.skills === "string") {
      try {
        skills = JSON.parse(userProfileData.skills);
      } catch {
        skills = userProfileData.skills
          .replace(/[{}"]/g, "")
          .split(",")
          .map((s: string) => s.trim());
      }
    } else if (Array.isArray(userProfileData.skills)) {
      skills = userProfileData.skills;
    }
  }

  // Handling education
  // Handling education
  if (userProfileData?.education) {
    if (typeof userProfileData.education === "string") {
      try {
        // 1. Remove potential outer garbage characters (like the {} in this case)
        //    Adjust this based on variations in bad data. This handles the specific case "{...},{...}"
        let processedString = userProfileData.education.trim();
        if (processedString.startsWith("{") && processedString.endsWith("}")) {
          processedString = processedString.substring(
            1,
            processedString.length - 1
          );
        }

        // 2. Split the string into individual JSON object strings.
        //    This simple split works if keys/values don't contain the sequence '","'
        const jsonStrings = processedString.split('","');

        // 3. Parse each individual JSON string
        education = jsonStrings
          .map((jsonString) => {
            // Remove leading/trailing quotes from the split parts and unescape internal quotes
            let cleanJsonString = jsonString
              .replace(/^"|"$/g, "")
              .replace(/\\\"/g, '"');
            // Ensure the string is actually a JSON object string
            if (
              cleanJsonString.startsWith("{") &&
              cleanJsonString.endsWith("}")
            ) {
              return JSON.parse(cleanJsonString);
            } else {
              // Handle cases where a part might not be a valid JSON object string after cleaning
              return null; // Or throw an error, or return a default object
            }
          })
          .filter((item) => item !== null); // Filter out any nulls from invalid segments
      } catch (error) {
        // Fallback: Try the simple split/trim approach if JSON parsing fails initially
        try {
          skills = userProfileData.education
            .replace(/[{}"]/g, "") // Remove braces and quotes
            .split(",") // Split by comma
            .map((s: string) => s.trim()) // Trim whitespace
            .filter((s) => s); // Remove empty strings
          // This doesn't create the desired {school, degree, year} structure,
          // it's just a basic fallback to get *something*.
          // You might want a better fallback.

          education = []; // Set education to empty as the fallback above isn't structured right
        } catch (fallbackError) {
          education = []; // Final fallback
        }
      }
    } else if (Array.isArray(userProfileData.education)) {
      // Assume it's already in the correct format if it's an array
      education = userProfileData.education;
    }
  }

  const route = () => {
    router.push("/Dashboard/profile");
  };

  useEffect(() => {
    if (!userProfileData || !userProfileData.bio) {
      setProfileBtn(true);
      router.push("/Dashboard/profile");
    }
  }, [userProfileData, router]);

  return (
    <div>
      <div className="flex items-center space-x-4 gap-y-7">
        <img
          src={userProfileData?.Profilepicture || "default-image-path.jpg"}
          alt="User"
          className="w-16 h-16 rounded-full"
        />
        <div>
          <h2 className="text-lg font-semibold">
            {userProfileData?.name || "Unnamed User"}
          </h2>
          <p className="text-gray-500">
            {userProfileData?.role || "No role specified"}
          </p>
        </div>
      </div>

      <div className="border-2 border-gray-100 my-7">
        {profilebtn && <Button onClick={route}>Complete your Profile</Button>}
      </div>

      {/* Bio Section */}
      <div>
        <div className="my-3">
          <p className="text-md font-semibold">Short Bio</p>
        </div>
        <p className="text-md">{userProfileData?.bio || "N/A"}</p>
      </div>

      <div className="border-2 border-gray-100 my-7"></div>

      {/* Skills Section */}
      <Skillsection skills={skills} />

      <div className="border-2 border-gray-100 my-7"></div>

      {/* Work Experience Section */}
      <Workexperience />

      <div className="border-2 border-gray-100 my-7"></div>

      {/* Education Section */}
      <Education education={education} />
    </div>
  );
}

interface SkillsectionProps {
  skills: string[];
}

export function Skillsection({ skills = [] }: SkillsectionProps) {
  return (
    <div className="cursor-pointer">
      <div className="my-3">
        <p className="text-md font-semibold">Skills</p>
      </div>
      <div className="flex flex-row gap-x-4 flex-wrap gap-y-2">
        {skills.length ? (
          skills.map((skill, index) => (
            <span
              key={index}
              className="bg-blue-600 px-4 py-2 text-white p-3 border border-gray-300 rounded-lg shadow-md"
            >
              {skill}
            </span>
          ))
        ) : (
          <p>No skills listed</p>
        )}
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

// Education Section
export function Education({ education = [] }: EducationProps) {
  return (
    <div>
      <p className="text-md font-semibold my-4">Education</p>

      {education.length ? (
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
