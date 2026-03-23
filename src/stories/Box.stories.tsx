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
        label: {
            control: 'text',
            description: 'Adds a label to the box',
        },
        backgroundColor: {
            control: 'color',
            description: 'Sets the background color of the box',
        },
        borderColor: {
            control: 'color',
            description: 'Sets the border color of the box',
        },
        labelColor: {
            control: 'color',
            description: 'Sets the color of the label - if enabled!',
        },
        labelBackgroundColor: {
            control: 'color',
            description: 'Sets the background color of the label - if enabled!',
        },
        borderRadius: {
            control: 'number',
            description: 'Adds border radius to box\'s border\n\nAdds border/2 radius to box\'s label - if enabled!',
        },
        padding: {
            control: 'number',
            description: 'Sets the padding of the box\'s content container',
        },
        width: {
            control: 'number',
            description: 'Sets the width of the box',
        },
        border: {
            control: 'select',
            options: [true, false, 'label-only'],
            description: 'Sets the border of the box\n\nIf set to "label-only", only the label\'s border will be shown!',
        },
        tight: {
            control: 'boolean',
            description: 'Creates a padding-less box.\n\nSets the label inside - if enabled!',
        },
        labelPosition: {
            control: 'select',
            options: ['top-left', 'top-right', 'bottom-left', 'bottom-right'],
            description: 'Sets the location of the label - if enabled!',
        },
        labelSize: {
            control: 'select',
            options: ['small', 'medium', 'large'],
            description: 'Sets the size of the label - if enabled!',
        },
    }
} satisfies Meta<BoxProps>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        children: <h1>Box</h1>,
    }
};

export const Propped: Story = {
    args: {
        children: <h1>Box</h1>,
        label: 'My Box',
        backgroundColor: "#fff",
        borderColor: 'red',
        labelColor: "#fff",
        labelBackgroundColor: "red",
        borderRadius: 7,
        padding: 14,
        width: 300,
        border: true,
        tight: false,
        labelPosition: 'top-left',
        labelSize: 'small',
    },
};