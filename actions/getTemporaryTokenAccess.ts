"use server";

import { currentUser } from "@clerk/nextjs/server";

// Initialize Schematic SDK
import { SchematicClient } from "@schematichq/schematic-typescript-node";
const apiKey = process.env.SCHEMATIC_API_KEY;
const client = new SchematicClient({ apiKey });

// Function to get temporary token access
export async function getTemporaryTokenAccess() {
    console.log("Getting temporary token access...");
  const user = await currentUser();
  if (!user) {
    console.log("No user found, returning null");
    // No user found, return null
    return null;
  }

  console.log(`Issuing temporary token access for user: ${user.id}`);

  const resp = await client.accesstokens.issueTemporaryAccessToken({
    resourceType: "company",
    lookup: { id: user.id }, // The lookup will vary depending on how you have configured your company keys
  });

  console.log(
    "Token response received:",
    resp.data ? "Token received" : "No token in response"
  );
    return resp.data?.token;
  
}