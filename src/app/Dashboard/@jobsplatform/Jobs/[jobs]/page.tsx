"use client";

import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/Redux/store";
import JobCard from "@/Components/JobCard";
import socket from "@/lib/socket";

interface PageProps {
  params: {
    jobs: string;
  };
}

export default async function Page({ params }: { params: { jobs: string } }) {
  const { jobs } = await params;

  return (
    <div>
      {jobs === "saved-jobs" ? (
        <SavedJobsListing />
      ) : jobs === "applied-jobs" ? (
        <>
          <ApliedjobListing />
        </>
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

    socket.on("savedJobs", (data: any[]) => {
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

function ApliedjobListing() {
  const [jobs, setJobs] = useState<any[]>([]);
  const userid = useSelector((state: RootState) => state.Token.userbio);

  useEffect(() => {
    socket.emit("getSavedJobs", userid.user_id);

    socket.on("appliedjobs", (data: any[]) => {
      setJobs(data); // ✅ Updated: Store the full array
    });

    return () => {
      socket.off("appliedjobs");
    };
  }, [userid.user_id]); // ✅ Dependency added

  return (
    <div>
      {jobs.length > 0 ? (
        jobs.map((job) => <JobCard key={job.id} job={job} />) // ✅ Removed extra `{}`
      ) : (
        <p>No Applied jobs yet.</p>
      )}
    </div>
  );
}
