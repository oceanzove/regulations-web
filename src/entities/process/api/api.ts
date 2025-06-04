import {createApi} from '@reduxjs/toolkit/query/react';
import {baseQuery} from "../../api/api.ts";
import {
    IGetProcessResponse,
    IProcess
} from "./types.ts";
import {URI_PROCESS} from "./consts.ts";
import {IStep} from "../../step/api/types.ts";
import {IRegulation} from "../../regulation/api/types.ts";

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
        getSteps: builder.query<IStep[], string>({
            query: (processId) => ({
                url: `${URI_PROCESS}/${processId}/step`,
                method: 'GET',
            }),
        }),
        getRegulations: builder.query<IRegulation[], string>({
            query: (processId) => ({
                url: `${URI_PROCESS}/${processId}/regulation`,
                method: 'GET',
            }),
        }),
        getById: builder.query<IProcess, string>({
            query: (id) => ({
                url: `${URI_PROCESS}/${id}`,
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
        linkRegulation: builder.mutation<void, { processId: string, regulationId: string }>({
            query: ({ processId, regulationId }) => ({
                url: `${URI_PROCESS}/${processId}/regulation`,
                method: 'POST',
                body: { regulation_id: regulationId },
            }),
        }),
        createStep: builder.mutation<void, IStep>({
            query: (step) => ({
                url: `${URI_PROCESS}/step`,
                method: 'POST',
                body: step,
            }),
        }),
        create: builder.mutation<void, IProcess>({
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
