import { defineQuery } from "next-sanity";
import { client } from "@/sanity/lib/client";

const MY_ORDERS_QUERY = defineQuery(`
  *[_type == "order" && clerkUserId == $userId] | order(orderDate desc){
    _id,
    orderNumber,
    orderDate,
    amountDiscount,
    status,
    totalPrice,
    currency,
    products[]{
      quantity,
      product->{
        _id,
        name,
        image,
        price,
        currency
      }
    }
  }
`);

export async function getMyOrders(userId: string) {
  if (!userId) {
    throw new Error("User ID is required to fetch orders");
  }
  return client.fetch(MY_ORDERS_QUERY, { userId });
}