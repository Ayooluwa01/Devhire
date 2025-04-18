import Employerjobdetails from "@/Components/Employerjobdetails";
import JobDetailsClient from "@/Components/JobDetailsClient";
import { headers } from "next/headers";

export default async function Editjobs(props: {
  params: Promise<{
    job: number;
  }>;
}) {
  const headersList = headers();
  const protocol = (await headersList).get("x-forwarded-proto") || "http";
  const host = (await headersList).get("host"); // Fallback for local dev

  const baseUrl = `${protocol}://${host}`;
  console.log("THE URL:", baseUrl);
  // const params = await props.params;
  const res = await fetch(`${baseUrl}/api/joblisting/2`);

  if (!res.ok) {
    return <div className="text-center text-red-500">Job not found</div>;
  }

  const details = await res.json();

  return <JobDetailsClient details={details} jobId={2} />;
}
