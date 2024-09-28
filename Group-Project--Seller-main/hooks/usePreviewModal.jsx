import { create } from "zustand";


const usePreviewModal = create((set) => ({
    isOpen: false,
    product: undefined,
    open: (product) => set({ isOpen: true, product }),
    close: () => set({ isOpen: false }),
}));

export default usePreviewModal;