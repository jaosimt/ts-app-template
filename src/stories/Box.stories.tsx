// @ts-ignore
import { Meta, StoryObj } from '@storybook/react-webpack5';
import Box, { BoxProps } from '../components/partials/box';
import '../index.scss';
import '../styles/tags.scss';
import '../styles/common.scss';
import '../styles/animations.scss';
import '../styles/theme.scss';
import '../styles/tippy.scss';

const meta = {
    title: 'Custom Components/Box',
    component: Box,
    parameters: {
        layout: 'centered',
        controls: { exclude: ['children'] },
    },
    tags: ['autodocs'],
    argTypes: {
        labelPosition: {
            control: 'select',
            options: ['top-left', 'top-right', 'bottom-left', 'bottom-right']
        },
        labelSize: {
            control: 'select',
            options: ['small', 'medium', 'large']
        },
    }
} satisfies Meta<BoxProps>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        children: <h1>Box</h1>,
    },
    parameters: {
        controls: { exclude: ['labelPosition', 'labelSize', 'children'] },
    }
};

export const Propped: Story = {
    args: {
        children: <h1>Box</h1>,
        label: 'My Box',
        backgroundColor: 'red',
        borderColor: 'red',
        labelColor: 'red',
        labelBackgroundColor: 'white',
        borderRadius: 7,
        padding: 14,
        width: 300,
        border: true,
        tight: false,
        labelPosition: 'top-left',
        labelSize: 'small',
    },
};