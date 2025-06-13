import { client } from "../client";

interface AddressData {
  street: string;
  city: string;
  state: string;
  country: string;
  default: boolean;
  clerkUserId: string;
  createdAt: string;
  postalCode: string;
}

export const addAddress = async (addressData: AddressData) => {
  try {
    const doc = {
      _type: "address",
      ...addressData,
    };

    await client.create(doc);
  } catch (error) {
    console.error("Error creating address:", error);
  }
};
