// app/api/payment-redirect/route.ts
import { NextResponse } from "next/server";

export const runtime = "edge";

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const success = url.searchParams.get("success");

    // استخدم مسارات نسبية لتجنب أي SecurityError
    return NextResponse.redirect(success === "true" ? "/thanks" : "/Failure");
  } catch (error) {
    console.error("❌ Error in payment redirect:", error);
    return NextResponse.json({ error: "Error processing redirect" }, { status: 500 });
  }
}
