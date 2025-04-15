import WorkExperienceCard from "../Workexperince";

interface SkillsectionProps {
  skills: string[];
}

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
      <WorkExperienceCard />
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
