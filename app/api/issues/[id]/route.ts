import {NextRequest, NextResponse} from "next/server";
import {issueSchema} from "@/app/issues/validationSchemas";
import prisma from "@/prisma/client";

export async function PATCH(
    request: NextRequest,
    {params}: { params: { id: string } }
) {
    const body = await request.json();
    const validation = issueSchema.safeParse(body);

    if (!validation.success)
        return NextResponse.json(validation.error.errors, {status: 400});

    const issue = await prisma.issue.findUnique({
        where: {
            id: parseInt(params.id)
        }
    })

    if (!issue) return NextResponse.json("issue not found", {status: 404})

    const updatedIssue = await prisma.issue.update({
        where: {
            id: issue.id
        }, data: {
            title: body.title,
            description: body.description
        }
    })

    return NextResponse.json(updatedIssue);
}
