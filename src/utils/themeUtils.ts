import { Theme } from '../constants';
import { ThemeProp } from '../constants/interfaces';
import v from '../styles/variables.module.scss';

export const getButtonPrimaryColor = (theme: ThemeProp) => {
    switch (theme) {
        case Theme.DARK:
            return v.buttonPrimaryColorDark;
        case Theme.INSTA:
            return v.buttonPrimaryColorInsta;
        default:
            return v.buttonPrimaryColorReact;
    }
}

export const getButtonDefaultBorderColor = (theme: ThemeProp) => {
    switch (theme) {
        case Theme.DARK:
            return v.buttonDefaultBorderColorDark;
        case Theme.INSTA:
            return v.buttonDefaultBorderColorInsta;
        default:
            return v.buttonDefaultBorderColorReact;
    }
}

export const getButtonDefaultTextColor = (theme: ThemeProp) => {
    switch (theme) {
        case Theme.DARK:
            return v.buttonDefaultTextColorDark;
        case Theme.INSTA:
            return v.buttonDefaultTextColorInsta;
        default:
            return v.buttonDefaultTextColorReact;
    }
}

export const getButtonDefaultHoverColor = (theme: ThemeProp) => {
    switch (theme) {
        case Theme.DARK:
            return v.buttonDefaultHoverColorDark;
        case Theme.INSTA:
            return v.buttonDefaultHoverColorInsta;
        default:
            return v.buttonDefaultHoverColorReact;
    }
}

export const getAccentColor = (theme: ThemeProp) => {
    switch (theme) {
        case Theme.DARK:
            return v.accentColorDark;
        case Theme.INSTA:
            return v.accentColorInsta;
        default:
            return v.accentColorReact;
    }
}

