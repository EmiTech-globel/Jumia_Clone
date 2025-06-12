import { defineQuery } from "next-sanity"
import { sanityFetch } from "../live";

export const getSale = async () => {
    const SALE_QUERY = defineQuery(`*[_type == 'sale'] | order(name asc)`);
    try {
        const products = await sanityFetch({
            query: SALE_QUERY,
        });

        return products.data || []
    } catch(error) {
        console.error("Error fetching products by sale:", error);
    }
};