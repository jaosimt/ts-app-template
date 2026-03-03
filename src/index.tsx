import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router';
import Loading from './components/partials/loading';
import reportWebVitals from './reportWebVitals';
import './index.scss';
import { LazyRetry } from './utils';

const root = ReactDOM.createRoot(
    document.getElementById('react-ts-template') as HTMLElement
);

const LazyAppRetry = LazyRetry(() => import('./App'));

root.render(
    <React.StrictMode>
        <BrowserRouter>
            <React.Suspense fallback={<Loading topText={'Loading application'} bottomText={'Please wait...'} borderColor={'#00cafd'} borderWidth={3}/>}>
                <LazyAppRetry/>
            </React.Suspense>
        </BrowserRouter>
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
