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
      ) : params.jobs === "applied-jobs" ? (
        <AppliedJobListing />
      ) : (
        <p>No Job found</p>
      )}
    </div>
  );
}

function SavedJobsListing() {
  const [jobs, setJobs] = useState<any[]>([]);
  const userid = useSelector((state: RootState) => state.Token.userbio);

  useEffect(() => {
    socket.emit("getSavedJobs", userid.user_id);
    socket.on("savedJobs", (data: any[]) => setJobs(data));
    return () => socket.off("savedJobs");
  }, [userid.user_id]);

  return (
    <div>
      {jobs.length > 0 ? (
        jobs.map((job) => <JobCard key={job.id} job={job} />)
      ) : (
        <p>No saved jobs yet.</p>
      )}
    </div>
  );
}

function AppliedJobListing() {
  const [jobs, setJobs] = useState<any[]>([]);
  const userid = useSelector((state: RootState) => state.Token.userbio);

  useEffect(() => {
    socket.emit("getAppliedJobs", userid.user_id);
    socket.on("appliedjobs", (data: any[]) => setJobs(data));
    return () => socket.off("appliedjobs");
  }, [userid.user_id]);

  return (
    <div>
      {jobs.length > 0 ? (
        jobs.map((job) => <JobCard key={job.id} job={job} />)
      ) : (
        <p>No applied jobs yet.</p>
      )}
    </div>
  );
}
