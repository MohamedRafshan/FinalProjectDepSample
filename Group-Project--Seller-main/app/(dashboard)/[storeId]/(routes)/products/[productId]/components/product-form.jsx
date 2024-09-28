"use client";

import { useState,useEffect } from "react";
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
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import toast from "react-hot-toast";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import AlertModal from "@/components/modals/alert-modal";
import ImageUpload from "@/components/ui/image-uplaod-products";
import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
  SelectItem,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { useStoreImages } from "@/hooks/useStoreModal";

const formSchema = z.object({
  name: z.string().min(1),
  imageUrls: z.array(z.object({ url: z.string().min(1) })).min(1, "Images are required"),
  price: z.coerce.number().min(1),
  categoryId: z.string().min(1, "Sub Category is required"),
  mainCategory:z.string().min(1, "Main Category is required"),
  discount: z.coerce.number().min(0).max(100).optional(),
  availableCount: z.coerce.number().min(0),
  isDisplay: z.boolean().default(false).optional(),
  description: z.string().min(1),
 
});


const mainCategories = [
  "Crops",
  "Livestock",
  "Dairy Products",
  "Poultry Products",
  "Horticulture",
  "Fibers",
  "Beverage Crops",
  "Spices and Herbs",
  "Oilseeds",
  "Sugar Crops",
  "Forage and Fodder",
  "Forestry Products",
  "Organic Products",
  "Processed and Packaged Foods",
  "Agricultural Inputs",
  "Animal Feed and Supplements",
  "Agrochemicals",
  "Biotechnology"
];


const ProductBoardForm = ({categories, initialData }) => {
  
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const params = useParams();
  const router = useRouter();
  const storeImages = useStoreImages();

  useEffect(() => {
    if (initialData?.imageUrls) {
      storeImages.setImages(initialData.imageUrls.map(image => image.url));
    }
  }, [initialData]);



  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
          name: initialData?.name ||"",
          imageUrls:storeImages.images || [],
          price: parseFloat(String(initialData?.price)) || 0,
          categoryId: initialData?.categoryId || "",
          mainCategory: initialData?.mainCategory || "",
          discount: parseFloat(String(initialData?.discount)) || 0,
          isDisplay: initialData?.isDisplay || false,
          availableCount: parseInt(String(initialData?.availableCount)) || 0,
          description: initialData?.description || "",
        },
  });


  const title = initialData ? "Update Product" : "Create Product";
  const description = initialData
    ? "Update your store Product"
    : "Create a new store Product";
  const toastMessage = initialData
    ? "Product updated successfully"
    : "Product created successfully";
  const action = initialData ? "Update" : "Create";




  const onSubmit = async (values) => {

    try {
      setLoading(true);

      //adding images from the store
      const formData = {
        ...values,
        imageUrls: storeImages.images.map(url => ({ url })),
        
      };

      if (initialData) {
        await axios.patch(
          `/api/${params.storeId}/products/${params.productId}`,
          formData
        );
      } else {
        await axios.post(`/api/${params.storeId}/products`, formData);
      }

      router.refresh();
      router.push(`/${params.storeId}/products`);
      toast.success(toastMessage);
      storeImages.clearImages()
    } catch (error) {
      console.error("error inside the store PATCH", error);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };


  const onDelete = async () => {
    try {
      setLoading(true);

      await axios.delete(
        `/api/${params.storeId}/products/${params.productId}`
      );

      router.refresh();

      router.push(`/${params.storeId}/products`);

      toast.success("Deleted successfully");
    } catch (error) {
      console.error("error inside the store Delete", error);
      toast.error(
        "Make Sure to delete all the categories using this product first"
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
        description="Are you sure you want to delete this product? This action cannot be undone."
      />
      <div className="flex items-center justify-between">
        <Heading title={title} description={description} />
        {initialData && (
          <Button
            disabled={loading}
            size="icon"
            onClick={() => setOpen(true)}
            variant="destructive"
          >
            <Trash className="w-4 h-4" />
          </Button>
        )}
      </div>
      <Separator />
     
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 w-full"
        >
        <FormLabel>Product Images</FormLabel>
        <FormField
            control={form.control}
            name="imageUrls"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <ImageUpload
                    value={field.value.map(image => image.url)} // Use the value from field
                    onChange={(url) => {
                      const newImage = { url };
                      const newValue = [...field.value, newImage];

                      // Avoid adding duplicate images
                      if (!field.value.some(image => image.url === url)) {
                        field.onChange(newValue);
                        // storeImages.addImage(url);
                      }
                    }}
                    onRemove={(url) => {
                      const newValue = field.value.filter((current) => current.url !== url);
                      field.onChange(newValue);
                      const index = storeImages.images.indexOf(url);
                      if (index > -1) {
                        storeImages.removeImage(index); // Remove from store
                      }
                    }}
                    disabled={loading}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

        <Separator />
          <div className="grid sm:grid-cols-1 md:grid-cols-3 gap-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Product name"
                      disabled={loading}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Price</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="9.99"
                      disabled={loading}
                      type="number"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="availableCount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Available Count</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="1"
                      disabled={loading}
                      type="number"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="mainCategory"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Main Category</FormLabel>
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
                          placeholder="Select a Category"
                        />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                        {mainCategories.map((category,index) => (
                          <SelectItem key ={index} value={category}>
                            {category}
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="categoryId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Sub Category</FormLabel>
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
                          placeholder="Select a Category"
                        />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                    {categories && categories.length > 0 ? (
                        categories.map((category) => (
                          <SelectItem key={category.id} value={category.id}>
                            {category.name}
                          </SelectItem>
                        ))
                      ) : (
                        <SelectItem disabled value="no-category">
                          Create a Category first
                        </SelectItem>
                      )}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="discount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Discount (%)</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="24"
                      disabled={loading}
                      type="number"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
             <FormField
              control={form.control}
              name="isDisplay"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start justify-start space-x-3 space-y-0 rounded-md border p-4">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={(value) => field.onChange(value)}
                      />
                    </FormControl>
                    <div>
                      <FormLabel>Display</FormLabel>
                      <FormDescription>
                        This product will appear in the store.
                      </FormDescription>
                    </div>
                </FormItem>
              )}
            />
             <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                
                <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                    <Textarea
                      placeholder="Write here..."
                      disabled={loading}
                      {...field}  
                    />
                    </FormControl>
                      <FormDescription>
                        Add a detailed product description.
                      </FormDescription>
                </FormItem>
              )}
            />
          </div>
          <Button type="submit" disabled={loading} className="ml-auto">
            {action}
          </Button>
        </form>
      </Form>
    </>
  );
};

export default ProductBoardForm;