import { getUserCredits } from "@/lib/credits";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const credits = await getUserCredits();

    return NextResponse.json({ credits }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
