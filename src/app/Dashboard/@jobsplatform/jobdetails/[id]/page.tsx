// import JobDetailsClient from "@/Components/JobDetailsClient";
// import { headers } from "next/headers";
// export default async function Jobdetails(props: {
//   params: Promise<{ id: string }>;
// }) {
//   const headersList = headers();
//   const protocol = (await headersList).get("x-forwarded-proto") || "http";
//   const host = (await headersList).get("host"); // Fallback for local dev

//   const baseUrl = `${protocol}://${host}`;
//   const params = await props.params;
//   const res = await fetch(`${baseUrl}/api/joblisting/${params.id}`);

//   if (!res.ok) {
//     return <div className="text-center text-red-500">Job not found</div>;
//   }

//   const details = await res.json();

//   return <JobDetailsClient details={details} jobId={params.id} />;
// }

import JobDetailsClient from "@/Components/JobDetailsClient";
import { headers } from "next/headers";

export default async function Jobdetails({
  params,
}: {
  params: { id: number };
}) {
  try {
    const headersList = await headers();
    const protocol = headersList.get("x-forwarded-proto") || "http";
    const host = headersList.get("host") || "localhost:3000"; // fallback

    const baseUrl = `${protocol}://${host}`;

    const res = await fetch(`${baseUrl}/api/joblisting/${params.id}`, {
      cache: "no-store",
    });

    if (!res.ok) {
      console.error("❌ Failed to fetch job:", res.statusText);
      return <div className="text-center text-red-500">Job not found</div>;
    }

    const details = await res.json();

    if (!details || typeof details !== "object") {
      console.error("❌ Invalid job data:", details);
      return <div className="text-center text-red-500">Invalid job data</div>;
    }

    return <JobDetailsClient details={details} jobId={params.id} />;
  } catch (error) {
    console.error("🔥 Error rendering Jobdetails:", error);
    return (
      <div className="text-center text-red-500">
        An unexpected error occurred.
      </div>
    );
  }
}
