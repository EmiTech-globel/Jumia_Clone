// sanity/lib/addresses/getAllAddress.ts
import { client } from "../client";

export const getAllAddress = async (clerkUserId: string) => {
  const query = `*[_type == "address" && clerkUserId == $clerkUserId] | order(default desc, createdAt desc) {
    _id,
    name,
    address,
    city,
    state,
    postalCode,
    email,
    default,
    clerkUserId,
    createdAt
  }`;

  return await client.fetch(query, { clerkUserId });
};