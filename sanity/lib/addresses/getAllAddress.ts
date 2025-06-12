import { defineQuery } from "next-sanity";
import { sanityFetch } from "@/sanity/lib/live";
import { Address } from "@/sanity.types";

export const getAllAddress = async (): Promise<Address[]> => {
  const ALL_ADDRESS_QUERY = defineQuery(`
    *[_type == "address"] | order(publishedAt desc)
  `);

  try {
    const result = await sanityFetch({ query: ALL_ADDRESS_QUERY });
    return result?.data || [];
  } catch (error) {
    console.error("Error fetching addresses:", error);
    return [];
  }
};
// This function fetches all addresses from Sanity and returns them as an array of Address objects.