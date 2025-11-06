import { NextResponse } from "next/server";
export const runtime = "edge";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    console.log("✅ Paymob Callback received:", body);


    return NextResponse.json({ message: "Callback received successfully" });
  } catch (error) {
    console.error("❌ Error in Paymob callback:", error);
    return NextResponse.json({ error: "Error processing callback" }, { status: 500 });
  }
}
