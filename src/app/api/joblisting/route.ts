import { RootState } from "@/Redux/store";
import { NextResponse } from "next/server";
import { useSelector } from "react-redux";
// import { useSelector } from "react-redux";

export async function GET() {
  // const job = useSelector((state: RootState) => state.Filter);
  // console.log("filters:", job);
  // const filters = useSelector((state: RootState) => state.Filter);

  const res = await fetch("http://localhost:9000/Joblistings");

  const jobs = await res.json();
  // const filters = useSelector((state: RootState) => state.Filter);
  return NextResponse.json(jobs);
}
