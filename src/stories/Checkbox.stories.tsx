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
            description: 'Sets the state of the checkbox'
        },
        className: {
            control: 'text',
            description: 'Class names to be spread to the checkbox container'
        },
        disabled: {
            control: 'boolean',
            description: 'Sets the usability state of the checkbox',
        },
        label: {
            control: 'text',
            description: 'Sets the label of the checkbox.\n\nDefaults to the required prop name if none is provided!'
        },
        labelPosition: {
            control: 'select',
            options: ['left', 'right'],
            description: 'Sets the position of the label relative to the checkbox'
        },
        labelWidth: {
            control: 'number',
            description: 'Sets the width of the label.\n\nUseful for aligning the label with other elements!'
        },
        name: {
            control: 'text',
            description: 'Sets the name of the checkbox'
        },
        theme: {
            control: 'select',
            options: [Theme.REACT, Theme.INSTA, Theme.TWITCH, Theme.DARK],
            description: 'Specifies the theme of the checkbox',
        },
        children: {
            control: 'text',
            description: 'Sets the button label'
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