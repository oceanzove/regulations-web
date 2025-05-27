import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQuery } from '../../api/api';
import { IStep } from './types';
import {URI_STEP} from "./consts.ts";

export const stepApi = createApi({
    reducerPath: 'stepApi',
    baseQuery,
    tagTypes: ['Step'],
    endpoints: (builder) => ({
        // getSteps: builder.query<IStep[], void>({
        //     query: () => ({
        //         url: URI_STEP,
        //         method: 'GET',
        //     }),
        //     providesTags: ['Step'],
        // }),
        // createSteps: builder.mutation<void, IStep[]>({
        //     query: (steps) => ({
        //         url: URI_STEP,
        //         method: 'POST',
        //         body: {
        //             steps: steps
        //         },
        //     }),
        // }),
        // updateStep: builder.mutation<IStep, { id: string; changes: Partial<IStep> }>({
        //     query: ({ id, changes }) => ({
        //         url: `${URI_STEP}/${id}`,
        //         method: 'PUT',
        //         body: changes,
        //     }),
        //     invalidatesTags: ['Step'],
        // }),
        // deleteStep: builder.mutation<void, string>({
        //     query: (id) => ({
        //         url: `${URI_STEP}/${id}`,
        //         method: 'DELETE',
        //     }),
        //     invalidatesTags: ['Step'],
        // }),
    }),
});

export const {
    // useGetStepsQuery,
    // useCreateStepsMutation,
    // useUpdateStepMutation,
    // useDeleteStepMutation,
} = stepApi;
