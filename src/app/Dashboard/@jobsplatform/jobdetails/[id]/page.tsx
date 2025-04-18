import JobDetailsClient from "@/Components/JobDetailsClient";
import { headers } from "next/headers";

export default async function Editjobs(props: {
  params: Promise<{
    id: number;
  }>;
}) {
  const params = await props.params;
  return <div>Hello {params.id}</div>;
}
