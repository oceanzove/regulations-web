import {createApi} from '@reduxjs/toolkit/query/react';
import {baseQuery} from "../../api/api.ts";
import {
    IGetProcessResponse,
    IProcess
} from "./types.ts";
import {URI_PROCESS} from "./consts.ts";
import {IStep} from "../../step/api/types.ts";
import {IRegulation} from "../../regulation/api/types.ts";
import {URI_EMPLOYEE, URI_ORGANIZATION} from "../../employee/api/consts.ts";
import {URI_REGULATION} from "../../regulation/api/consts.ts";
import {URI_STEP} from "../../step/api/consts.ts";

export const processApi = createApi({
    reducerPath: 'processApi',
    baseQuery,
    refetchOnReconnect: true,
    tagTypes: ['Process'],
    endpoints: builder => ({
        get: builder.query<IGetProcessResponse, void>({
            query: () => ({
                url: URI_PROCESS,
                method: 'GET',
            }),
            providesTags: ['Process'],
        }),
        getSteps: builder.query<IStep[], string>({
            query: (processId) => ({
                url: `${URI_PROCESS}/${processId}/step`,
                method: 'GET',
            }),
            providesTags: ['Process'],
        }),
        getRegulations: builder.query<IRegulation[], string>({
            query: (processId) => ({
                url: `${URI_PROCESS}/${processId}/regulation`,
                method: 'GET',
            }),
            providesTags: ['Process'],
        }),
        getById: builder.query<IProcess, string>({
            query: (id) => ({
                url: `${URI_PROCESS}/${id}`,
                method: 'GET',
            }),
            providesTags: ['Process'],
        }),
        update: builder.mutation<void, { process: string, title: string, description: string, responsible: string}>({
            query: ({
                        process,
                        title,
                        description,
                        responsible,
                    }) => ({
                url: `${URI_PROCESS}/${process}`,
                method: 'PUT',
                body: {title, description, responsible},
            }),
            invalidatesTags: ['Process'],
        }),
        updateStepById: builder.mutation<void, IStep>({
            query: ({
                        id,
                        name,
                        description,
                        responsible,
                        order
                    }) => ({
                url: `${URI_PROCESS}/${URI_STEP}/${id}`,
                method: 'PUT',
                body: {name, description, responsible, order},
            }),
            invalidatesTags: ['Process'],
        }),
        linkRegulation: builder.mutation<void, { processId: string, regulationId: string }>({
            query: ({ processId, regulationId }) => ({
                url: `${URI_PROCESS}/${processId}/${URI_REGULATION}/link`,
                method: 'POST',
                body: { regulation_id: regulationId },
            }),
            invalidatesTags: ['Process'],
        }),
        unlinkRegulation: builder.mutation<void, { processId: string, regulationId: string }>({
            query: ({ processId, regulationId }) => ({
                url: `${URI_PROCESS}/${processId}/${URI_REGULATION}/unlink`,
                method: 'POST',
                body: { regulation_id: regulationId },
            }),
            invalidatesTags: ['Process'],
        }),
        createStep: builder.mutation<void, IStep>({
            query: (step) => ({
                url: `${URI_PROCESS}/${URI_STEP}`,
                method: 'POST',
                body: step,
            }),
            invalidatesTags: ['Process'],
        }),
        deleteStepById: builder.mutation<void, string>({
            query: (id) => ({
                url: `${URI_PROCESS}/${URI_STEP}/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Process'],
        }),
        create: builder.mutation<void, IProcess>({
            query: ({
                        id, title, description, responsible
                    }) => ({
                url: URI_PROCESS,
                method: 'POST',
                body: {id, title, description, responsible}
            }),
            invalidatesTags: ['Process'],
        }),
        deleteProcessById: builder.mutation<void, string>({
            query: (id) => ({
                url: `${URI_PROCESS}/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Process'],
        }),
    }),
});
