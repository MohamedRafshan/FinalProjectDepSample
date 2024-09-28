"use client";

import { useEffect, useState } from "react";
import * as z from "zod";
import axios from "axios";
import toast from "react-hot-toast";
import { useUser } from "@clerk/clerk-react";

import {
    Select,
    SelectContent,
    SelectTrigger,
    SelectValue,
    SelectItem,
  } from "@/components/ui/select";
import Modal from "@/components/ui/modal";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import  useBuyerModal  from "@/hooks/useBuyerModal";
import CircularUnderLoad from "@/components/loadingRing";


const provincesOfSriLanka = [
    "Central Province",
    "Eastern Province",
    "Northern Province",
    "Southern Province",
    "Western Province",
    "North Western Province",
    "North Central Province",
    "Uva Province",
    "Sabaragamuwa Province"
];

const districtsOfSriLanka = [
    "Ampara",
    "Anuradhapura",
    "Badulla",
    "Batticaloa",
    "Colombo",
    "Galle",
    "Gampaha",
    "Hambantota",
    "Jaffna",
    "Kalutara",
    "Kandy",
    "Kegalle",
    "Kilinochchi",
    "Kurunegala",
    "Mannar",
    "Matale",
    "Matara",
    "Monaragala",
    "Mullaitivu",
    "Nuwara Eliya",
    "Polonnaruwa",
    "Puttalam",
    "Ratnapura",
    "Trincomalee",
    "Vavuniya"
];





//for validate the form
const formSchema = z.object({
  UserEmail: z.string().email(),
  UserFullName: z.string().min(1),
  province: z.string().min(1),
  district: z.string().min(1),  
  area: z.string().min(1),
  address: z.string().min(1),
  UserPhoneNum: z
  .string()
  .min(10, "Phone number must be exactly 10 digits")
  .max(10, "Phone number must be exactly 10 digits")
  .regex(/^\d{10}$/, "Phone number must contain only numbers"),
});


const BuyerRegModal = () => {

    const { isLoaded,user} = useUser();


    const [loading, setLoading] = useState(false);
    const [dataLoading, setDataLoading] = useState(true);

    const onClose = useBuyerModal((state) => state.onClose);
    const onOpen = useBuyerModal((state) => state.onOpen);
    const isOpen = useBuyerModal((state) => state.isOpen);
  
  
    useEffect(() => {
      if(!isOpen){
        onOpen();
      }
    }, [onOpen,isOpen]);

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            UserEmail: "",
            UserFullName: "",
            UserPhoneNum: "",
            province: "",
            district: "",
            area: "",
            address: "",
        },
      });
    
      //to ensure the data is loaded
      useEffect(() => {
        if (isLoaded && user) {
          setDataLoading(false);
          form.reset({
            UserEmail: user.primaryEmailAddress?.emailAddress || "",
            UserFullName: user.fullName || "",
            UserPhoneNum: user.primaryPhoneNumber?.number || "",
            province: "",
            district: "",
            area: "",
            address: "",
          });
        }
      }, [isLoaded, user, form]);


  const onSubmit = async(values) => {
    
    //TODO :Create buyer
    try {
      setLoading(true);

      const response = await axios.post("/api/buyer/createAccount", values);
      toast.success("Account created successfully");

      

      // THIS IS USED BECAUSE, THIS ONE ENSURE PAGE RELOAD 100%
      window.location.assign(`/`)
    } catch (error) {
       toast.error("Failed to create an account. Please try again.");
    }finally{
      setLoading(false);
      
    }
  };

  return (
    <>
        {dataLoading ?
            <div>
                <CircularUnderLoad/>
            </div>

        
         :
         <Modal
         title="Update delivery address"
         description="Update your delivery address to get the best service."
         isOpen={isOpen}
         onClose={onClose}
         >
         <div className="max-h-[80vh] overflow-y-auto ">
             <div className="space-y-4 py-2 pb-4">
             <Form {...form}>
                 <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                 <FormField
                     control={form.control}
                     name="UserEmail"
                     render={({ field }) => (
                     <FormItem>
                         <FormLabel>Email</FormLabel>
                         <FormControl>
                         <Input disabled={loading} placeholder="Your email address" {...field} />
                         </FormControl>
                         <FormMessage/>
                     </FormItem>
                     )}
                 />
                 <FormField
                     control={form.control}
                     name="UserFullName"
                     render={({ field }) => (
                     <FormItem>
                         <FormLabel>Full Name</FormLabel>
                         <FormControl>
                         <Input disabled={loading} placeholder="your full name" {...field} />
                         </FormControl>
                         <FormMessage/>
                     </FormItem>
                     )}
                 />
 
                <FormField
                     control={form.control}
                     name="UserPhoneNum"
                     render={({ field }) => (
                     <FormItem>
                         <FormLabel>Phone Number</FormLabel>
                         <FormControl>
                         <Input disabled={loading} placeholder="Your Phone number" {...field} />
                         </FormControl>
                         <FormMessage/>
                     </FormItem>
                     )}
                 />
                 
                 <FormField
                     control={form.control}
                     name="province"
                     render={({ field }) => (
                     <FormItem>
                         <FormLabel>Province</FormLabel>
                         <Select
                            disabled={loading}
                            onValueChange={(value) => field.onChange(value)}
                            value={field.value}
                            defaultValue={field.value}
                        >
                            <FormControl>
                            <SelectTrigger>
                                <SelectValue
                                defaultValue={field.value}
                                placeholder="Select your province"
                                />
                            </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                                {provincesOfSriLanka.map((province,index) => (
                                <SelectItem key ={index} value={province}>
                                    {province}
                                </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                         <FormMessage/>
                     </FormItem>
                     )}
                />
                <FormField
                     control={form.control}
                     name="district"
                     render={({ field }) => (
                     <FormItem>
                         <FormLabel>District</FormLabel>
                         <Select
                            disabled={loading}
                            onValueChange={(value) => field.onChange(value)}
                            value={field.value}
                            defaultValue={field.value}
                        >
                            <FormControl>
                            <SelectTrigger>
                                <SelectValue
                                defaultValue={field.value}
                                placeholder="Select your district"
                                />
                            </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                                {districtsOfSriLanka.map((district,index) => (
                                <SelectItem key ={index} value={district}>
                                    {district}
                                </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                         <FormMessage/>
                     </FormItem>
                     )}
                 />
                 <FormField
                     control={form.control}
                     name="area"
                     render={({ field }) => (
                     <FormItem>
                         <FormLabel>Area</FormLabel>
                         <FormControl>
                         <Input disabled={loading} placeholder="Enter your area" {...field} />
                         </FormControl>
                         <FormMessage/>
                     </FormItem>
                     )}
                 />
                 <FormField
                     control={form.control}
                     name="address"
                     render={({ field }) => (
                     <FormItem>
                         <FormLabel>Address</FormLabel>
                         <FormControl>
                         <Input disabled={loading} placeholder="Enter your address" {...field} />
                         </FormControl>
                         <FormMessage/>
                     </FormItem>
                     )}
                 />
                 <div className="pt-6 space-x-2 flex items-center justify-end w-full">
                         <Button variant="outline" onClose={onClose} disabled={loading}>
                             Cancel
                         </Button>
                         <Button type="submit" disabled={loading}>
                             Update
                         </Button>
                 </div>
                 </form>
             </Form>
             </div>
         </div>
         </Modal>
         }
    </>
  );
};

export default BuyerRegModal;