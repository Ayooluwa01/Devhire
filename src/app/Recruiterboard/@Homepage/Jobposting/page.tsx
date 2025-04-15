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

import { useSelector } from "react-redux";
import { RootState } from "@/Redux/store";
import { useRouter } from "next/navigation";
import socket from "@/lib/socket";

interface FormData {
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
  employerid: any;
}

export default function JobForm() {
  const router = useRouter();

  const employerid = useSelector((state: RootState) => state.Token.userbio);
  const [formData, setFormData] = useState<FormData>({
    title: "",
    company: "",
    location: "",
    type: "Full-time",
    work_mode: "On-site",
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
    employerid: employerid?.user_id,
  });

  // Handle changes for input and select fields
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle changes for textarea fields
  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle changes for array fields (like experience, requirements, etc.)
  const handleArrayChange = (
    index: number,
    field: keyof FormData,
    value: string
  ) => {
    const updatedArray = [...formData[field]];
    updatedArray[index] = value;
    setFormData({ ...formData, [field]: updatedArray });
  };

  // Add new field to array fields (like experience, requirements, etc.)
  const addField = (field: keyof FormData) => {
    setFormData({
      ...formData,
      [field]: [...formData[field], ""],
    });
  };

  // Remove field from array fields (like experience, requirements, etc.)
  const removeField = (field: keyof FormData, index: number) => {
    const updatedArray = formData[field].filter(
      (_: any, i: number) => i !== index
    );
    setFormData({ ...formData, [field]: updatedArray });
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevent the form from reloading the page or redirecting
    alert(JSON.stringify(formData, null, 2));

    // Emit the job post request
    socket.emit("postnewJob", formData);

    // Listen for the response from the server
    socket.on("jobPostStatus", (data) => {
      if (data.status === "success") {
        alert("Job posted successfully!");
        router.push("/Recruiterboard");

        // Optionally, you can reset the form data after posting
      } else {
        alert("Failed to post job. Please try again later.");
      }
    });
  };

  return (
    <div className="max-w-4xl mx-auto p-8 bg-white shadow-xl rounded-lg border border-gray-200">
      <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
        Post a Job
      </h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* Job Title Field */}
          <div className="relative flex items-center">
            <Briefcase className={iconClass} />
            <input
              type="text"
              name="title"
              placeholder="Job Title"
              className={inputClass}
              onChange={handleInputChange}
              required
            />
          </div>

          {/* Company Name Field */}
          <div className="relative flex items-center">
            <Building className={iconClass} />
            <input
              type="text"
              name="company"
              placeholder="Company Name"
              className={inputClass}
              onChange={handleInputChange}
              required
            />
          </div>

          {/* Location Field */}
          <div className="relative flex items-center">
            <MapPin className={iconClass} />
            <input
              type="text"
              name="location"
              placeholder="Location"
              className={inputClass}
              onChange={handleInputChange}
              required
            />
          </div>

          {/* Job Type Dropdown */}
          <div className="relative flex items-center">
            <Layers className={iconClass} />
            <select
              name="type"
              className={inputClass}
              onChange={handleInputChange}
              required
            >
              <option>Full-time</option>
              <option>Part-time</option>
              <option>Contract</option>
              <option>Internship</option>
            </select>
          </div>

          {/* Work Mode Dropdown */}
          <div className="relative flex items-center">
            <ClipboardList className={iconClass} />
            <select
              name="work_mode"
              className={inputClass}
              onChange={handleInputChange}
              required
            >
              <option>On-site</option>
              <option>Remote</option>
              <option>Hybrid</option>
            </select>
          </div>

          {/* Job Function Field */}
          <div className="relative flex items-center">
            <FileText className={iconClass} />
            <input
              type="text"
              name="job_function"
              placeholder="Job Function"
              className={inputClass}
              onChange={handleInputChange}
              required
            />
          </div>
        </div>

        {/* Job Description Textarea */}
        <textarea
          name="description"
          placeholder="Job Description"
          className={textareaClass}
          onChange={handleTextareaChange}
          required
        ></textarea>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* Salary Field */}
          <div className="relative flex items-center">
            <DollarSign className={iconClass} />
            <input
              type="text"
              name="salary"
              placeholder="Salary"
              className={inputClass}
              onChange={handleInputChange}
            />
          </div>

          {/* Job Level Field */}
          <div className="relative flex items-center">
            <Layers className={iconClass} />
            <input
              type="text"
              name="level"
              placeholder="Job Level"
              className={inputClass}
              onChange={handleInputChange}
            />
          </div>

          {/* Dynamic Experience Fields */}
          <div className="w-full">
            <DynamicField
              field="experience"
              label="Experience Required"
              formData={formData}
              handleArrayChange={handleArrayChange}
              addField={addField}
              removeField={removeField}
            />
          </div>

          {/* Image URL Field */}
          <input
            type="text"
            name="imglink"
            placeholder="Image URL"
            className={inputClass}
            onChange={handleInputChange}
          />
        </div>

        {/* Dynamic Requirements, Benefits, and Qualifications Fields */}
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
        <DynamicField
          field="qualifications"
          label="Qualifications"
          formData={formData}
          handleArrayChange={handleArrayChange}
          addField={addField}
          removeField={removeField}
        />

        {/* Application Deadline Field */}
        <div className="relative flex items-center">
          <Calendar className={iconClass} />
          <input
            type="date"
            name="application_deadline"
            className={inputClass}
            onChange={handleInputChange}
            required
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-gradient-to-r from-blue-600 to-blue-400 text-white py-3 rounded-lg hover:opacity-90 transition font-semibold text-lg"
        >
          Submit Job
        </button>
      </form>
    </div>
  );
}

// Dynamic Field Component to handle array fields (Experience, Requirements, etc.)
const DynamicField = ({
  field,
  label,
  formData,
  handleArrayChange,
  addField,
  removeField,
}: {
  field: keyof FormData;
  label: string;
  formData: FormData;
  handleArrayChange: Function;
  addField: Function;
  removeField: Function;
}) => (
  <div>
    <label className="font-semibold mb-4 mt-8">{label}</label>
    {formData[field].map((value: string, index: number) => (
      <div key={index} className="flex items-center space-x-2 space-y-4">
        <input
          type="text"
          value={value}
          onChange={(e) => handleArrayChange(index, field, e.target.value)}
          className={inputClass}
          placeholder={label}
        />
        <button
          type="button"
          onClick={() => removeField(field, index)}
          className="text-red-500"
        >
          <Trash />
        </button>
      </div>
    ))}
    <button
      type="button"
      onClick={() => addField(field)}
      className="text-blue-500 flex items-center mt-2"
    >
      <PlusCircle className="mr-1" /> Add {label}
    </button>
  </div>
);

// Reusable input and textarea styles
const inputClass =
  "w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 bg-gray-100 text-gray-700";
const textareaClass =
  "w-full px-4 py-3 h-46  border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 bg-gray-100 text-gray-700 resize-none h-24";
const iconClass = "text-gray-500 mr-2";
