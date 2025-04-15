"use client";

import { RootState } from "@/Redux/store";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
// Import necessary React hooks
import React, {
  useState,
  ChangeEvent,
  FormEvent,
  useCallback,
  memo,
} from "react"; // Removed useEffect
import { useDispatch, useSelector } from "react-redux";

// --- Reusable Input Components (Defined OUTSIDE ProfileCompletion) ---

const InputField = memo(
  ({
    label,
    name,
    value,
    onChange,
    placeholder,
    type = "text",
    required = true,
  }: {
    label: string;
    name: string;
    value: string;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    placeholder: string;
    type?: string;
    required?: boolean;
  }) => {
    return (
      <div>
        <label
          htmlFor={name}
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          {label} {required && <span className="text-red-500">*</span>}
        </label>
        <input
          type={type}
          id={name}
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className="block w-full px-4 py-3 mt-1 text-gray-800 bg-white border border-gray-300 rounded-lg focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 transition duration-150 ease-in-out shadow-sm placeholder-gray-400"
          required={required}
          autoComplete="off"
        />
      </div>
    );
  }
);
InputField.displayName = "InputField";

const TextAreaField = memo(
  ({
    label,
    name,
    value,
    onChange,
    placeholder,
    rows = 4,
    required = true,
  }: {
    label: string;
    name: string;
    value: string;
    onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
    placeholder: string;
    rows?: number;
    required?: boolean;
  }) => {
    return (
      <div>
        <label
          htmlFor={name}
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          {label} {required && <span className="text-red-500">*</span>}
        </label>
        <textarea
          id={name}
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          rows={rows}
          className="block w-full px-4 py-3 mt-1 text-gray-800 bg-white border border-gray-300 rounded-lg focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 transition duration-150 ease-in-out shadow-sm resize-none placeholder-gray-400"
          required={required}
        ></textarea>
      </div>
    );
  }
);
TextAreaField.displayName = "TextAreaField";

// --- Main Component ---

interface FormData {
  bio: string;
  skills: string[];
  education: { id: string; school: string; degree: string; year: string }[];
  experience: { id: string; company: string; role: string; duration: string }[];
  number: string;
  address: string;
  language: string[];
  email: string | null;
}

const generateId = () => `id_${Math.random().toString(36).substr(2, 9)}`;

