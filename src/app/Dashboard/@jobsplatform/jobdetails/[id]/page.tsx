import JobDetailsClient from "@/Components/JobDetailsClient";
import { headers } from "next/headers";

export default async function Editjobs(props: {
  params: Promise<{
    id: number;
  }>;
}) {
  return <div>Hello,{(await props.params).id}</div>;
}
