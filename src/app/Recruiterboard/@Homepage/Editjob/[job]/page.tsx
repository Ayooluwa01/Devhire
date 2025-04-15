import Employerjobdetails from "@/Components/Employerjobdetails";

export default async function Editjobs(
  props: {
    params: Promise<{
      job: string;
    }>;
  }
) {
  const params = await props.params;
  const res = await fetch(`http://localhost:3000/api/joblisting/${params.job}`);

  if (!res.ok) {
    return <div className="text-center text-red-500">Job not found</div>;
  }

  const details = await res.json();

  return <Employerjobdetails details={details} jobId={params.job} />;
}
