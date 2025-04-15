import { NextResponse } from "next/server";

export async function GET(req: Request, props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  // const apiUrls = {
  //   local: "http://localhost:9000",
  //   phone: "http://192.168.208.198:9000",
  //   ngrok: "https://your-ngrok-url.ngrok.io",
  //   production: "https://devhire-backend.onrender.com",
  // };

  // const API_URL = apiUrls.production;
  try {
    const res = await fetch(
      `${process.env.BACKEND_URL}/Joblistings/${params.id}`
    );

    if (!res.ok) {
      return NextResponse.json({ error: "Job not found" }, { status: 404 });
    }

    const job = await res.json();
    return NextResponse.json(job);
  } catch (error) {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
