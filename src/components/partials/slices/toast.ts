import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getRandStr } from '../../../utils';
import { firstToastTop, toastGap, ToastProps } from '../toast';

const initialState: ToastProps[] = [];

const toastSlice = createSlice({
    name: 'toast',
    initialState,
    reducers: {
        addToast: (state, action: PayloadAction<ToastProps>) => {
            const {id} = action.payload;
            if (state.find(toast => toast.id === action.payload.id)) return state;

            // state.push({...action.payload, id: id || `t-${crypto.randomUUID()}`}); // to long!!!
            state.push({...action.payload, id: id || `${getRandStr(3)}-${getRandStr(7)}`});
        },
        removeToast: (state, action: PayloadAction<string>) => {
            return state.filter(toast => toast.id !== action.payload);
        }
    },
    selectors: {
        getToasts: (state) => {
            let topRight = firstToastTop - toastGap;
            let topLeft = firstToastTop - toastGap;
            let bottomRight = firstToastTop - toastGap;
            let bottomLeft = firstToastTop - toastGap;

            return state.map(t => {
                const position = t.options?.position || 'top-right';
                switch(position) {
                    case 'bottom-left':
                        bottomLeft += toastGap;
                        return {...t, top: bottomLeft}
                    case 'bottom-right':
                        bottomRight += toastGap;
                        return {...t, top: bottomRight}
                    case 'top-left':
                        topLeft += toastGap;
                        return {...t, top: topLeft}
                    default: // top-right
                        topRight += toastGap;
                        return {...t, top: topRight}
                }
            });
        }
    }
});

const toastReducer = toastSlice.reducer;

export default toastReducer;
export const { addToast, removeToast } = toastSlice.actions;
export const { getToasts } = toastSlice.selectors;