import { create } from "zustand";


//for model open and close
export const useStoreModal = create((set) => ({
    isOpen: false,
    onOpen:()=>set({isOpen:true}),
    onClose:()=>set({isOpen:false}),
}));
    
//for images upload record

export const useStoreImages = create((set) => ({
    images: [],
    setImages:(images)=>set({images}),
    addImage:(image)=>set((state)=>({images:[...state.images,image]})),
    removeImage:(index)=>set((state)=>({images:state.images.filter((_,i)=>i!==index)})),
    clearImages:()=>set({images:[]}),
}));