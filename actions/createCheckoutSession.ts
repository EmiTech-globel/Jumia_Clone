'use server';

import { imageUrl } from "@/lib/imageUrl";
import stripe from "@/lib/stripe";
import { Address } from "@/sanity.types";
import { BasketItem } from "@/store/store";

export type Metadata = {
    orderNumber: string;
    customerName: string;
    customerEmail: string;
    clerkUserId: string;
    address?: Address | null;
};

export type GroupBasketItem ={
    product: BasketItem["product"];
    quantity: number;
};

export async function createCheckoutSession(
    items: GroupBasketItem[],
    metadata: Metadata
) {
    try{
        // check if any grouped items don't have a price
        const itemsWithPrice = items.filter((item) => !item.product.price);
        if (itemsWithPrice.length > 0) {
            throw new Error("Some items do not have a price");
        }

        // Search for existing customer by email
        const customers = await stripe.customers.list({
            email: metadata.customerEmail,
            limit: 1,
        });

        let customerId: string | undefined;
        if (customers.data.length > 0) {
          customerId = customers.data[0].id;
        }

         const baseUrl = process.env.NODE_ENV === "production" && process.env.VERCEL_URL
            ? `https://${process.env.VERCEL_URL}`
            : process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
         
         const successUrl = `${baseUrl}/success?session_id={CHECKOUT_SESSION_ID}&orderNumber=${metadata.orderNumber}`;
         const cancelUrl = `${baseUrl}/basket`;

        // Create a new customer if not found
        const session = await stripe.checkout.sessions.create({
            customer: customerId,
             customer_creation: customerId ? undefined : 'always',
             customer_email: !customerId ? metadata.customerEmail : undefined,
                metadata: {
                  orderNumber: metadata.orderNumber,
                  customerName: metadata.customerName,
                  customerEmail: metadata.customerEmail,
                  clerkUserId: metadata.clerkUserId!,
                  address: JSON.stringify(metadata.address),
              },
             mode: 'payment',
             allow_promotion_codes: true,
             success_url: successUrl,
            cancel_url: cancelUrl,

             line_items: items.map((item) => ({
                price_data: {
                    currency: 'ngn',
                    unit_amount: Math.round(item.product.price! * 100), // Convert to cents
                    product_data: {
                        name: item.product.name || 'Unknown Product',
                        description: `Product ID: ${item.product._id}`,
                        metadata: {
                            id: item.product._id,
                        },
                        images: item.product.image
                        ? [imageUrl(item.product.image).url()]
                        : undefined,
                    },
                },
                quantity: item.quantity,
             })),
        });

        return session.url;
    } catch (error) {
        console.error("Error creating checkout session", error);
        throw error;
    }
}