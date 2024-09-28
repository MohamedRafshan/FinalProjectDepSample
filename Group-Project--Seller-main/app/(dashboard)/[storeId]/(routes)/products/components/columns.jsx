"use client"

import CellAction from "./row-action"


export const columns= [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "isDisplay",
    header: "Display",
  },
  {
    accessorKey: "price",
    header: "Price",
  },
  {
    accessorKey: "category",
    header: "Category",
  },
  {
    accessorKey: "availableCount",
    header: "Available",
  },
  {
    accessorKey: "discount",
    header: "Discount (%)",
  },
  {
    accessorKey:"createdAt",
    header:"Date"
  },
  {
    id:"action",
    cell:({row})=><CellAction data={row.original}/>
  }

]