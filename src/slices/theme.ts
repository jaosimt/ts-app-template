import { createSlice } from '@reduxjs/toolkit';
import { ThemeProp } from '../constants/interfaces';
import { Theme } from '../constants';

export interface ThemeState {
    theme: ThemeProp
}

const initialState: ThemeState = {
    theme: Theme.DARK
}

const themeSlice = createSlice({
    name: 'theme',
    initialState,
    reducers: {
        toggleTheme: (state) => {
            state.theme = (state.theme === Theme.DARK ? 'light' : 'dark') as any;
        },
    },
    selectors: {
        getTheme: (state) => state.theme as ThemeProp
    }
})

const themeReducer = themeSlice.reducer;

export default themeReducer;
export const { toggleTheme } = themeSlice.actions;
export const { getTheme } = themeSlice.selectors;
