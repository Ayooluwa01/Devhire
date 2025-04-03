"use client";

import { RootState } from "@/Redux/store";
import { useSelector } from "react-redux";
import socket from "@/lib/socket";
import { useEffect, useState } from "react";
import JobCard from "@/Components/JobCard";
import EmployerJobCard from "@/Components/ui/Employerjobcard";

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

export default function Page() {
  const employerid = useSelector((state: RootState) => state.Token.userbio);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    if (employerid?.user_id) {
      // Emit the event to get the employer's posted jobs
      socket.emit("getemployerpostedjobs", employerid.user_id);
    }

    // Event listener for the "employerjobs" event
    const handleEmployerJobs = (jobs: Job[]) => {
      setJobs(jobs);
    };

    // Event listener for errors (optional but useful)
    const handleError = (err: string) => {
      setError(err);
    };

    socket.on("employerjobs", handleEmployerJobs);
    socket.on("error", handleError);

    // Cleanup on component unmount or employerid change
    return () => {
      socket.off("employerjobs", handleEmployerJobs);
      socket.off("error", handleError);
    };
  }, [employerid?.user_id, socket]); // Ensure the effect runs when employerid.user_id changes

  return (
    <div>
      {error && <p className="text-red-500">{error}</p>}
      {jobs.length > 0 ? (
        jobs.map((job) => <EmployerJobCard key={job.id} job={job} />)
      ) : (
        <p className="text-center text-xl py-8">No jobs found</p>
      )}
    </div>
  );
}
