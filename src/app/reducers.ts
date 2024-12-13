import { combineReducers } from '@reduxjs/toolkit';
import { signInReducer } from '../entities/user/auth/model/slices/signInSlice';
import { authAPI } from '../entities/user/auth/api/api.ts';
import { regulationReducer } from "../entities/regulation/model/slices/regulationSlice.ts";
import { regulationApi } from "../entities/regulation/api/api.ts";

export const reducers = combineReducers({
    signIn: signInReducer,
    [authAPI.reducerPath]: authAPI.reducer,
    regulation: regulationReducer,
    [regulationApi.reducerPath]: regulationApi.reducer
});

export type RootState = ReturnType<typeof reducers>;
