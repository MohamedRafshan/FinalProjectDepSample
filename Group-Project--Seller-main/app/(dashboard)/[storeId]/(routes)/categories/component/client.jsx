"use client";

import Heading from "@/components/ui/heading";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { Separator } from "@/components/ui/separator";
import { Plus } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { columns } from "./columns";


const CategoryClient = ({data}) => {
    const router = useRouter();
    const params = useParams();

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
            title={`Categories (${data.length})`}
            description="Create and manage categories"
        />
        <Button onClick={()=>router.push(`/${params.storeId}/categories/new`)}>
            <Plus className="mr-2 h-4 w-4"/>
            Add now
        </Button>
      </div>
      <Separator/>
      <DataTable
        columns={columns}
        data={data}
        searchKey="name"
      
      />
    </>
  );
};

export default CategoryClient;