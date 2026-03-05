import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ToDoItem } from '../todo';

const initialState: ToDoItem[] = [];

const todoSlice = createSlice({
    name: 'todo',
    initialState,
    reducers: {
        addTodo: (state, action: PayloadAction<ToDoItem>) => {
            state.push(action.payload);
        },
        updateTodo: (state, action: PayloadAction<ToDoItem>) => {
            const index = state.findIndex(todo => todo.id === action.payload.id);
            if (index !== -1)
                state[index] = action.payload; // Immer handles this safely
        },
        removeTodo: (state, action: PayloadAction<string>) => {
            return state.filter(todo => todo.id !== action.payload);
        }
    },
    selectors: {
        getTodo: (state, id: string) => state.find(todo => todo.id === id),
        getTodos: (state) => state
    }
});

const todoReducer = todoSlice.reducer;

export default todoReducer;
export const { addTodo, updateTodo, removeTodo } = todoSlice.actions;
export const { getTodo, getTodos } = todoSlice.selectors;
