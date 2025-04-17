import Employerjobdetails from "@/Components/Employerjobdetails";
import { headers } from "next/headers";

export default async function Editjobs(props: {
  params: Promise<{
    job: string;
  }>;
}) {
  const headersList = headers();
  const protocol = (await headersList).get("x-forwarded-proto") || "http";
  const host = (await headersList).get("host"); // Fallback for local dev

  const baseUrl = `${protocol}://${host}`;
  const params = await props.params;
  const res = await fetch(`${baseUrl}/api/joblisting/${params.job}`);

  if (!res.ok) {
    return <div className="text-center text-red-500">Job not found</div>;
  }

  const details = await res.json();

  return <Employerjobdetails details={details} jobId={params.job} />;
}