const ProfileCompletion = () => {
  const userProfile = useSelector(
    (state: RootState) => state.Token.userprofile
  );
  const router = useRouter();

  const email = userProfile?.email || "";
  const userId = userProfile?.userId || "user";

  const [step, setStep] = useState<number>(0);
  const totalSteps = 5;

  const [formData, setFormData] = useState<FormData>({
    bio: "",
    skills: [],
    education: [{ id: generateId(), school: "", degree: "", year: "" }],
    experience: [{ id: generateId(), company: "", role: "", duration: "" }],
    number: "",
    address: "",
    language: [],
    email: email,
  });

  // --- Define Hardcoded Skills List ---
  const skillOptions = [
    "JavaScript",
    "React",
    "Node.js",
    "Python",
    "Java",
    "CSS",
    "HTML",
    "SQL",
    "UI/UX Design",
    "TypeScript",
    "Angular",
    "Vue.js",
    "DevOps",
    "Cloud (AWS/Azure/GCP)",
    "Project Management",
  ];
  // --- End Hardcoded Skills List ---

  // Hardcoded language options
  const languageOptions = [
    "English",
    "Spanish",
    "French",
    "German",
    "Mandarin",
    "Hindi",
    "Yoruba",
    "Igbo",
    "Hausa",
  ];

  // Removed the useEffect for fetching skills

  // --- Memoized Handlers (No changes needed here) ---
  const handleChangeInSection = useCallback(
    (
      e: ChangeEvent<HTMLInputElement>,
      id: string,
      section: "education" | "experience"
    ) => {
      const { name, value } = e.target;
      setFormData((prev) => {
        const updatedSection = prev[section].map((item) =>
          item.id === id ? { ...item, [name]: value } : item
        );
        return { ...prev, [section]: updatedSection };
      });
    },
    []
  );

  const handleInputChange = useCallback(
    (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target;
      setFormData((prev) => ({ ...prev, [name]: value }));
    },
    []
  );

  const handleCheckboxChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>, section: "skills" | "language") => {
      const { value, checked } = e.target;
      setFormData((prev) => {
        const currentItems = prev[section];
        const newItems = checked
          ? [...currentItems, value]
          : currentItems.filter((item) => item !== value);
        return { ...prev, [section]: newItems };
      });
    },
    []
  );

  const addEntry = useCallback((section: "education" | "experience") => {
    const newId = generateId();
    const newEntry =
      section === "education"
        ? { id: newId, school: "", degree: "", year: "" }
        : { id: newId, company: "", role: "", duration: "" };
    setFormData((prev) => ({
      ...prev,
      [section]: [...prev[section], newEntry],
    }));
  }, []);

  const removeEntry = useCallback(
    (id: string, section: "education" | "experience") => {
      setFormData((prev) => ({
        ...prev,
        [section]: prev[section].filter((item) => item.id !== id),
      }));
    },
    []
  );

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const submissionData = { ...formData, email: userProfile?.email || "" };
    console.log("Submitting Form Data:", submissionData);
    try {
      const res = await axios.post(
        "https://devhire-backend.onrender.com/biodata",
        submissionData,
        { withCredentials: true }
      );

      router.push(`/Dashboard`);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error(
          "Axios error submitting form:",
          error.response?.data || error.message
        );
      } else {
        console.error("Error submitting form:", error);
      }
    }
  };

  // --- Render Logic ---
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-cyan-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-4">
          <Link href="Dashboard/profile"> Complete Your Profile</Link>
        </h1>
        <p className="text-center text-gray-600 mb-8 text-lg">
          Welcome, {userProfile?.displayName || userId || "User"}! Let's set up
          your details.
        </p>

        <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 md:p-10">
          {/* Step Indicator */}
          <div className="mb-8 text-center">
            <span className="text-sm font-semibold text-indigo-600 bg-indigo-100 px-3 py-1 rounded-full">
              Step {step + 1} of {totalSteps}
            </span>
            <div className="w-full bg-gray-200 rounded-full h-2.5 mt-3 overflow-hidden">
              <div
                className="bg-indigo-600 h-2.5 rounded-full transition-all duration-500 ease-out"
                style={{ width: `${((step + 1) / totalSteps) * 100}%` }}
              ></div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Step 0: Contact & Bio */}
            {step === 0 && (
              <div className="space-y-6 animate-fadeIn">
                <h2 className="text-xl md:text-2xl font-semibold text-gray-700 border-b pb-3 mb-6">
                  Basic Information
                </h2>
                <InputField
                  label="Phone Number"
                  name="number"
                  placeholder="e.g., +234 801 234 5678"
                  value={formData.number}
                  onChange={handleInputChange}
                  type="tel"
                  required={true}
                />
                <InputField
                  label="Your Address"
                  name="address"
                  placeholder="e.g., 123 Tech Road, Lagos"
                  value={formData.address}
                  onChange={handleInputChange}
                  required={true}
                />
                <TextAreaField
                  label="Short Bio"
                  name="bio"
                  placeholder="Tell us about your passion, skills, or professional goals..."
                  value={formData.bio}
                  onChange={handleInputChange}
                  rows={5}
                  required={true}
                />
              </div>
            )}

            {/* Step 1: Skills (Using Hardcoded List) */}
            {step === 1 && (
              <div className="animate-fadeIn">
                <h2 className="text-xl md:text-2xl font-semibold text-gray-700 border-b pb-3 mb-6">
                  Your Skills
                </h2>
                <p className="text-sm text-gray-500 mb-4">
                  Select all skills that apply to you.
                </p>
                {/* Map directly over the hardcoded skillOptions */}
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                  {skillOptions.map((skill) => (
                    <label
                      key={skill}
                      className={`flex items-center space-x-3 p-3 border rounded-lg cursor-pointer transition duration-150 ease-in-out ${
                        formData.skills.includes(skill)
                          ? "border-indigo-500 bg-indigo-50 ring-2 ring-indigo-200"
                          : "border-gray-300 hover:border-gray-400 hover:bg-gray-50"
                      }`}
                    >
                      <input
                        type="checkbox"
                        value={skill}
                        checked={formData.skills.includes(skill)}
                        onChange={(e) => handleCheckboxChange(e, "skills")}
                        className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                      />
                      <span className="text-sm font-medium text-gray-700">
                        {skill}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            )}

            {/* Step 2: Education */}
            {step === 2 && (
              <div className="animate-fadeIn">
                <h2 className="text-xl md:text-2xl font-semibold text-gray-700 border-b pb-3 mb-6">
                  Education History
                </h2>
                {formData.education.map((edu) => (
                  <div
                    key={edu.id}
                    className="bg-gray-50 p-5 rounded-lg border border-gray-200 mb-5 relative space-y-4"
                  >
                    {formData.education.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeEntry(edu.id, "education")}
                        className="absolute top-3 right-3 text-gray-400 hover:text-red-500 p-1 rounded-full hover:bg-red-100"
                        aria-label="Remove Entry"
                      >
                        <svg
                          className="h-5 w-5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                      </button>
                    )}
                    <InputField
                      label={`School`}
                      name="school"
                      placeholder="University Name"
                      value={edu.school}
                      onChange={(e) =>
                        handleChangeInSection(e, edu.id, "education")
                      }
                      required={formData.education.length === 1}
                    />
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <InputField
                        label="Degree/Qualification"
                        name="degree"
                        placeholder="e.g., B.Sc. Comp Sci"
                        value={edu.degree}
                        onChange={(e) =>
                          handleChangeInSection(e, edu.id, "education")
                        }
                        required={formData.education.length === 1}
                      />
                      <InputField
                        label="Year Graduated"
                        name="year"
                        placeholder="e.g., 2020"
                        value={edu.year}
                        onChange={(e) =>
                          handleChangeInSection(e, edu.id, "education")
                        }
                        type="number"
                        required={formData.education.length === 1}
                      />
                    </div>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => addEntry("education")}
                  className="inline-flex items-center px-4 py-2 bg-indigo-100 border border-transparent rounded-md font-semibold text-xs text-indigo-700 uppercase tracking-widest hover:bg-indigo-200 focus:ring focus:ring-indigo-200"
                >
                  + Add Education
                </button>
              </div>
            )}

            {/* Step 3: Experience */}
            {step === 3 && (
              <div className="animate-fadeIn">
                <h2 className="text-xl md:text-2xl font-semibold text-gray-700 border-b pb-3 mb-6">
                  Work Experience
                </h2>
                {formData.experience.map((exp) => (
                  <div
                    key={exp.id}
                    className="bg-gray-50 p-5 rounded-lg border border-gray-200 mb-5 relative space-y-4"
                  >
                    {formData.experience.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeEntry(exp.id, "experience")}
                        className="absolute top-3 right-3 text-gray-400 hover:text-red-500 p-1 rounded-full hover:bg-red-100"
                        aria-label="Remove Entry"
                      >
                        <svg
                          className="h-5 w-5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                      </button>
                    )}
                    <InputField
                      label={`Company`}
                      name="company"
                      placeholder="Company Name"
                      value={exp.company}
                      onChange={(e) =>
                        handleChangeInSection(e, exp.id, "experience")
                      }
                      required={formData.experience.length === 1}
                    />
                    <InputField
                      label="Role / Position"
                      name="role"
                      placeholder="e.g., Frontend Developer"
                      value={exp.role}
                      onChange={(e) =>
                        handleChangeInSection(e, exp.id, "experience")
                      }
                      required={formData.experience.length === 1}
                    />
                    <InputField
                      label="Duration"
                      name="duration"
                      placeholder="e.g., Jan 2022 - Present"
                      value={exp.duration}
                      onChange={(e) =>
                        handleChangeInSection(e, exp.id, "experience")
                      }
                      required={formData.experience.length === 1}
                    />
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => addEntry("experience")}
                  className="inline-flex items-center px-4 py-2 bg-indigo-100 border border-transparent rounded-md font-semibold text-xs text-indigo-700 uppercase tracking-widest hover:bg-indigo-200 focus:ring focus:ring-indigo-200"
                >
                  + Add Experience
                </button>
              </div>
            )}

            {/* Step 4: Languages */}
            {step === 4 && (
              <div className="animate-fadeIn">
                <h2 className="text-xl md:text-2xl font-semibold text-gray-700 border-b pb-3 mb-6">
                  Languages
                </h2>
                <p className="text-sm text-gray-500 mb-4">
                  Select the languages you speak.
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                  {languageOptions.map((language) => (
                    <label
                      key={language}
                      className={`flex items-center space-x-3 p-3 border rounded-lg cursor-pointer transition duration-150 ease-in-out ${
                        formData.language.includes(language)
                          ? "border-indigo-500 bg-indigo-50 ring-2 ring-indigo-200"
                          : "border-gray-300 hover:border-gray-400 hover:bg-gray-50"
                      }`}
                    >
                      <input
                        type="checkbox"
                        value={language}
                        checked={formData.language.includes(language)}
                        onChange={(e) => handleCheckboxChange(e, "language")}
                        className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                      />
                      <span className="text-sm font-medium text-gray-700">
                        {language}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex items-center justify-between mt-10 pt-6 border-t border-gray-200">
              {/* Previous Button */}
              <button
                type="button"
                onClick={() => setStep(step - 1)}
                disabled={step === 0}
                className={`inline-flex items-center justify-center px-6 py-3 border border-gray-300 rounded-lg shadow-sm text-base font-medium text-gray-700 bg-white transition duration-150 ease-in-out ${
                  step === 0
                    ? "opacity-50 cursor-not-allowed"
                    : "hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                }`}
              >
                <svg
                  className="h-5 w-5 mr-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
                Previous
              </button>
              {/* Next/Submit Button */}
              {step < totalSteps - 1 ? (
                <button
                  type="button"
                  onClick={() => setStep(step + 1)}
                  className="inline-flex items-center justify-center px-6 py-3 border border-transparent rounded-lg shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150 ease-in-out"
                >
                  Next
                  <svg
                    className="h-5 w-5 ml-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </button>
              ) : (
                <button
                  type="submit"
                  className="inline-flex items-center justify-center px-6 py-3 border border-transparent rounded-lg shadow-sm text-base font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition duration-150 ease-in-out"
                >
                  Submit Profile
                  <svg
                    className="h-5 w-5 ml-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
      {/* Animation style */}
      <style jsx global>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.4s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default ProfileCompletion;
