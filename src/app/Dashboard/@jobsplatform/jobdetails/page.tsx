"use client";

import { useSearchParams } from "next/navigation";
import JobDetailsClient from "@/Components/JobDetailsClient";
import { useEffect, useState } from "react";
import axios from "axios";

export default function JobDetailsPage() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  const [details, setDetails] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (id) {
      // Dynamically get the protocol and host from the window
      const protocol = window.location.protocol;
      const host = window.location.host; // This dynamically handles changes in domain

      const baseUrl = `${protocol}//${host}`; // Full base URL
      axios
        .get(`${baseUrl}/api/joblisting/${id}`)
        .then((res) => {
          setDetails(res.data);
          setLoading(false);
        })
        .catch((err) => {
          console.error("Failed to fetch job details:", err);
          setError(true);
          setLoading(false);
        });
    }
  }, [id]);

  if (!id) {
    return <div className="text-center text-red-500">Missing job ID</div>;
  }

  if (loading) {
    return <div className="text-center">Loading...</div>;
  }

  if (error || !details) {
    return <div className="text-center text-red-500">Job not found</div>;
  }

  return <JobDetailsClient details={details} jobId={id} />;
}
