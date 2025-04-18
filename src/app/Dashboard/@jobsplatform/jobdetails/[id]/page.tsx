import axios from "axios";
import JobDetailsClient from "@/Components/JobDetailsClient";

export default async function Editjobs({ params }: { params: { id: number } }) {
  try {
    const res = await axios.get(
      `https://devhiretalents.vercel.app/api/joblisting/${params.id}`
    );

    const details = res.data;

    return <JobDetailsClient details={details} jobId={params.id} />;
  } catch (error) {
    console.error("Failed to fetch job details:", error);
    return <div className="text-center text-red-500">Job not found</div>;
  }
}
