import { combineReducers, configureStore } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';
import loggerMiddleware from 'redux-logger';
import todo from '../components/pages/demo/slices/todo';
import counter from '../slices/counter';

const persistConfig = {
    key: 'js',
    version: 1,
    storage,
    whitelist: ['todo']
};

const reducer = combineReducers({
    counter,
    todo
});

const persistedReducer = persistReducer(persistConfig, reducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        // getDefaultMiddleware() includes thunk by default
        getDefaultMiddleware({
            serializableCheck: {
                ignoredPaths: [
                ],
                ignoredActions: [
                    'persist/PERSIST'
                ]
            }
        }).concat(loggerMiddleware),
    devTools: process.env.NODE_ENV !== 'production'
});

export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export type AppStore = typeof store
