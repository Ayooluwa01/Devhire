import { NextResponse } from "next/server";

export async function GET(req: Request, { params }: { params: { auth: any } }) {
  try {
    const res = await fetch(`http://localhost:9000/login/auth/${params.auth}`);
    const job = await res.json();
    return NextResponse.json(job);
  } catch (error) {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
