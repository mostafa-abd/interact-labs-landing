import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const data = await req.json();
    
    console.log("💰 [PAYMOB CALLBACK] Payment notification:", data);
    
    
    return NextResponse.json({ message: "Callback received" });
  } catch (error) {
    console.error("❌ [PAYMOB CALLBACK] Error:", error);
    return NextResponse.json({ error: "Invalid callback" }, { status: 400 });
  }
}