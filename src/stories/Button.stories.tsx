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
            options: ['left', 'center', 'right', 'space-between']
        },
        type: {
            control: 'select',
            options: ['button', 'submit', 'reset']
        },
        disabled: {
            control: 'boolean',
        },
        icon: {
            options: Object.keys(icons),
            mapping: icons,
            control: {type: 'select'},
        },
        theme: {
            control: 'select',
            options: [Theme.REACT, Theme.INSTA, Theme.TWITCH, Theme.DARK]
        },
        width: {control: 'number'},
        className: {control: 'text'},
        children: {control: 'text'}
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