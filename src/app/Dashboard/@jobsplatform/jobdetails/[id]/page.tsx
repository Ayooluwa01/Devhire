import JobDetailsClient from "@/Components/JobDetailsClient";

export default async function Jobdetails({  params,}: {params: { id: string }})
 {
  const res = await fetch(`http://localhost:3000/api/joblisting/${params.id}`);

  if (!res.ok) {
    return <div className="text-center text-red-500">Job not found</div>;
  }

  const details = await res.json();

  return <JobDetailsClient details={details} jobId={params.id} />;
}
