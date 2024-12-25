import { createApi } from '@reduxjs/toolkit/query/react';
import {baseQuery} from "../../../shared/api/api.ts";
import {IGetProcessResponse} from "./types.ts";
import {URI_PROCESS} from "./consts.ts";

export const processApi = createApi({
    reducerPath: 'processApi',
    baseQuery,
    refetchOnReconnect: true,
    endpoints: builder => ({
        get: builder.query<IGetProcessResponse, void>({
            query: () => ({
                url: URI_PROCESS,
                method: 'GET',
            }),
        }),
    }),
});
