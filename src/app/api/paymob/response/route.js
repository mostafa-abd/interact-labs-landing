import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const success = searchParams.get("success");

    if (success === "true") {
      return NextResponse.redirect(`${process.env.NEXT_PUBLIC_URL}/thanks`);
    } else {
      return NextResponse.redirect(`${process.env.NEXT_PUBLIC_URL}/Failure`);
    }
  } catch (error) {
    console.error("❌ Error in payment response:", error);
    return NextResponse.json(
      { error: "Error processing response" },
      { status: 500 }
    );
  }
}
