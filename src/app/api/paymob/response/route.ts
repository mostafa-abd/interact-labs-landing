import { NextResponse } from "next/server";
export const runtime = "edge";

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const success = url.searchParams.get("success");
    const id = url.searchParams.get("id"); // Transaction ID from Paymob
    
    const NEXT_PUBLIC_URL = process.env.NEXT_PUBLIC_URL;
    
    if (!NEXT_PUBLIC_URL) {
      console.error("❌ NEXT_PUBLIC_URL not configured");
      return NextResponse.json({ error: "Configuration error" }, { status: 500 });
    }

    console.log(`Payment response: success=${success}, id=${id}`);

    if (success === "true") {
      // Payment successful - redirect to thanks page
      return NextResponse.redirect(`${NEXT_PUBLIC_URL}/thanks`);
    } else {
      // Payment failed - redirect to failure page
      return NextResponse.redirect(`${NEXT_PUBLIC_URL}/Failure`);
    }
  } catch (error) {
    console.error("❌ Error in payment response:", error);
    const NEXT_PUBLIC_URL = process.env.NEXT_PUBLIC_URL || "";
    return NextResponse.redirect(`${NEXT_PUBLIC_URL}/Failure`);
  }
}
