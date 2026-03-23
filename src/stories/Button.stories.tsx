// @ts-ignore
import { Meta, StoryObj } from '@storybook/react-webpack5';
import { IoIosArrowDropdown, IoIosArrowDropdownCircle, IoMdArrowDropdown } from 'react-icons/io';
import { RiDropdownList } from 'react-icons/ri';
import { RxDropdownMenu } from 'react-icons/rx';
import Button, { ButtonProps } from '../components/partials/button';
import '../index.scss';
import '../styles/tags.scss';
import '../styles/common.scss';
import '../styles/animations.scss';
import '../styles/theme.scss';
import '../styles/tippy.scss';
import { Theme } from '../constants';

const icons = {IoIosArrowDropdown, IoIosArrowDropdownCircle, IoMdArrowDropdown, RiDropdownList, RxDropdownMenu};

const meta = {
    title: 'Custom Components/Button',
    component: Button,
    parameters: {
        layout: 'centered',
        controls: {exclude: ['className']}
    },
    tags: ['autodocs'],
    argTypes: {
        align: {
            control: 'select',
            options: ['left', 'center', 'right', 'space-between'],
            description: 'Sets the alignment of button icon and label alike',
        },
        type: {
            control: 'select',
            options: ['button', 'submit', 'reset'],
            description: 'Specifies the type of the button',
        },
        disabled: {
            control: 'boolean',
            description: 'Specifies that a button should be disabled',
        },
        icon: {
            options: Object.keys(icons),
            mapping: icons,
            control: {type: 'select'},
            description: 'Adds icon to the button'
        },
        theme: {
            control: 'select',
            options: [Theme.REACT, Theme.INSTA, Theme.TWITCH, Theme.DARK],
            description: 'Specifies the theme of the button',
        },
        width: {
            control: 'number',
            description: 'Sets the width of the button'
        },
        className: {control: 'text'},
        children: {
            control: 'text',
            description: 'Sets the button label',
        },
        iconClassName: {
            control: 'text',
            description: 'CSS classes to be spread to the button element',
        }
    }
} satisfies Meta<ButtonProps>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        children: 'My Button',
        theme: Theme.REACT,
        className: 'default'
    }
};

export const Propped: Story = {
    args: {
        theme: Theme.REACT,
        type: 'button',
        disabled: false,
        align: 'left',
        icon: undefined,
        width: undefined,
        children: 'My Button'
    },
};