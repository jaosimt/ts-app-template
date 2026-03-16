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
        setTheme: (state, action: { payload: ThemeProp }) => {
            state.theme = action.payload;
        }
    },
    selectors: {
        getTheme: (state) => state.theme as ThemeProp
    }
})

const themeReducer = themeSlice.reducer;

export default themeReducer;
export const { setTheme } = themeSlice.actions;
export const { getTheme } = themeSlice.selectors;
