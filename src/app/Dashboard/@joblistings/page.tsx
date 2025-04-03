import JobCard from "@/Components/JobCard";

interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  type: string;
  description: string;
  level: string;
  imglink: string;
}

export default async function JobLists() {
  // Fetch jobs directly inside the Server Component
  const res = await fetch("http://localhost:3000/api/joblisting", {
    cache: "no-store",
  });
  const jobs: Job[] = await res.json();

  return (
    <div>
      {jobs.map((job) => (
        <JobCard key={job.id} job={job} />
      ))}
    </div>
  );
}
