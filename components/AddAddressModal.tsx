"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useUser } from "@clerk/nextjs";
import { useState } from "react";
import { addAddress } from "@/sanity/lib/addresses/addAddress";

const AddAddressModal = ({ onAddressAdded }: { onAddressAdded: () => void }) => {
  const { user } = useUser();
  const [form, setForm] = useState({
    name: "",
    address: "",
    city: "",
    state: "",
    postalCode: "",
    email: user?.primaryEmailAddress?.emailAddress || "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    if (!user) return;
    setLoading(true);

    await addAddress({
      ...form,
      default: false,
      clerkUserId: user.id,
      createdAt: new Date().toISOString(),
    });

    setLoading(false);
    onAddressAdded();
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="w-full mt-4">
          Add New Address
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Address</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
         <div>
            <Label className="my-4">Address Name</Label>
            <Input name="name" value={form.name} onChange={handleChange} />
          </div>
          <div>
            <Label className="my-4">Street Address</Label>
            <Input name="address" value={form.address} onChange={handleChange} />
          </div>
          <div>
            <Label className="my-4">Zip/Postal Code</Label>
            <Input name="postalCode" value={form.postalCode} onChange={handleChange} />
          </div>
          <div>
            <Label className="my-4">City</Label>
            <Input name="city" value={form.city} onChange={handleChange} />
          </div>
          <div>
            <Label className="my-4">State</Label>
            <Input name="state" value={form.state} onChange={handleChange} />
          </div>
          <div>
            <Label className="my-4">Email</Label>
            <Input name="email" value={form.email} onChange={handleChange} />
          </div>
          <Button onClick={handleSubmit} disabled={loading} className="w-full bg-blue-500 hover:bg-blue-600
          px-4 py-2 rounded-lg text-white font-medium transition-colors duration-200">
            {loading ? "Saving..." : "Save Address"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddAddressModal;
