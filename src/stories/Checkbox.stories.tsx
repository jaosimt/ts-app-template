// @ts-ignore
import { Meta, StoryObj } from '@storybook/react-webpack5';
import '../index.scss';
import '../styles/tags.scss';
import '../styles/common.scss';
import '../styles/animations.scss';
import '../styles/theme.scss';
import '../styles/tippy.scss';
import Checkbox, { CheckboxProps } from '../components/partials/checkbox';
import { Theme } from '../constants';

const meta = {
    title: 'Custom Components/Checkbox',
    component: Checkbox,
    parameters: {
        layout: 'centered',
        controls: {exclude: ['className']}
    },
    tags: ['autodocs'],
    argTypes: {
        checked: {
            control: 'boolean',
        },
        className: {control: 'text'},
        disabled: {
            control: 'boolean',
        },
        label: {control: 'text'},
        labelPosition: {
            control: 'select',
            options: ['left', 'right']
        },
        labelWidth: {control: 'number'},
        name: {control: 'text'},
        theme: {
            control: 'select',
            options: [Theme.REACT, Theme.INSTA, Theme.TWITCH, Theme.DARK]
        }
    }
} satisfies Meta<CheckboxProps>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        children: 'My Checkbox',
        theme: Theme.REACT,
        className: 'default'
    }
};

export const Propped: Story = {
    args: {
        theme: Theme.REACT,
        checked: true,
        disabled: false,
        label: 'My Checkbox',
        labelPosition: 'left',
        labelWidth: undefined
    },
};