import JobCard from "@/Components/JobCard";
import SearchBar from "@/Components/searchbar";
import Link from "next/link";
import { useSelector } from "react-redux";

interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  type: string;
  description: string;
  level: string;
  imglink: string;
}

export default async function DefaultJobListings() {
  // Fetch jobs directly inside the Server Component
  const res = await fetch("http://localhost:3000/api/joblisting", {
    cache: "no-store",
  });
  const jobs: Job[] = await res.json();

  return (
    <div>
      <SearchCard />
      {jobs.map((job) => (
        <JobCard key={job.id} job={job} />
      ))}
    </div>
  );
}

export function SearchCard() {
  return (
    <div className="p-6 sticky">
      <div className="bg-blue-600 text-white p-6 rounded-lg shadow-md text-center">
        <h1 className="text-2xl font-bold">Find your dream job here!</h1>
        <p className="mt-2 text-sm">
          Looking for jobs? Browse our latest job openings to view & apply to
          the best jobs today!
        </p>

        <div className="mt-4">
          <SearchBar />
        </div>
      </div>
    </div>
  );
}
