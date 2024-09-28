"use client";

import { useEffect, useState } from "react";
import * as z from "zod";
import axios from "axios";
import toast from "react-hot-toast";
import { useUser } from "@clerk/clerk-react";

import {useStoreModal} from "@/hooks/useStoreModal";
import Modal from "../ui/modal";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import CircularUnderLoad from "../loadingRing";

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
  StoreName: z.string().min(1),
  UserEmail: z.string().email(),
  UserFullName: z.string().min(1),
  district:z.string().min(1),
  UserPhoneNum: z
  .string()
  .min(10, "Phone number must be exactly 10 digits")
  .max(10, "Phone number must be exactly 10 digits")
  .regex(/^\d{10}$/, "Phone number must contain only numbers"),
});


const StoreModal = () => {

    const { isLoaded,user} = useUser();
    
    const [loading, setLoading] = useState(false);
    const [dataLoading, setDataLoading] = useState(true);
    const usestoremodal = useStoreModal();

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
          StoreName: "",
          UserEmail: "",
          district:"",
          UserFullName: "",
          UserPhoneNum: "",
        },
      });
    
      //to ensure the data is loaded
      useEffect(() => {
        if (isLoaded && user) {
          setDataLoading(false);
          form.reset({
            StoreName: "",
            district:"",
            UserEmail: user.primaryEmailAddress?.emailAddress || "",
            UserFullName: user.fullName || "",
            UserPhoneNum: user.primaryPhoneNumber?.number || "",
          });
        }
      }, [isLoaded, user, form]);


  const onSubmit = async(values) => {
    
    //TODO :Create store
    try {
      setLoading(true);

      const response = await axios.post("/api/store", values);
      toast.success("Store created successfully");

      // THIS IS USED BECAUSE, THIS ONE ENSURE PAGE RELOAD 100%
      window.location.assign(`/${response.data.id}`)
    } catch (error) {
       toast.error("Failed to create store");
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
         title="Create Store"
         description="Add a Store to manage products and orders.These details will be visible to customers.You can change them later."
         isOpen={usestoremodal.isOpen}
         onClose={usestoremodal.onClose}
         >
         <div>
             <div className="space-y-4 py-2 pb-4">
             <Form {...form}>
                 <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                 <FormField
                     control={form.control}
                     name="StoreName"
                     render={({ field }) => (
                     <FormItem>
                         <FormLabel>Name of Store</FormLabel>
                         <FormControl>
                         <Input disabled={loading} placeholder="Agri-Products" {...field} />
                         </FormControl>
                         <FormMessage/>
                     </FormItem>
                     )}
                 />
                 <FormField
                     control={form.control}
                     name="UserEmail"
                     render={({ field }) => (
                     <FormItem>
                         <FormLabel>Email</FormLabel>
                         <FormControl>
                         <Input disabled={loading} placeholder="Enter Email" {...field} />
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
                         <Input disabled={loading} placeholder="Enter Full Name" {...field} />
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
                         <Input disabled={loading} placeholder="Enter Phone number" {...field} />
                         </FormControl>
                         <FormMessage/>
                     </FormItem>
                     )}
                 />

                <FormField
                  control={form.control}
                  name="district"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Select Your District</FormLabel>
                      <FormControl>
                        <Select
                          value={field.value}
                          onValueChange={(value) => field.onChange(value)} // Handle onChange
                        >
                          <SelectTrigger>
                            <SelectValue>
                              {field.value || "district"}
                            </SelectValue>
                          </SelectTrigger>
                          <SelectContent>
                            {districtsOfSriLanka.map((district) => (
                              <SelectItem key={district} value={district}>
                                {district}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                 <div className="pt-6 space-x-2 flex items-center justify-end w-full">
                         <Button variant="outline" onClose={usestoremodal.onClose} disabled={loading}>
                             Cancel
                         </Button>
                         <Button type="submit" disabled={loading}>
                             Create
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

export default StoreModal;