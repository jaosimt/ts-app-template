import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ToastProps } from '../toast';

const initialState: ToastProps[] = [];

const toastSlice = createSlice({
    name: 'toast',
    initialState,
    reducers: {
        toast: (state, action: PayloadAction<ToastProps>) => {
            const {id} = action.payload;
            if (state.find(toast => toast.id === action.payload.id)) return state;
            state.push({...action.payload, isClosed: false, id: id || crypto.randomUUID()});
        },
        updateToast: (state, action: PayloadAction<ToastProps>) => {
            const index = state.findIndex(toast => toast.id === action.payload.id);
            if (index !== -1)
                state[index] = action.payload; // Immer handles this safely
        },
        removeToast: (state, action: PayloadAction<string>) => {
            return state.filter(toast => toast.id !== action.payload);
        }
    },
    selectors: {
        getToasts: (state) => state.filter(toast => !toast.isClosed)
    }
});

const toastReducer = toastSlice.reducer;

export default toastReducer;
export const { toast, updateToast, removeToast } = toastSlice.actions;
export const { getToasts } = toastSlice.selectors;