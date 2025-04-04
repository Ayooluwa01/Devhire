"use client";

import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/Redux/store";
import JobCard from "@/Components/JobCard";
import socket from "@/lib/socket";

export default function Page({ params }: { params: { jobs: string } }) {
  return (
    <div>
      {params.jobs === "saved-jobs" ? (
        <SavedJobsListing />
      ) : (
        <p>No jobs found</p>
      )}
    </div>
  );
}

function SavedJobsListing() {
  const [jobs, setJobs] = useState<any[]>([]);
  const userid = useSelector((state: RootState) => state.Token.userbio);

  useEffect(() => {
    socket.emit("getSavedJobs", userid.user_id);

    socket.on("savedJobs", (data: any[]) => {
      console.log("Received saved jobs:", data);
      setJobs(data); // ✅ Updated: Store the full array
    });

    return () => {
      socket.off("savedJobs");
    };
  }, [userid.user_id]); // ✅ Dependency added

  return (
    <div>
      {jobs.length > 0 ? (
        jobs.map((job) => <JobCard key={job.id} job={job} />) // ✅ Removed extra `{}`
      ) : (
        <p>No saved jobs yet.</p>
      )}
    </div>
  );
}
