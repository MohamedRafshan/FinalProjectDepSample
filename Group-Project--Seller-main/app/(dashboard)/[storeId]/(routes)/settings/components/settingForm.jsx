"use client";

import { useState } from "react";
import Heading from "@/components/ui/heading";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Trash } from "lucide-react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import toast from "react-hot-toast";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";

import BannerPreview from "@/components/banerPreview";
import ImageUpload from "@/components/ui/one-image-upload";
import AlertModal from "@/components/modals/alert-modal";
// import ApiAlert from "@/components/ui/api-alert";
// import useOrigin from "@/hooks/use-origin";

const formSchema = z.object({
  StoreName: z.string().min(1),
  UserEmail: z.string().email(),
  UserFullName: z.string().min(1),
  imageUrl: z.string().min(1, "Image is required"),
  disLabel: z.string().optional(),
  UserPhoneNum: z
    .string()
    .min(10, "Phone number must be exactly 10 digits")
    .max(10, "Phone number must be exactly 10 digits")
    .regex(/^\d{10}$/, "Phone number must contain only numbers"),
  facebook: z.string().optional(),
  youtube: z.string().optional(),
  instagram: z.string().optional(),
});

const SettingForm = ({ initialStoreData, initialSellerData }) => {
  const params = useParams();
  const router = useRouter();
  // const origin = useOrigin();

  const [open, setOpen] = useState(false);
  const [previewData, setPreviewData] = useState({});
  const [loading, setLoading] = useState(false);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      StoreName: initialStoreData.name,
      disLabel: initialStoreData.disLabel || "",

      UserEmail: initialSellerData.email,
      UserFullName: initialSellerData.name,
      UserPhoneNum: initialSellerData.phoneNum,
      facebook: initialSellerData.facebook || "",
      youtube: initialSellerData.youtube || "",
      instagram: initialSellerData.instagram || "",
      imageUrl: initialStoreData.imageUrl || "",
    },
  });

  const handlePreview = (data) => {
    setPreviewData(data);
  };

  const onSubmit = async (values) => {
    try {
      setLoading(true);

      await axios.patch(`/api/store/${params.storeId}`, values);

      router.refresh();

      toast.success("Store updated successfully");
    } catch (error) {
      console.error("error inside the store PATCH", error);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const onDelete = async (values) => {
    try {
      setLoading(true);

      await axios.delete(`/api/store/${params.storeId}`);

      router.refresh();

      router.push("/");
      toast.success("Deleted successfully");
    } catch (error) {
      console.error("error inside the store Delete", error);
      toast.error(
        "Make Sure to delete all the products and categories before deleting the store"
      );
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };
  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={() => onDelete()}
        loading={loading}
        description="Are you sure you want to delete this store? This action cannot be undone & all the products and categories will be deleted."
      />
      <div className="flex items-center justify-between">
        <Heading
          title="Settings"
          description="This all details displayed on your store page. Make sure to keep them updated."
        />
        <Button
          disabled={loading}
          variant="destructive"
          size="icon"
          onClick={() => setOpen(true)}
        >
          <Trash className="w-4 h-4" />
        </Button>
      </div>
      <Separator />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 w-full"
        >
          <div className="grid lg:grid-cols-3 gap-8 sm:grid-cols-1 md:grid-cols-2">
            <FormField
              control={form.control}
              name="StoreName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Store Name</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Enter your store name"
                      disabled={loading}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="disLabel"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Display Label</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Enter your label"
                      disabled={loading}
                    />
                  </FormControl>
                  <FormMessage />
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
                    <Input
                      {...field}
                      placeholder="Enter your email address"
                      disabled={loading}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="UserFullName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Owner Name</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Enter your name"
                      disabled={loading}
                    />
                  </FormControl>
                  <FormMessage />
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
                    <Input
                      {...field}
                      placeholder="Enter your phone number"
                      disabled={loading}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="facebook"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Facebook link (optional)</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Enter here"
                      disabled={loading}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="youtube"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Youtube Channel link (optional)</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Enter here"
                      disabled={loading}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="instagram"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Instagram page link (optional)</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Enter here"
                      disabled={loading}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="imageUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Background Image</FormLabel>
                  <FormControl>
                    <ImageUpload
                      value={field.value ? [field.value] : []}
                      onChange={(url) => field.onChange(url)}
                      disabled={loading}
                      onRemove={(url) => field.onChange("")}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button disabled={loading} className="ml-auto" type="submit">
            Save Changes
          </Button>
          <Button
            disabled={loading}
            className="ml-4"
            type="button"
            onClick={form.handleSubmit(handlePreview)}
          >
            Preview
          </Button>
        </form>
      </Form>
      <Separator />

      <BannerPreview
        disLabel={previewData.disLabel}
        facebook={previewData.facebook}
        youtube={previewData.youtube}
        instagram={previewData.instagram}
        imagUrl={previewData.imageUrl}
      />
    </>
  );
};

export default SettingForm;
