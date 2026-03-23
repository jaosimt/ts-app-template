// @ts-ignore
import { Meta, StoryObj } from '@storybook/react-webpack5';
import { FaDog } from 'react-icons/fa6';
import { GiFox, GiRiver } from 'react-icons/gi';
import { IoIosArrowDropdown, IoIosArrowDropdownCircle, IoMdArrowDropdown } from 'react-icons/io';
import { LiaPoopSolid } from 'react-icons/lia';
import { RiDropdownList } from 'react-icons/ri';
import { RxDropdownMenu } from 'react-icons/rx';
import Dropdown, { DropdownProps } from '../components/partials/dropdown';
import '../index.scss';
import '../styles/tags.scss';
import '../styles/common.scss';
import '../styles/animations.scss';
import '../styles/theme.scss';
import '../styles/tippy.scss';
import { Theme } from '../constants';

const icons = {IoIosArrowDropdown, IoIosArrowDropdownCircle, IoMdArrowDropdown, RiDropdownList, RxDropdownMenu};

const meta = {
    title: 'Custom Components/Dropdown',
    component: Dropdown,
    parameters: {
        layout: 'centered',
        controls: {exclude: ['children', 'options', 'selected', 'onChange', 'maxDropdownHeight', 'disablePredicate', 'valueClassName', 'className']},
    },
    argTypes: {
        labelWidth: {
            control: 'number',
            description: 'Sets the width of the label.\n\nUseful for aligning the label with other elements!'
        },
        labelAlign: {
            control: 'select',
            options: ['left', 'right', 'center', 'space-between'],
            description: 'Sets the position of the label relative to labelWidth'
        },
        icon: {
            options: Object.keys(icons),
            mapping: icons,
            control: { type: 'select' },
            description: 'Adds icon to the dropdown label'
        },
        theme: {
            control: 'select',
            options: [Theme.REACT, Theme.INSTA, Theme.TWITCH, Theme.DARK],
            description: 'Specifies the theme of the dropdown',
        },
        dropShadow: {
            control: 'color',
            description: 'Set a shadow color around the dropdown component'
        },
        name: {
            control: 'text',
            description: 'Sets the name of the dropdown element'
        },
        label: {
            control: 'text',
            description: 'Sets the label of the dropdown'
        },
        disabled: {
            control: 'boolean',
            description: 'Sets the usability state of the dropdown'
        },
    },
    tags: ['autodocs'],
} satisfies Meta<DropdownProps>;

export default meta;

type Story = StoryObj<typeof meta>;

const ddOptions = [
    'The quick brown fox',
    'jumps over the lazy dog',
    'near the bunk of the river',
    'and I wonder who cares!'
];

const ddOOptions = [
    {
        label: <span className={'color-cyan'}>The quick brown fox</span>,
        value: 'The quick brown fox',
        icon: GiFox
    }, {
        label: <span className={'color-magenta'}>jumps over the lazy dog</span>,
        value: 'jumps over the lazy dog',
        icon: FaDog
    }, {
        label: <span className={'color-yellow'}>near the bunk of the river</span>,
        value: 'near the bunk of the river',
        icon: GiRiver
    }, {
        label: <span className={'color-black'}>and I wonder who cares!</span>,
        value: 'and I wonder who cares!',
        icon: LiaPoopSolid
    }
];

export const StringOptions: Story = {
    args: {
        theme: Theme.REACT,
        selected: ddOptions[0],
        options: ddOptions
    },
};

export const ObjectOptions: Story = {
    args: {
        theme: Theme.REACT,
        selected: ddOOptions[0],
        options: ddOOptions
    },
};

export const Propped: Story = {
    args: {
        theme: Theme.REACT,
        label: 'My Object Dropdown',
        selected: ddOOptions[0],
        options: ddOOptions,
        icon: RxDropdownMenu,
        labelWidth: 200,
        labelAlign: 'space-between',
        disabled: false,
    },
};