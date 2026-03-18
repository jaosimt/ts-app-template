import { Theme } from '../constants';
import { ThemeProp } from '../constants/interfaces';
import { CSSColors } from '../constants/types';
import v from '../styles/variables.module.scss';

export const getButtonPrimaryColor = (theme: ThemeProp) => {
    switch (theme) {
        case Theme.TWITCH:
            return v.buttonPrimaryColorTwitch as CSSColors;
        case Theme.DARK:
            return v.buttonPrimaryColorDark as CSSColors;
        case Theme.INSTA:
            return v.buttonPrimaryColorInsta as CSSColors;
        default:
            return v.buttonPrimaryColorReact as CSSColors;
    }
}

export const getButtonDefaultBorderColor = (theme: ThemeProp) => {
    switch (theme) {
        case Theme.TWITCH:
            return v.buttonDefaultBorderColorTwitch as CSSColors;
        case Theme.DARK:
            return v.buttonDefaultBorderColorDark as CSSColors;
        case Theme.INSTA:
            return v.buttonDefaultBorderColorInsta as CSSColors;
        default:
            return v.buttonDefaultBorderColorReact as CSSColors;
    }
}

export const getButtonDefaultTextColor = (theme: ThemeProp) => {
    switch (theme) {
        case Theme.TWITCH:
            return v.buttonDefaultTextColorTwitch as CSSColors;
        case Theme.DARK:
            return v.buttonDefaultTextColorDark as CSSColors;
        case Theme.INSTA:
            return v.buttonDefaultTextColorInsta as CSSColors;
        default:
            return v.buttonDefaultTextColorReact as CSSColors;
    }
}

export const getButtonDefaultHoverColor = (theme: ThemeProp) => {
    switch (theme) {
        case Theme.TWITCH:
            return v.buttonDefaultHoverColorTwitch as CSSColors;
        case Theme.DARK:
            return v.buttonDefaultHoverColorDark as CSSColors;
        case Theme.INSTA:
            return v.buttonDefaultHoverColorInsta as CSSColors;
        default:
            return v.buttonDefaultHoverColorReact as CSSColors;
    }
}

export const getAccentColor = (theme: ThemeProp) => {
    switch (theme) {
        case Theme.TWITCH:
            return v.accentColorTwitch as CSSColors;
        case Theme.DARK:
            return v.accentColorDark as CSSColors;
        case Theme.INSTA:
            return v.accentColorInsta as CSSColors;
        default:
            return v.accentColorReact as CSSColors;
    }
}

export const getPrimaryColor = (theme: ThemeProp) => {
    switch (theme) {
        case Theme.TWITCH:
            return v.primaryColorTwitch as CSSColors;
        case Theme.DARK:
            return v.primaryColorDark as CSSColors;
        case Theme.INSTA:
            return v.primaryColorInsta as CSSColors;
        default:
            return v.primaryColorReact as CSSColors;
    }
}

export const getSecondaryBaseColor = (theme: ThemeProp) => {
    switch (theme) {
        case Theme.DARK:
            return v.secondaryBaseColorDark as CSSColors;
        default: // ALL ELSE
            return v.secondaryBaseColor as CSSColors;
    }
}

export const getSecondaryBackgroundColor = (theme: ThemeProp) => {
    switch (theme) {
        case Theme.DARK:
            return v.secondaryBackgroundColorDark as CSSColors;
        default: // ALL ELSE
            return v.secondaryBackgroundColor as CSSColors;
    }
}

export const getBorderColor = (theme: ThemeProp) => {
    switch (theme) {
        case Theme.DARK:
            return v.borderColorDark as CSSColors;
        default: // ALL ELSE
            return v.borderColorDefault as CSSColors;
    }
}

export const getTextColor = (theme: ThemeProp) => {
    switch (theme) {
        case Theme.DARK:
            return v.textColorDark as CSSColors;
        default: // ALL ELSE
            return v.textColor as CSSColors;
    }
}
