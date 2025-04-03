import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const res = await fetch(`http://localhost:9000/Joblistings/${params.id}`);

    if (!res.ok) {
      return NextResponse.json({ error: "Job not found" }, { status: 404 });
    }

    const job = await res.json();
    return NextResponse.json(job);
  } catch (error) {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
