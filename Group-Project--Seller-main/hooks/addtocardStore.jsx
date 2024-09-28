import axios from 'axios';
import toast from 'react-hot-toast';
import {create} from 'zustand';
import {persist,createJSONStorage} from "zustand/middleware";

const useCart = create(
    persist((set,get)=>({
        items:[],
        addItem:(data)=>{
            const currentItems = get().items;
            const existingItem = currentItems.find((item)=>item.id === data.id);

            if(existingItem){
                return toast("Item already exists in the cart")
            }
            set({items:[...get().items,data]})
            toast.success("Item added to the cart")
            axios.post("/api/buyer/cart/create",{id:data.id})

        },
        removeItem:(id)=>{
            set({items:[...get().items.filter((item)=>item.id !== id)]})
            toast.success("Item removed from the cart")
            axios.delete(`/api/buyer/cart/${id}`)
        },
        removeAll:()=>{
            set({items:[]})
            toast.success("Cart cleared")
            axios.delete(`/api/buyer/cart/${"all"}`)
        }
    }),{
        name:"cart-storage",
        storage:createJSONStorage(()=>localStorage)
    })
)

export default useCart;


