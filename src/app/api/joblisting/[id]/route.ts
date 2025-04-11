import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const apiUrls = {
    local: "http://localhost:9000",
    phone: "http://192.168.122.198:9000",
    ngrok: "https://your-ngrok-url.ngrok.io",
    production: "https://api.yourdomain.com",
  };

  const API_URL = apiUrls.local;
  try {
    const res = await fetch(`${API_URL}/Joblistings/${params.id}`);

    if (!res.ok) {
      return NextResponse.json({ error: "Job not found" }, { status: 404 });
    }

    const job = await res.json();
    return NextResponse.json(job);
  } catch (error) {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
