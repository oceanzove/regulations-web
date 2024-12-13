import { configureStore } from '@reduxjs/toolkit';
import { reducers } from './reducers.ts';
import { authAPI } from '../entities/user/auth/api/api.ts';
import {regulationApi} from "../entities/regulation/api/api.ts";

const setupStore = () => configureStore({
    reducer: reducers,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false,
    }).concat(authAPI.middleware, regulationApi.middleware),
});

const store = setupStore();

export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];

export default store;
