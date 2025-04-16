import JobDetailsClient from "@/Components/JobDetailsClient";
import { headers } from "next/headers";
export default async function Jobdetails(props: {
  params: Promise<{ id: string }>;
}) {
  const headersList = headers();
  const protocol = (await headersList).get("x-forwarded-proto") || "http";
  const host = (await headersList).get("host") || "localhost:3000"; // Fallback for local dev

  const baseUrl = `${protocol}://${host}`;
  const params = await props.params;
  const res = await fetch(`${baseUrl}/api/joblisting/${params.id}`);

  if (!res.ok) {
    return <div className="text-center text-red-500">Job not found</div>;
  }

  const details = await res.json();

  return <JobDetailsClient details={details} jobId={params.id} />;
}
