"use client";

import React, { useState } from "react";
import {
  Briefcase,
  Building,
  MapPin,
  Calendar,
  DollarSign,
  FileText,
  Layers,
  ClipboardList,
  PlusCircle,
  Trash,
} from "lucide-react";
import { useParams, useSearchParams } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "@/Redux/store";
import { useRouter } from "next/navigation";
import socket from "@/lib/socket";

// ✅ Define DynamicField first
interface DynamicFieldProps {
  field: keyof FormData;
  label: string;
  formData: Record<string, any>;
  handleArrayChange: (index: number, field: keyof FormData, value: any) => void; // Change this to expect keyof FormData
  addField: (field: keyof FormData) => void; // Change this to expect keyof FormData
  removeField: (field: keyof FormData, index: number) => void;
}

const DynamicField: React.FC<DynamicFieldProps> = ({
  field,
  label,
  formData,
  handleArrayChange,
  addField,
  removeField,
}) => (
  <div>
    <label className="block text-lg font-medium text-gray-700">{label}</label>
    {formData[field].map(
      (
        value: string | number | readonly string[] | undefined,
        index: React.Key | null | undefined
      ) => (
        <div key={index} className="flex items-center space-x-2 mt-2">
          <input
            type="text"
            value={value}
            onChange={(e) =>
              handleArrayChange(index as number, field, e.target.value)
            }
            className="w-full p-2 border border-gray-300 rounded-lg"
            placeholder={`Enter ${label.toLowerCase()}`}
            required
          />
          <button
            type="button"
            onClick={() => removeField(field, index as number)}
            className="text-red-500"
          >
            <Trash />
          </button>
        </div>
      )
    )}
    <button
      type="button"
      onClick={() => addField(field)}
      className="text-blue-500 mt-2 flex items-center"
    >
      <PlusCircle className="mr-2" />
      Add {label}
    </button>
  </div>
);

type FormData = {
  job_id: string | string[];
  title: string;
  company: string;
  location: string;
  type: string;
  work_mode: string;
  job_function: string;
  salary: string;
  description: string;
  level: string;
  requirements: string[];
  benefits: string[];
  qualifications: string[];
  experience: string[];
  application_deadline: string;
  imglink: string;
  employerid: string | number;
};
function JobForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get("id"); //
  // Get employer id from Redux
  const employerid = useSelector((state: RootState) => state.Token.userbio);

  // Initialize form state
  const [formData, setFormData] = useState<FormData>({
    job_id: id || "",
    title: "",
    company: "",
    location: "",
    type: "",
    work_mode: "",
    job_function: "",
    salary: "",
    description: "",
    level: "",
    requirements: [""],
    benefits: [""],
    qualifications: [""],
    experience: [""],
    application_deadline: "",
    imglink: "",
    employerid: employerid?.user_id || "",
  });

  // Handlers for form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleArrayChange = (
    index: number,
    field: keyof FormData,
    value: any
  ) => {
    if (!Array.isArray(formData[field])) return;
    const updatedArray = [...formData[field]];
    updatedArray[index] = value;
    setFormData({ ...formData, [field]: updatedArray });
  };

  const addField = (field: keyof FormData) => {
    // Check if formData[field] is an array before trying to spread it
    if (Array.isArray(formData[field])) {
      setFormData({ ...formData, [field]: [...formData[field], ""] });
    } else {
      console.error(`Field ${field} is not an array, cannot add field.`);
    }
  };

  const removeField = (field: keyof FormData, index: number) => {
    if (Array.isArray(formData[field])) {
      const updatedArray = formData[field].filter(
        (_: any, i: number) => i !== index
      );
      setFormData({ ...formData, [field]: updatedArray });
    }
  };

  // Form submission handler
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    alert(JSON.stringify(formData, null, 2)); // for testing purposes

    // Send form data to backend or socket event
    // Example: socket.emit('Editjob', formData);

    // On success
    router.push("/Recruiterboard");
  };

  return (
    <div className="max-w-4xl mx-auto p-8 bg-white shadow-xl rounded-lg border border-gray-200">
      <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
        Edit Job
      </h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* Job Title */}
          <InputField
            icon={Briefcase}
            name="title"
            placeholder="Job Title"
            value={formData.title}
            onChange={handleInputChange}
          />

          {/* Company Name */}
          <InputField
            icon={Building}
            name="company"
            placeholder="Company Name"
            value={formData.company}
            onChange={handleInputChange}
          />

          {/* Location */}
          <InputField
            icon={MapPin}
            name="location"
            placeholder="Location"
            value={formData.location}
            onChange={handleInputChange}
          />

          {/* Job Type */}
          <SelectField
            icon={Layers}
            name="type"
            options={["Full-time", "Part-time", "Contract", "Internship"]}
            value={formData.type}
            onChange={handleInputChange}
          />

          {/* Work Mode */}
          <SelectField
            icon={ClipboardList}
            name="work_mode"
            options={["On-site", "Remote", "Hybrid"]}
            value={formData.work_mode}
            onChange={handleInputChange}
          />

          {/* Job Function */}
          <InputField
            icon={FileText}
            name="job_function"
            placeholder="Job Function"
            value={formData.job_function}
            onChange={handleInputChange}
          />
        </div>

        {/* Description */}
        <textarea
          name="description"
          placeholder="Job Description"
          className="w-full p-2 border border-gray-300 rounded-lg"
          onChange={handleTextareaChange}
          value={formData.description}
          required
        />

        {/* Dynamic Fields */}
        <DynamicField
          field="experience"
          label="Experience Required"
          formData={formData}
          handleArrayChange={handleArrayChange}
          addField={addField}
          removeField={removeField}
        />
        <DynamicField
          field="requirements"
          label="Requirements"
          formData={formData}
          handleArrayChange={handleArrayChange}
          addField={addField}
          removeField={removeField}
        />
        <DynamicField
          field="benefits"
          label="Benefits"
          formData={formData}
          handleArrayChange={handleArrayChange}
          addField={addField}
          removeField={removeField}
        />

        {/* Application Deadline */}
        <InputField
          icon={Calendar}
          name="application_deadline"
          type="date"
          value={formData.application_deadline}
          onChange={handleInputChange}
        />

        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg"
        >
          Submit
        </button>
      </form>
    </div>
  );
}

// ✅ Reusable input field
// Reusable InputField component
const InputField = ({
  icon: Icon,
  name,
  placeholder,
  value,
  onChange,
  type = "text",
}: any) => (
  <div className="relative flex items-center">
    <Icon className="w-6 h-6 text-gray-500 mr-2" />
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="w-full p-2 border border-gray-300 rounded-lg"
      required
    />
  </div>
);

// Reusable SelectField component
const SelectField = ({ icon: Icon, name, options, value, onChange }: any) => (
  <div className="relative flex items-center">
    <Icon className="w-6 h-6 text-gray-500 mr-2" />
    <select
      name={name}
      className="w-full p-2 border border-gray-300 rounded-lg"
      value={value}
      onChange={onChange}
    >
      {options
        .filter((opt: null) => opt != null) // Filter out invalid options
        .map((opt: string | number, index: number) => (
          <option key={index} value={opt}>
            {opt}
          </option>
        ))}
    </select>
  </div>
);

// ✅ Styles
const iconClass = "text-gray-500";
const inputClass = "w-full px-4 py-2 border rounded-lg";
const textareaClass = "w-full px-4 py-2 border rounded-lg h-32";

export default JobForm;
