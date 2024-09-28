"use client";

import { useEffect, useState } from "react";
import { Button } from "./button";
import { ImagePlus, Trash } from "lucide-react";
import Image from "next/image";
import { CldUploadWidget } from "next-cloudinary";
import { useStoreImages } from "@/hooks/useStoreModal";

const ImageUpload = ({ disabled, onChange, onRemove, value }) => {
  const storeImages = useStoreImages();
  const images = storeImages.images || value ;

  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const onUpload = (result) => {
    const imageUrl = result.info.secure_url;
    onChange(imageUrl);
    storeImages.addImage(imageUrl);
  };

  const handleRemove = (url) => {
    onRemove(url);
    const index = storeImages.images.indexOf(url);
    if (index > -1) {
      storeImages.removeImage(index);
    }
  };

  if (!isMounted) {
    return null;
  }

  return (
    <div>
      <div className="mb-4 grid sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-2">
        {images.map((url) => (
          <div
            key={url}
            className="relative w-[200px] h-[200px] rounded-md overflow-hidden"
          >
            <div className="z-10 absolute top-2 right-2">
              <Button
                type="button"
                onClick={() => handleRemove(url)}
                variant="destructive"
                size="icon"
              >
                <Trash className="w-4 h-4" />
              </Button>
            </div>
            <Image fill className="object-cover" alt={url} src={url} />
          </div>
        ))}
        <CldUploadWidget onSuccess={onUpload} uploadPreset="o8jakbfq">
          {({ open }) => {
            const onClick = () => {
              open();
            };

            return (
              <Button
                type="button"
                onClick={onClick}
                disabled={disabled}
                variant="secondary"
                className="mt-2"
              >
                <ImagePlus className="w-6 h-6 mr-2" />
                Upload an Image
              </Button>
            );
          }}
        </CldUploadWidget>
      </div>
    </div>
  );
};

export default ImageUpload;
