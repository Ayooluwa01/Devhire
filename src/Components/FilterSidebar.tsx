"use client";
import {
  setJob,
  setJobExperiences,
  setjobfunction,
  setsalaryRanges,
} from "@/Redux/Filterslice";
import { RootState } from "@/Redux/store";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { io } from "socket.io-client";

const socket = io("http://localhost:9000");

export default function FilterSidebar() {
  const dispatch = useDispatch();
  const [jobType, setJobType] = useState("");
  const [jobExperience, setJobExperience] = useState("");

  const [jobFunctions, setJobFunctions] = useState<string[]>([]);

  const [salaryRange, setSalaryRange] = useState(75000);
  const filter = useSelector((state: RootState) => state.Filter);

  useEffect(() => {
    console.log(jobType, jobExperience);
    dispatch(setJob(jobType));
    dispatch(setJobExperiences(jobExperience));
    dispatch(setjobfunction(jobFunctions));
    dispatch(setsalaryRanges(salaryRange));
    socket.emit("filter", filter);
  }, [jobType, jobExperience, jobFunctions, salaryRange, dispatch]);

  const handleFunctionChange = (func: string) => {
    setJobFunctions((prev) =>
      prev.includes(func) ? prev.filter((f) => f !== func) : [...prev, func]
    );
  };

  return (
    <div className="p-4">
      <h3 className="text-lg font-semibold">Filter By</h3>

      {/* Job Type - Radio */}
      <div className="mt-4">
        <h4 className="text-sm font-semibold">Job Type</h4>
        {["Full-time", "Part-time", "Freelance", "Volunteer"].map((type) => (
          <label key={type} className="flex items-center space-x-2 mt-2">
            <input
              type="radio"
              name="jobType"
              value={type}
              checked={jobType === type}
              onChange={() => setJobType(type)}
              className="w-4 h-4"
            />
            <span>{type}</span>
          </label>
        ))}
      </div>

      {/* Job Function - Checkbox */}
      <div className="mt-4">
        <h4 className="text-sm font-semibold">Job Function</h4>
        {[
          "Finance",
          "Business",
          "Marketing",
          "Engineering",
          "Techonolgy",
          "Programming",
        ].map((func) => (
          <label key={func} className="flex items-center space-x-2 mt-2">
            <input
              type="checkbox"
              checked={jobFunctions.includes(func)}
              onChange={() => handleFunctionChange(func)}
              className="w-4 h-4"
            />
            <span>{func}</span>
          </label>
        ))}
      </div>

      {/* Job expereince radiobox */}
      <div className="mt-4">
        <h4 className="text-sm font-semibold">Expereince</h4>
        {["Less than 1 year", "1-2 years", "3 -5 years", "6 years"].map(
          (expereince) => (
            <label
              key={expereince}
              className="flex items-center space-x-2 mt-2"
            >
              <input
                type="radio"
                name="jobType"
                value={expereince}
                checked={jobExperience === expereince}
                onChange={() => setJobExperience(expereince)}
                className="w-4 h-4"
              />
              <span>{expereince}</span>
            </label>
          )
        )}
      </div>

      {/* Salary Range - Slider */}
      <div className="mt-4">
        <h4 className="text-sm font-medium">Salary Range</h4>
        <input
          type="range"
          min="30000"
          max="150000"
          step="5000"
          value={salaryRange}
          onChange={(e) => setSalaryRange(Number(e.target.value))}
          className="w-full mt-2"
        />
        <p className="text-sm text-gray-500">${salaryRange.toLocaleString()}</p>
      </div>
    </div>
  );
}
