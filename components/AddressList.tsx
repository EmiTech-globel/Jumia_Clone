"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Address } from "@/sanity.types";
import { useEffect, useState } from "react";
import { getAllAddress } from "@/sanity/lib/addresses/getAllAddress";
import AddAddressModal from "./AddAddressModal";

interface AddressListProps {
  onSelect: (address: Address) => void;
  selectedAddress: Address | null;
}

const AddressList = ({ onSelect, selectedAddress }: AddressListProps) => {
  const [addresses, setAddresses] = useState<Address[] | null>(null);

  useEffect(() => {
    const fetchAddresses = async () => {
      const data = await getAllAddress();

      setAddresses(data);

      const defaultAddress = data.find((addr: Address) => addr.default);
      if (defaultAddress) {
        onSelect(defaultAddress);
      } else if (data.length > 0) {
        onSelect(data[0]);
      }
    };

    fetchAddresses();
  }, [onSelect]);

  return (
    addresses && (
      <Card className="mt-5">
        <CardHeader>
          <CardTitle>Delivery Address</CardTitle>
        </CardHeader>
        <CardContent>
          <RadioGroup
            defaultValue={addresses.find((a) => a.default)?._id.toString()}
          >
            {addresses.map((address) => (
              <div
                key={address._id}
                onClick={() => onSelect(address)}
                className={`flex items-center space-x-2 mb-4 cursor-pointer ${
                  selectedAddress?._id === address._id && "text-shop_dark_green"
                }`}
              >
                <RadioGroupItem value={address._id.toString()} />
                <Label
                  htmlFor={`address-${address._id}`}
                  className="grid gap-1.5 flex-1"
                >
                  <span className="font-semibold">{address.name}</span>
                  <span className="text-sm text-black/60">
                    {address.address}, {address.city}, {address.state}
                  </span>
                </Label>
              </div>
            ))}
          </RadioGroup>
          <AddAddressModal onAddressAdded={() => window.location.reload()} />
        </CardContent>
      </Card>
    )
  );
};

export default AddressList;
