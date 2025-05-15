import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

// The schema is entirely optional.
// You can delete this file (schema.ts) and the
// app will continue to work.
// The schema provides more precise TypeScript types.
export default defineSchema({
  receipts: defineTable({
    userId: v.string(), //Clerk user ID
    filename: v.string(), //File name
    fileDisplayName: v.optional(v.string()), //File display name
    fileId: v.id("_storage"), //File ID
    uploadedAt: v.number(), //Timestamp
    size: v.number(), //File size
    mimeType: v.string(), //File mime type
    status: v.string(), // 'pending', 'processed', 'error'

    //Fields for extracted data
    merchantName: v.optional(v.string()),
    merchantAddress: v.optional(v.string()),
    merchantContact: v.optional(v.string()),
    transactionDate: v.optional(v.string()),
    transactionAmount: v.optional(v.string()),
    currency: v.optional(v.string()),
    receiptSummary: v.optional(v.string()),
    items: v.array(
      v.object({
        name: v.string(),
        quantity: v.number(),
        unitPrice: v.number(),
        totalPrice: v.number(),
      }),
    ),
  })
});
