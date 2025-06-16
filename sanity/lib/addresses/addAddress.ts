'use server'

import { revalidatePath } from "next/cache";
import { client } from "../client";

interface AddressData {
  address: string;
  city: string;
  state: string;
  default: boolean;
  clerkUserId: string;
  createdAt: string;
  postalCode: string;
}

export const addAddress = async (addressData: AddressData) => {
  try {
    const doc =
      await client.create({
        _type: "address",
        ...addressData,
        createdAt: new
        Date().toISOString(),
      });
  
    revalidatePath('/cart');

    return { success: true, data: doc };
  } catch (error) {
    console.error("Error creating address:", error);
  }
};
