import { NextResponse } from "next/server";
export const runtime = "edge";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    console.log("✅ Paymob Callback received:", JSON.stringify(body, null, 2));

    // Paymob sends webhook with transaction details
    // Extract important information
    const {
      obj: {
        id: transactionId,
        order: { id: orderId },
        success,
        amount_cents,
        currency,
        created_at,
      } = {},
    } = body;

    if (transactionId && orderId) {
      console.log(`Transaction ${transactionId} for order ${orderId}: ${success ? "SUCCESS" : "FAILED"}`);
      
      // Here you can add logic to:
      // 1. Update order status in your database
      // 2. Send confirmation emails
      // 3. Update inventory
      // 4. Log transaction details
    }

    // Always return 200 to acknowledge receipt
    return NextResponse.json({ 
      message: "Callback received successfully",
      received: true 
    });
  } catch (error: any) {
    console.error("❌ Error in Paymob callback:", error);
    // Still return 200 to prevent Paymob from retrying
    return NextResponse.json({ 
      error: "Error processing callback",
      message: error.message 
    }, { status: 200 });
  }
}
