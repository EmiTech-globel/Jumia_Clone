
import { client } from "@/sanity/lib/client"; 
import { Address } from "@/sanity.types";

export const getAllAddress = async (): Promise<Address[]> => {
  const query = `*[_type == "address"] | order(publishedAt desc)`;

  try {
    const result: Address[] = await client.fetch(query);
    return result || [];
  } catch (error) {
    console.error("Failed to fetch addresses:", error);
    return [];
  }
};
