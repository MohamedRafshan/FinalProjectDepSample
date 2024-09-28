import toast from 'react-hot-toast';
import {create} from 'zustand';
import {persist,createJSONStorage} from "zustand/middleware";

const payCart = create(
    persist((set,get)=>({
        itemsToPay:[],
        addItemToPay:(data)=>{
            const currentItems = get().itemsToPay;
            const existingItem = currentItems.find((item)=>item.id === data.id);

            if(existingItem){
                return 
            }

            set({itemsToPay:[...get().itemsToPay,data]})

        },
        removeItemToPay:(id)=>{
            set({itemsToPay:[...get().itemsToPay.filter((item)=>item.id !== id)]})
        },
        removeAllToPay:()=>{
            set({itemsToPay:[]})
           
        }
    }),{
        name:"ToPay-storage",
        storage:createJSONStorage(()=>localStorage)
    })
)

export default payCart;


