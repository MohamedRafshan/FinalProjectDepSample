"use client"

import CellAction from "./row-action"



export const columns= [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "productCount",
    header: "Products",
  },
  {
    accessorKey: "CreatedAt",
    header: "Date",
  },

  {
    id:"action",
    cell:({row})=><CellAction data={row.original}/>
  }

]