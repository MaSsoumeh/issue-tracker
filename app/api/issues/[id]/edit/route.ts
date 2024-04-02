import { IssueSchema } from "@/app/validationSchemas";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(
  request: NextRequest,
  params: { params: { id: string } }
) {
  const body = await request.json();
  const validation = IssueSchema.safeParse(body);
  if (!validation.success)
    return NextResponse.json(validation.error.errors, { status: 400 });

  return NextResponse.json({ status: 200 });
}
