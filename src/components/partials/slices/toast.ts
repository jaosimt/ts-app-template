import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { firstToastTop, toastGap, ToastProps } from '../toast';

const initialState: ToastProps[] = [];

const toastSlice = createSlice({
    name: 'toast',
    initialState,
    reducers: {
        toast: (state, action: PayloadAction<ToastProps>) => {
            const {id} = action.payload;
            if (state.find(toast => toast.id === action.payload.id)) return state;

            let topRight = firstToastTop - toastGap;
            let topLeft = firstToastTop - toastGap;
            let thisTop = topRight;
            state.map(t => {
                switch(t.options?.position || 'top-right') {
                    case 'top-left':
                        topLeft += toastGap;
                        thisTop = topLeft;
                        return {...t, topLeft}
                    default: // top-right
                        topRight += toastGap;
                        thisTop = topRight;
                        return {...t, topRight}
                }
            });

            state.push({...action.payload, id: id || `t-${crypto.randomUUID()}`, top: thisTop + toastGap});
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
        getToasts: (state) => state
    }
});

const toastReducer = toastSlice.reducer;

export default toastReducer;
export const { toast, updateToast, removeToast } = toastSlice.actions;
export const { getToasts } = toastSlice.selectors;