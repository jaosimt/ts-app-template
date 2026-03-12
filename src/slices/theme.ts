import { createSlice } from '@reduxjs/toolkit';

export interface ThemeState {
    theme: string
}

const initialState: ThemeState = {
    theme: 'dark'
}

const themeSlice = createSlice({
    name: 'theme',
    initialState,
    reducers: {
        toggleTheme: (state) => {
            state.theme = state.theme === 'dark' ? 'light' : 'dark';
        },
    },
    selectors: {
        getTheme: (state) => state.theme
    }
})

const themeReducer = themeSlice.reducer;

export default themeReducer;
export const { toggleTheme } = themeSlice.actions;
export const { getTheme } = themeSlice.selectors;
