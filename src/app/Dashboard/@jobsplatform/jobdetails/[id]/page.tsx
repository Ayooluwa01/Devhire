import JobDetailsClient from "@/Components/JobDetailsClient";

export default async function Jobdetails(
  props: {
    params: Promise<{ id: string }>;
  }
) {
  const params = await props.params;
  const res = await fetch(
    `https://allegedly-related-jay.ngrok-free.app/api/joblisting/${params.id}`
  );

  if (!res.ok) {
    return <div className="text-center text-red-500">Job not found</div>;
  }

  const details = await res.json();

  return <JobDetailsClient details={details} jobId={params.id} />;
}
