import {createApi} from '@reduxjs/toolkit/query/react';
import {URI_REGULATION} from "./consts.ts";
import {
    IGetRegulationsResponse,
    ILinkSectionToRegulationRequest,
    IRegulation,
    ISection,
    IUnlinkSectionToRegulationRequest
} from "./types.ts";
import {baseQuery} from "../../api/api.ts";
import {URI_PROCESS} from "../../process/api/consts.ts";

export const regulationApi = createApi({
    reducerPath: 'regulationApi',
    baseQuery,
    refetchOnReconnect: true,
    tagTypes: ['Regulation'],
    endpoints: builder => ({
        get: builder.query<IGetRegulationsResponse, void>({
            query: () => ({
                url: URI_REGULATION,
                method: 'GET',
            }),
            providesTags: ['Regulation'],
        }),
        update: builder.mutation<void, { regulation: string, title: string, content: string }>({
            query: ({
                        regulation,
                        title,
                        content,
                    }) => ({
                url: `${URI_REGULATION}/${regulation}`,
                method: 'PUT',
                body: {title, content},
            }),
        }),
        create: builder.mutation<void, IRegulation>({
            query: ({
                        id, title, content
                    }) => ({
                url: URI_REGULATION,
                method: 'POST',
                body: { id, title, content }
            }),
            invalidatesTags: ['Regulation'],
        }),
        createSection: builder.mutation<void, IRegulation>({
            query: ({
                        id, title, content
                    }) => ({
                url: `${URI_REGULATION}/section`,
                method: 'POST',
                body: { id, title, content }
            }),
            invalidatesTags: ['Regulation'],
        }),
        linkRegulation: builder.mutation<void, ILinkSectionToRegulationRequest>({
            query: ({ id, sectionId, regulationId, order }) => ({
                url: `${URI_REGULATION}/${regulationId}/section/link`,
                method: 'POST',
                body: { id, sectionId, order },
            }),
            invalidatesTags: ['Regulation'],
        }),
        unlinkRegulation: builder.mutation<void, IUnlinkSectionToRegulationRequest>({
            query: ({ sectionId, regulationId }) => ({
                url: `${URI_REGULATION}/${regulationId}/section/unlink`,
                method: 'POST',
                body: { sectionId },
            }),
            invalidatesTags: ['Regulation'],
        }),
        getSection: builder.query<{sections: ISection[]}, void>({
            query: () => ({
                url: `${URI_REGULATION}/section`,
                method: 'GET',
            }),
            providesTags: ['Regulation'],
        }),
        getSectionsIdByRegulation: builder.query<{sectionsIds: string[]}, string>({
            query: (regulationId) => ({
                url: `${URI_REGULATION}/${regulationId}/section`,
                method: 'GET',
            }),
            providesTags: ['Regulation'],
        }),
        getById: builder.query<IRegulation, string>({
            query: (id) => ({
                url: `${URI_REGULATION}/${id}`,
                method: 'GET',
            }),
            providesTags: ['Regulation'],
        }),
        deleteProcessById: builder.mutation<void, string>({
            query: (id) => ({
                url: `${URI_REGULATION}/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Regulation'],
        }),
        // resendCode: builder.mutation<void, { email: string }>({
        //     query: ({ email }) => ({
        //         url: URI_SEND_CODE,
        //         method: 'POST',
        //         body: { email },
        //     }),
        // }),
        // confirmAccount: builder.mutation<IAccountResponse, IConfirmAccountRequest>({
        //     query: (data) => ({
        //         url: URI_CONFIRM_ACCOUNT,
        //         method: 'POST',
        //         body: { ...data },
        //     }),
        // }),
        // confirmEmployee: builder.mutation<IAccountResponse, { code: string }>({
        //     query: ({ code }) => ({
        //         url: URI_CONFIRM_EMPLOYEE,
        //         method: 'POST',
        //         body: { code },
        //     }),
        // }),
        // resetPassword: builder.mutation<void, { email: string }>({
        //     query: ({ email }) => ({
        //         url: URI_RESET_PASSWORD,
        //         method: 'POST',
        //         body: { email },
        //     }),
        // }),
        // simpleSignUp: builder.mutation<IAccount, ISimpleSignUpRequest>({
        //     query: (data) => ({
        //         url: URI_SIMPLE_SIGN_UP,
        //         method: 'POST',
        //         body: { ...data },
        //     }),
        // }),
    }),
});
