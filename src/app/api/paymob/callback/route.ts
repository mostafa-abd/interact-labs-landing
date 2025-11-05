import { NextResponse } from "next/server";
export const runtime = "edge";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    console.log("✅ Transaction processed callback received:", body);

    // هنا تحفظ بيانات العملية في قاعدة البيانات إذا أردت
    // await savePaymentToDB(body);

    return NextResponse.json({ message: "Callback received successfully" });
  } catch (error) {
    console.error("❌ Error in callback:", error);
    return NextResponse.json(
      { error: "Error processing callback" },
      { status: 500 }
    );
  }
}
