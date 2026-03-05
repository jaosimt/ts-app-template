import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface CounterState {
    counter: number
}

const initialState: CounterState = {
    counter: 0
}

const counterSlice = createSlice({
    name: 'counter',
    initialState,
    reducers: {
        incrementCounter: state => {
            state.counter += 1
        },
        decrementCounter: state => {
            state.counter -= 1
        },
        incrementCounterByAmount: (state, action: PayloadAction<number>) => {
            state.counter += action.payload
        },
        resetCounter: state => {
            state.counter = initialState.counter
        }
    },
    selectors: {
        getCounter: (state) => state.counter
    }
})

const counterReducer = counterSlice.reducer;

export default counterReducer;
export const { incrementCounter, decrementCounter, incrementCounterByAmount, resetCounter } = counterSlice.actions;
export const { getCounter } = counterSlice.selectors;
