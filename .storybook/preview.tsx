// @ts-ignore
import type { Preview } from '@storybook/react-webpack5';
import { Provider } from 'react-redux';
import { store } from '../src/store';

const preview: Preview = {
    parameters: {
        controls: {
            matchers: {
                color: /(background|color)$/i,
                date: /Date$/i,
            },
        },
    },
};

export const decorators = [
    (Story: any) => (
        <Provider store={store}>
            <Story/>
        </Provider>
    ),
];

export default preview;