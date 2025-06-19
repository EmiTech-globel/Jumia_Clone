"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Address } from "@/sanity.types";
import { useEffect, useState } from "react";
import { getAllAddress } from "@/sanity/lib/addresses/getAllAddress";
import AddAddressModal from "./AddAddressModal";
import { useUser } from "@clerk/nextjs";
import { Skeleton } from "./ui/skeleton";

interface AddressListProps {
  onSelect: (address: Address) => void;
  selectedAddress: Address | null;
}

const AddressList = ({ onSelect, selectedAddress }: AddressListProps) => {
  const { user } = useUser();
  const [addresses, setAddresses] = useState<Address[] | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchAddresses = async () => {
    if (!user) return [];
    
    setLoading(true);
    try {
      const data = await getAllAddress(user.id);
      setAddresses(data);

      // Auto-select default address or first address
      const defaultAddress = data.find((addr: Address) => addr.default);
      if (defaultAddress) {
        onSelect(defaultAddress);
      } else if (data.length > 0) {
        onSelect(data[0]);
      }
    } catch (error) {
      console.error("Error fetching addresses:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAddresses();
  }, [user]);

  const handleAddressAdded = () => {
    fetchAddresses(); // Refresh addresses without page reload
  };

  if (loading) {
    return (
      <Card className="mt-5">
        <CardHeader>
          <CardTitle>Delivery Address</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {[1, 2].map((i) => (
            <div key={i} className="flex items-center space-x-2">
              <Skeleton className="h-4 w-4 rounded-full" />
              <div className="space-y-2 flex-1">
                <Skeleton className="h-4 w-[200px]" />
                <Skeleton className="h-3 w-[180px]" />
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="mt-5">
      <CardHeader>
        <CardTitle>Delivery Address</CardTitle>
      </CardHeader>
      <CardContent>
        {addresses && addresses.length > 0 ? (
          <RadioGroup
            value={selectedAddress?._id}
            onValueChange={(value) => {
              const addr = addresses.find((a) => a._id === value);
              if (addr) onSelect(addr);
            }}
          >
            {addresses.map((address) => (
              <div
                key={address._id}
                className={`flex items-center space-x-2 mb-4 cursor-pointer ${
                  selectedAddress?._id === address._id && "text-shop_dark_green"
                }`}
              >
                <RadioGroupItem 
                  value={address._id} 
                  id={`address-${address._id}`}
                />
                <Label
                  htmlFor={`address-${address._id}`}
                  className="grid gap-1.5 flex-1 cursor-pointer"
                >
                  <span className="font-semibold">{address.name}</span>
                  <span className="text-sm text-black/60">
                    {address.address}, {address.city}, {address.state}
                  </span>
                  {address.default && (
                    <span className="text-xs text-blue-600">Default</span>
                  )}
                </Label>
              </div>
            ))}
          </RadioGroup>
        ) : (
          <p className="text-gray-500 mb-4">No addresses saved yet</p>
        )}
        <AddAddressModal onAddressAdded={handleAddressAdded} />
      </CardContent>
    </Card>
  );
};

export default AddressList;