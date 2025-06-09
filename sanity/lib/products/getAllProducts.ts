import { defineQuery } from "next-sanity";
import { sanityFetch } from "../live";

export const getAllProducts = async () => {
  const ALL_PRODUCT_QUERY = defineQuery(`
    *[_type == "product"] | order(name asc)
  `);

  try {
    // Use sanityFetch to send the query to Sanity
    const products = await sanityFetch({
      query: ALL_PRODUCT_QUERY,
    });

    // Return the list of products, or an empty array if none are found
    return products.data || [];
  } catch (error) {
    // Handle any errors that occur during the fetch
    console.error("Error fetching products:", error);
    return [];
  }
};
