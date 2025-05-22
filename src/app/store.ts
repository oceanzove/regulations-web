import { configureStore } from '@reduxjs/toolkit';
import { reducers } from './reducers.ts';
import { authAPI } from '../entities/user/auth/api/api.ts';
import {regulationApi} from "../entities/regulation/api/api.ts";
import {processApi} from "../entities/process/api/api.ts";
import {stepApi} from "../entities/step/api/api.ts";

const setupStore = () => configureStore({
    reducer: reducers,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false,
    }).concat(authAPI.middleware, regulationApi.middleware, processApi.middleware, stepApi.middleware),
});

const store = setupStore();

export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];

export default store;
