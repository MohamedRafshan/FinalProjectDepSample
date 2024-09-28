"use client"

import CellAction from "./row-action"
import { formatter } from "@/lib/utils";


export const columns = [
  {
    accessorKey: "payId",
    header: "Payment ID",
  },
  {
    accessorKey: "products",
    header: "Products",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.original.status;
      const color = status === "PENDING" ? "bg-yellow-100 text-yellow-800" : status === "SUCCESS" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800";
      return (
        <span className={`px-2 py-1 rounded-full ${color}`}>
          {status}
        </span>
      );
    },
  },
  {
    accessorKey: "amount",
    header: "Amount",
    cell: ({ row }) => `${formatter.format(row.original.amount)}`, // Format amount as currency
  },
  {
    accessorKey: "discount",
    header: "Discount",
    cell: ({ row }) => `${formatter.format(row.original.discount)}`, // Format amount as currency
  },

  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "phoneNum",
    header: "Phone Number",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "address",
    header: "Address",
  },
  {
    accessorKey: "district",
    header: "District",
  },
  {
    accessorKey: "createdAt",
    header: "Date",
  },
  {
    id: "action",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
