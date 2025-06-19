// components/AddAddressModal.tsx
"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useUser } from "@clerk/nextjs";
import { useState } from "react";
import { addAddress } from "@/sanity/lib/addresses/addAddress";
import { toast } from "react-hot-toast";

const AddAddressModal = ({ onAddressAdded }: { onAddressAdded: () => void }) => {
  const { user } = useUser();
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({
    name: "",
    address: "",
    city: "",
    state: "",
    postalCode: "",
    email: user?.primaryEmailAddress?.emailAddress || "",
    default: false,
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async () => {
    if (!user) return;
    setLoading(true);

    try {
      await addAddress({
        ...form,
        clerkUserId: user.id,
        createdAt: new Date().toISOString(),
      });

      toast.success("Address added successfully");
      onAddressAdded();
      setOpen(false);
      setForm({
        name: "",
        address: "",
        city: "",
        state: "",
        postalCode: "",
        email: user.primaryEmailAddress?.emailAddress || "",
        default: false,
      });
    } catch (error) {
      toast.error("Failed to add address");
      console.error("Error adding address:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
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
            <Label className="py-2">Address Name (e.g., Home, Office)</Label>
            <Input 
              name="name" 
              value={form.name} 
              onChange={handleChange} 
              required 
            />
          </div>
          <div>
            <Label  className="py-2">Street Address</Label>
            <Input 
              name="address" 
              value={form.address} 
              onChange={handleChange} 
              required 
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label  className="py-2">City</Label>
              <Input 
                name="city" 
                value={form.city} 
                onChange={handleChange} 
                required 
              />
            </div>
            <div>
              <Label  className="py-2">State/Province</Label>
              <Input 
                name="state" 
                value={form.state} 
                onChange={handleChange} 
                required 
              />
            </div>
          </div>
          <div>
            <Label className="py-2">Postal Code</Label>
            <Input 
              name="postalCode" 
              value={form.postalCode} 
              onChange={handleChange} 
              required 
            />
          </div>
          <div>
            <Label className="py-2">Email</Label>
            <Input 
              type="email"
              name="email" 
              value={form.email} 
              onChange={handleChange} 
              required 
            />
          </div>
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="defaultAddress"
              name="default"
              checked={form.default}
              onChange={handleChange}
              className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <Label htmlFor="defaultAddress" className="text-sm font-medium">
              Set as default address
            </Label>
          </div>
          <Button 
            onClick={handleSubmit} 
            disabled={loading}
            className="w-full px-4 py-2 rounded-lg text-white font-medium 
            transition-colors duration-200 bg-blue-500 hover:bg-blue-600"
          >
            {loading ? "Saving..." : "Save Address"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddAddressModal;