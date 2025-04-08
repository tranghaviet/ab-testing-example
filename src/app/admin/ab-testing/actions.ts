"use server"

import { prisma } from "@/server/prisma"
import { z } from "zod"
// import { revalidatePath } from "next/cache" // Import revalidatePath if needed

const testVariant = prisma.testVariant

// Keep the Zod schema for validation
// Schema for raw FormData strings
const rawFormSchema = z.object({
  recordId: z.string(),
  model: z.string().min(1, "Model is required"), // Corrected message
  field: z.string().min(1, "Field is required"),
  // variant: z.string(), // Remove variant for now
  value: z.string(), // Keep as string initially
})

// We expect the input string to be a JSON representation of an object like { "value": ... }
// We don't need a separate Zod schema for this structure if we parse and access the property directly.

// Define the Server Action function
// Update signature for useFormState: accepts previous state and form data
export async function saveABTestVariant(prevState: any, formData: FormData) {
  try {
    const rawData = {
      recordId: formData.get("recordId") as string, // Cast or ensure string
      model: formData.get("model") as string,
      field: formData.get("field") as string,
      // variant: formData.get("variant") as string, // Remove variant
      value: formData.get("value") as string, // Get the stringified JSON
    }

    // 1. Validate the raw form data types (mostly strings)
    const rawValidationResult = rawFormSchema.safeParse(rawData)
    if (!rawValidationResult.success) {
      console.error(
        "Raw Validation Error:",
        rawValidationResult.error.flatten()
      )
      return {
        success: false,
        error: rawValidationResult.error.flatten().fieldErrors,
      }
    }

    // Disable JSON parsing for now
    // 2. Parse the 'value' JSON string and extract the inner 'value'
    // let actualValue: unknown
    // try {
    //   const parsedJson = JSON.parse(rawValidationResult.data.value)
    //   // Check if it's an object and has the 'value' property
    //   if (
    //     typeof parsedJson === "object" &&
    //     parsedJson !== null &&
    //     "value" in parsedJson
    //   ) {
    //     actualValue = parsedJson.value // Extract the actual value
    //   } else {
    //     console.error(
    //       "Value JSON Structure Validation Error: Expected { value: ... } structure"
    //     )
    //     return {
    //       success: false,
    //       error: {
    //         value: [
    //           "Invalid JSON structure for value. Expected { value: ... }",
    //         ],
    //       },
    //     }
    //   }
    // } catch (e) {
    //   console.error("Value JSON Parsing Error:", e)
    //   return {
    //     success: false,
    //     error: { value: ["Invalid JSON string for value"] },
    //   }
    // }

    // 3. Prepare data for Prisma, now 'value' is guaranteed to be the correct object type
    // Extract validated data, excluding variant
    const { recordId, model, field } = rawValidationResult.data
    // Define the condition for the WHERE clause using Prisma's composite key syntax
    const condition = {
      recordId_model_field: { recordId, model, field }
    }
    const dataForPrisma = {
      // variant, // Remove variant
      // value: actualValue as any, // Use the extracted value directly, assert type for Prisma
      value: rawValidationResult.data.value,
    }

    // Perform the database operation
    const record = await testVariant.upsert({
      where: condition,
      // For create, provide the actual fields directly
      create: { ...condition.recordId_model_field, ...dataForPrisma },
      update: { ...dataForPrisma }, // Pass validated data
    })

    // Optional: Revalidate the path if the data change should reflect immediately elsewhere
    // revalidatePath('/some/path/to/revalidate');

    console.log("Upsert successful:", record)
    return { success: true, data: record }
  } catch (error: any) {
    console.error("Server Action Error:", error)
    // Simplified error handling for Server Action context
    return {
      success: false,
      error: error.message || "An unexpected error occurred",
    }
  }
}
