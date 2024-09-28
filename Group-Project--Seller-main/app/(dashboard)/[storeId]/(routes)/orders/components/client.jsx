"use client";

import Heading from "@/components/ui/heading";
import { DataTable } from "@/components/ui/data-table";
import { Separator } from "@/components/ui/separator";
import { columns } from "./columns";

const OrderBoardClient = ({data}) => {

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
            title={`Orders (${data.length})`}
            description="Manage orders"
        />
      </div>
      <Separator/>
      <DataTable
        columns={columns}
        data={data}
        searchKey="payId"
      />
    </>
  );
};

export default OrderBoardClient;