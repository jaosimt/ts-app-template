import { combineReducers, configureStore } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';
import loggerMiddleware from 'redux-logger';
import todo from '../components/pages/demo/slices/todo';
import toast from '../components/partials/slices/toast';
import counter from '../slices/counter';
import error from '../slices/error';

const persistConfig = {
    key: 'js',
    version: 1,
    storage,
    whitelist: ['todo']
};

const reducer = combineReducers({
    counter,
    todo,
    toast,
    error
});

const persistedReducer = persistReducer(persistConfig, reducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        // getDefaultMiddleware() includes thunk by default
        getDefaultMiddleware({
            serializableCheck: {
                ignoredPaths: [
                    'toast.0.message.$$typeof',
                    'toast.0.message.type',
                    'toast.0.message.props.children.0.$$typeof',
                    'toast.0.message.props.children.1.$$typeof',
                    'toast.0.message.props.children.1.type',
                    'toast.1.message.$$typeof',
                    'toast.1.message.type',
                    'toast.1.message.props.children.0.$$typeof',
                    'toast.1.message.props.children.1.$$typeof',
                    'toast.2.message.type',
                    'toast.2.message.$$typeof',
                    'toast.2.message.props.children.0.$$typeof',
                    'toast.2.message.props.children.1.$$typeof',
                    'error.error'
                ],
                ignoredActions: [
                    'persist/PERSIST',
                    'toast/addToast',
                    'error/setError',
                ]
            }
        }).concat(loggerMiddleware),
    devTools: process.env.NODE_ENV !== 'production'
});

export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export type AppStore = typeof store
