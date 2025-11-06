import { NextResponse } from "next/server";
export const runtime = "edge";

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const success = url.searchParams.get("success");

if (success === "true") {
  return NextResponse.redirect("/thanks");
} else {
  return NextResponse.redirect("/Failure");
}

  } catch (error) {
    console.error("❌ Error in payment response:", error);
    return NextResponse.json(
      { error: "Error processing response" },
      { status: 500 }
    );
  }
}
