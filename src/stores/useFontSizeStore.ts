import { create } from 'zustand';

interface FontSizeStore {
    fontSize: number;
    increase: () => void;
    decrease: () => void;
}

const MIN_FONT_SIZE = 8;
const MAX_FONT_SIZE = 32;


const useFontSizeStore = create<FontSizeStore>((set) => ({
    fontSize: 16,
    increase: () => {
        set((state) => {
            if (state.fontSize < MAX_FONT_SIZE) {
               return { fontSize: state.fontSize + 1};
            } else {
                return {fontSize: state.fontSize };
            }
        })
    },
    decrease: () => {
        set((state) => {
            if (state.fontSize > MIN_FONT_SIZE) {
               return {fontSize: state.fontSize - 1,};
            } else {
               return {fontSize: state.fontSize}; 
            }
        })
    }
}));

export default useFontSizeStore;