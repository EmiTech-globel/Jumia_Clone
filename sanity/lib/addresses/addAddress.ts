'use server'

import { revalidatePath } from "next/cache";
import { client } from "../client";

interface AddressData {
  name: string;
  address: string;
  city: string;
  state: string;
  postalCode: string;
  email: string;
  default: boolean;
  clerkUserId: string;
  createdAt?: string;
}

export const addAddress = async (addressData: AddressData) => {
  try {
    // If this is being set as default, first unset any existing default
    if (addressData.default) {
      await client
        .patch({
          query: `*[_type == "address" && clerkUserId == $clerkUserId && default == true]`,
          params: { clerkUserId: addressData.clerkUserId },
        })
        .set({ default: false })
        .commit();
    }

    const doc = await client.create({
      _type: "address",
      ...addressData,
      createdAt: addressData.createdAt || new Date().toISOString(),
    });

    // Revalidate relevant paths
    revalidatePath('/cart');

    return { 
      success: true, 
      data: doc,
      message: "Address added successfully" 
    };
  } catch (error) {
    console.error("Error creating address:", error);
    return { 
      success: false, 
      error: "Failed to add address" 
    };
  }
};