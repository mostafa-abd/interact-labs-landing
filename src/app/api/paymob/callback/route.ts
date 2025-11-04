import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const body = await req.json();

    console.log("✅ Transaction processed callback received:", body);

    // هنا ممكن تحفظ بيانات العملية في قاعدة البيانات
    // زي حالة الدفع، رقم العملية، المبلغ، الإيميل، إلخ.
    // مثال:
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
