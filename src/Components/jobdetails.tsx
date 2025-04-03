import Image from "next/image";
import Link from "next/link";

interface job {
  title: string;
  company: string;
  location: string;
  type: string;
  description: string;
  level: string;
  imglink: string;
  id: string;
}

export default function JobDetails({ job }: { job: job }) {
  return (
    <Link href={`/Dashboard/jobdetails/${job.id}`} className="cursor-pointer">
      <div className="bg-white shadow-md p-4 rounded-lg mb-4">
        <h3 className="font-semibold">
          <span>
            <img
              src=""
              alt="User"
              // className="w-16 h-16 left-0 relative rounded-full mx-auto"
              width={30}
              height={30}
            />
          </span>
          {job.title}
        </h3>
        <p className="text-sm text-gray-500">
          {job.company} - {job.location}:
        </p>
        <span className="text-xs bg-blue-500 text-white px-2 py-1 rounded">
          {job.type}
        </span>
        <p className="text-sm text-gray-500 py-3">{job.description}</p>
        <span className="text-xs bg-red-400 text-white px-2 py-1 rounded">
          {job.level}
        </span>
      </div>
    </Link>
  );
}
