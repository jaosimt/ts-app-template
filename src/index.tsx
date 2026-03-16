import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router';
import { PersistGate } from 'redux-persist/integration/react';
import Loading from './components/partials/loading';
import reportWebVitals from './reportWebVitals';
import './index.scss';
import { LazyRetry } from './utils';
import { persistor, store } from './store';
import './styles/theme.scss';

const root = ReactDOM.createRoot(
    document.getElementById('react-ts-template') as HTMLElement
);

const LazyAppRetry = LazyRetry(() => import('./App'));
const loading = <Loading topText={'Loading application'} bottomText={'Please wait...'}/>;
root.render(
    <React.StrictMode>
        <Provider store={store}>
            <PersistGate loading={loading} persistor={persistor}>
                <BrowserRouter>
                    <React.Suspense fallback={loading}>
                        <LazyAppRetry/>
                    </React.Suspense>
                </BrowserRouter>
            </PersistGate>
        </Provider>
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
