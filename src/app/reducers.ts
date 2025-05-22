import { combineReducers } from '@reduxjs/toolkit';
import { signInReducer } from '../entities/user/auth/model/slices/signInSlice';
import { authAPI } from '../entities/user/auth/api/api.ts';
import { regulationReducer } from "../entities/regulation/model/slices/regulationSlice.ts";
import { regulationApi } from "../entities/regulation/api/api.ts";
import {processApi} from "../entities/process/api/api.ts";
import {processReducer} from "../entities/process/model/slices/processSlice.ts";
import {stepReducer} from "../entities/step/model/slices/stepSlice.ts";
import {stepApi} from "../entities/step/api/api.ts";

export const reducers = combineReducers({
    signIn: signInReducer,
    [authAPI.reducerPath]: authAPI.reducer,
    regulation: regulationReducer,
    [regulationApi.reducerPath]: regulationApi.reducer,
    process: processReducer,
    [processApi.reducerPath]: processApi.reducer,
    step: stepReducer,
    [stepApi.reducerPath]: stepApi.reducer,
});

export type RootState = ReturnType<typeof reducers>;
