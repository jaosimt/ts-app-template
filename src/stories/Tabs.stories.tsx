// @ts-ignore
import { Meta, StoryObj } from '@storybook/react-webpack5';
import Tabs, { TabItemProps, TabItemType } from '../components/partials/tab';
import '../index.scss';
import '../styles/tags.scss';
import '../styles/common.scss';
import '../styles/animations.scss';
import '../styles/theme.scss';
import '../styles/tippy.scss';
import { Theme } from '../constants';

const tabItems: TabItemType[] = [
    {
        name: 'What is Lorem Ipsum',
        content: <>
            <p><b>Lorem Ipsum</b> is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been
                the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type
                and scrambled it to make a type specimen book. It has survived not only five centuries, but also the
                leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with
                the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop
                publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
        </>
    }, {
        name: 'Why do we use it?',
        content: <>
            <p>It is a long established fact that a reader will be distracted by the readable content of a page when
                looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution
                of letters, as opposed to using 'Content here, content here', making it look like readable English. Many
                desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a
                search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have
                evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).</p>
        </>
    }, {
        name: 'Where does it come from?',
        content: <>
            <p>Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical
                Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at
                Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a
                Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the
                undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et
                Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the
                theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor
                sit amet..", comes from a line in section 1.10.32.</p>
            <p>The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections
                1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact
                original form, accompanied by English versions from the 1914 translation by H. Rackham.</p>
        </>
    }, {
        name: 'Where can I get some?',
        content: <>
            <p>There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration
                in some form, by injected humour, or randomised words which don't look even slightly believable. If you
                are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden
                in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks
                as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200
                Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks
                reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or
                non-characteristic words etc.</p>
        </>
    }, {
        name: 'The 1 brown fox',
        content: <>
            <p><b>The quick brown fox jumps over the lazy dog</b> is a famous English pangram—a sentence containing every letter of the alphabet. Coined in the late 19th century (circa 1885), it is used worldwide for typing practice, keyboard testing, and font displays because it uses all 26 letters. </p>
            <p>Key details about this phrase:</p>
            <ul>
                <li><b>Purpose:</b> It is used to test typewriters, computer keyboards, and to display fonts.</li>
                <li><b>Origin:</b> The earliest known appearance was in The Boston Journal in 1885.</li>
                <li><b>Usage:</b> It was used for signaling practice, on the Moscow–Washington hotline, and is common in typing tests.</li>
                <li><b>Pangram:</b> The phrase is famous because it is a short, coherent sentence that uses every letter from A to Z.</li>
                <li><b>Popularity:</b> It is often used to demonstrate the full character set of a font.</li>
            </ul>
        </>
    }
]

const meta = {
    title: 'Custom Components/Tabs',
    component: Tabs,
    parameters: {
        controls: { exclude: ['data', 'children', 'id', 'onTabChange', 'rememberActiveTab'] },
    },
    tags: ['autodocs'],
    argTypes: {
        type: {
            control: 'select',
            options: ['boxed', 'boxed-content', 'boxed-tabs', 'plain'],
            description: 'Set the type of Tab to be rendered.\n\nboxed - Renders Tab with border and background colored tab items.\n\nboxed-content - Bordered content area extending to the active tab item.\n\nplain - No borders. Only a horizontal line separating tab items and content.'
        },
        activeItemColor: {
            control: 'color',
            description: 'Sets the color of the active tab item'
        },
        theme: {
            control: 'select',
            options: [Theme.REACT, Theme.INSTA, Theme.TWITCH, Theme.DARK],
            description: 'Specifies the theme of the tab',
        },
        contentPadding: {
            control: 'number',
            description: 'Sets the padding of the tab content'
        },
        minContentHeight: {
            control: 'number',
            description: 'Sets a minimum height for the tab content'
        },
        width: {
            control: 'number',
            description: 'Sets the overall width of the component'
        },
        moveSelectedOnScroll: {
            control: 'boolean',
            description: 'Changes active tab selection following the left/right tab item nav click.\n\nOnly if tab items are longer than the actual tab\'s width and tab items are scrolled off view!'
        }
    }
} satisfies Meta<TabItemProps>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        data: tabItems,
        theme: Theme.REACT,
    }
};

export const Propped: Story = {
    args: {
        theme: Theme.REACT,
        data: tabItems,
        type: "boxed",
        width: '100%',
        activeItemColor: '',
        moveSelectedOnScroll: true,
        contentPadding: 14,
        minContentHeight: 250
    },
};