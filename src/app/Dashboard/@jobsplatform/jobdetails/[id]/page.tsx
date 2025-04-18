import JobDetailsClient from "@/Components/JobDetailsClient";
import { headers } from "next/headers";

export default async function Editjobs(props: {
  params: Promise<{
    id: number;
  }>;
}) {
  const params = props.params;
  return <div>Hello {(await params).id}</div>;
}
