import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface ErrorState {
    error: any
}

const initialState: ErrorState = {
    error: null
}

const errorSlice = createSlice({
    name: 'error',
    initialState,
    reducers: {
        setError: (state, action: PayloadAction<any>) => {
            state.error = action.payload
        },
        resetError: state => {
            state.error = initialState.error
        }
    },
    selectors: {
        getError: (state) => state.error
    }
})

const errorReducer = errorSlice.reducer;

export default errorReducer;
export const { setError, resetError } = errorSlice.actions;
export const { getError } = errorSlice.selectors;
