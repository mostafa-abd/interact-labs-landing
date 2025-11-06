// app/api/payment-callback/route.ts
import { NextResponse } from "next/server";

export const runtime = "edge";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    console.log("✅ Transaction callback received:", body);

    // هنا ممكن تضيف أي معالجة أو تحديث حالة الطلب في قاعدة البيانات

    return NextResponse.json({ message: "Callback received successfully" });
  } catch (error) {
    console.error("❌ Error in callback:", error);
    return NextResponse.json(
      { error: "Error processing callback" },
      { status: 500 }
    );
  }
}
