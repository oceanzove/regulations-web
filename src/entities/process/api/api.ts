import {createApi} from '@reduxjs/toolkit/query/react';
import {baseQuery} from "../../api/api.ts";
import {ICreateProcessRequest, ICreateProcessResponse, IGetProcessResponse} from "./types.ts";
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
        update: builder.mutation<void, { process: string, title: string, description: string }>({
            query: ({
                        process,
                        title,
                        description,
                    }) => ({
                url: `${URI_PROCESS}/${process}`,
                method: 'PUT',
                body: {title, description},
            }),
        }),
        create: builder.mutation<void, ICreateProcessRequest>({
            query: ({
                        id, title, description
                    }) => ({
                url: URI_PROCESS,
                method: 'POST',
                body: {id, title, description}
            }),
        }),
    }),
});
