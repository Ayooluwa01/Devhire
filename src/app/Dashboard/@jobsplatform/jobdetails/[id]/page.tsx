import JobDetailsClient from "@/Components/JobDetailsClient";
import { headers } from "next/headers";

export default async function Editjobs(props: {
  params: Promise<{
    id: number;
  }>;
}) {
  const headersList = headers();
  const protocol = (await headersList).get("x-forwarded-proto") || "http";
  const host = (await headersList).get("host"); // Fallback for local dev

  const baseUrl = `${protocol}://${host}`;
  const res = await fetch(
    `${baseUrl}/api/joblisting/${(await props.params).id}`
  );

  if (!res.ok) {
    return <div className="text-center text-red-500">Job not found</div>;
  }

  const details = await res.json();
  return <JobDetailsClient details={details} jobId={(await props.params).id} />;
}
