import { prisma } from "@/server/prisma"
import { validateQuery } from "@/utils/zod"
import { NextResponse } from "next/server"
import { z } from "zod"

const testVariant = prisma.testVariant

const getSchema = z.object({
  recordId: z.string(),
  variant: z.string().optional(),
})

export async function GET(request: Request) {
  try {
    const parsedQuery = validateQuery(request, getSchema)

    const configurations = await testVariant.findMany({
      where: {
        recordId: parsedQuery.recordId,
      },
    })

    return NextResponse.json({ success: true, data: configurations })
  } catch (error: any) {
    return handleError(error)
  }
}

const postSchema = z.object({
  recordId: z.string(),
  variant: z.string().min(1, "Variant is required"),
  field: z.string().min(1, "Field is required"),
  value: z
    .object({
      value: z.any(),
    })
    .required(),
})

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { recordId, ...rest } = postSchema.parse(body)

    if (!rest) {
      return NextResponse.json(
        { success: false, error: "Missing required variant fields." },
        { status: 400 }
      )
    }

    const record = await testVariant.upsert({
      where: { recordId },
      create: { recordId, ...rest },
      update: { ...rest },
    })

    return NextResponse.json({ success: true, data: record })
  } catch (error: any) {
    return handleError(error)
  }
}

function handleError(error: any) {
  if (error instanceof z.ZodError) {
    return NextResponse.json(
      { success: false, error: error.errors },
      { status: 400 }
    )
  }
  return NextResponse.json(
    { success: false, error: error.message },
    { status: 500 }
  )
}
