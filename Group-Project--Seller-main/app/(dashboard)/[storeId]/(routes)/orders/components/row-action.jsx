'use client'

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Copy, Edit, MoreHorizontal, Trash } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import toast from "react-hot-toast";


const CellAction = ({
    data
}) => {
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const router = useRouter();
    const params = useParams();

    const copyToClipboard = (id) => {
        navigator.clipboard.writeText(id)
        toast.success("Copied the to clipboard")
    }

    return ( 
        <>
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                    <span className="sr-only">Open Menu</span>
                    <MoreHorizontal className="w-4 h-4"/>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuLabel>
                    Actions
                </DropdownMenuLabel>
                <DropdownMenuItem onClick={()=>copyToClipboard(data.payId)}>
                    <Copy className="mr-2 h-4 w-4"/>
                    Copy payId
                </DropdownMenuItem>
                <DropdownMenuItem onClick={()=>copyToClipboard(data.address)}>
                    <Edit className="mr-2 h-4 w-4"/>
                    Copy address
                </DropdownMenuItem>
                <DropdownMenuItem onClick={()=>copyToClipboard(data.email)}>
                    <Edit className="mr-2 h-4 w-4"/>
                    Copy email
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
        </>
     );
}
 
export default CellAction;