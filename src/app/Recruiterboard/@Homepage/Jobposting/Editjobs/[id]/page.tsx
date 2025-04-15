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
const DynamicField = ({
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
            onChange={(e) => handleArrayChange(index, field, e.target.value)}
            className={inputClass}
            placeholder={`Enter ${label.toLowerCase()}`}
            required
          />
          <button
            type="button"
            onClick={() => removeField(field, index)}
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

function JobForm() {
  const router = useRouter();
  const { id } = useParams();
  const searchParams = useSearchParams();

  // ✅ Ensure `details` is safely parsed
  let details = null;
  try {
    const detailsString = searchParams.get("details");
    details = detailsString ? JSON.parse(detailsString) : null;
  } catch (error) {
    console.error("Invalid job details:", error);
  }

  // ✅ Fetch employer ID from Redux
  const employerid = useSelector((state: RootState) => state.Token.userbio);

  // ✅ Initialize form state
  const [formData, setFormData] = useState({
    job_id: id || "",
    title: details?.title || "",
    company: details?.company || "",
    location: details?.location || "",
    type: details?.type || "",
    work_mode: details?.work_mode || "",
    job_function: details?.job_function || "",
    salary: details?.salary || "",
    description: details?.description || "",
    level: details?.level || "",
    requirements: Array.isArray(details?.requirements)
      ? details.requirements
      : [""],
    benefits: Array.isArray(details?.benefits) ? details.benefits : [""],
    qualifications: Array.isArray(details?.qualifications)
      ? details.qualifications
      : [""],
    experience: Array.isArray(details?.experience) ? details.experience : [""],
    application_deadline: details?.application_deadline || "",
    imglink: details?.imglink || "",
    employerid: employerid?.user_id || "",
  });

  // ✅ Handlers
  const handleInputChange = (e: { target: { name: any; value: any } }) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleTextareaChange = (e: { target: { name: any; value: any } }) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleArrayChange = (
    index: string | number,
    field: string | number,
    value: any
  ) => {
    if (!Array.isArray(formData[field])) return;
    const updatedArray = [...formData[field]];
    updatedArray[index] = value;
    setFormData({ ...formData, [field]: updatedArray });
  };

  const addField = (field: string | number) => {
    setFormData({ ...formData, [field]: [...formData[field], ""] });
  };

  const removeField = (field: string | number, index: any) => {
    const updatedArray = formData[field].filter(
      (_: any, i: any) => i !== index
    );
    setFormData({ ...formData, [field]: updatedArray });
  };

  // ✅ Form submission
  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    alert(JSON.stringify(formData, null, 2));

    socket.emit("Editjob", formData);

    socket.on("JobPostStatus", (data) => {
      if (data) {
        alert("Job posted successfully!");
        router.push("/Recruiterboard");
      } else {
        alert("Failed to post job. Please try again later.");
      }
    });
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
          className={textareaClass}
          onChange={handleTextareaChange}
          value={formData.description}
          required
        />

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
const InputField = ({ icon: Icon, ...props }) => (
  <div className="relative flex items-center">
    <Icon className={iconClass} />
    <input className={inputClass} {...props} />
  </div>
);

// ✅ Reusable select field
const SelectField = ({ icon: Icon, name, options, value, onChange }) => (
  <div className="relative flex items-center">
    <Icon className={iconClass} />
    <select
      name={name}
      className={inputClass}
      value={value}
      onChange={onChange}
    >
      {options.map(
        (
          opt:
            | boolean
            | React.Key
            | React.ReactElement<
                unknown,
                string | React.JSXElementConstructor<any>
              >
            | Iterable<React.ReactNode>
            | Promise<
                | string
                | number
                | bigint
                | boolean
                | React.ReactPortal
                | React.ReactElement<
                    unknown,
                    string | React.JSXElementConstructor<any>
                  >
                | Iterable<React.ReactNode>
                | null
                | undefined
              >
            | null
            | undefined
        ) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        )
      )}
    </select>
  </div>
);

// ✅ Styles
const iconClass = "text-gray-500";
const inputClass = "w-full px-4 py-2 border rounded-lg";
const textareaClass = "w-full px-4 py-2 border rounded-lg h-32";

export default JobForm;
