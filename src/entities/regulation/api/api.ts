import {createApi} from '@reduxjs/toolkit/query/react';
import {URI_REGULATION} from "./consts.ts";
import {IGetRegulationsResponse, IRegulation, ISection} from "./types.ts";
import {baseQuery} from "../../api/api.ts";

export const regulationApi = createApi({
    reducerPath: 'regulationApi',
    baseQuery,
    refetchOnReconnect: true,
    endpoints: builder => ({
        get: builder.query<IGetRegulationsResponse, void>({
            query: () => ({
                url: URI_REGULATION,
                method: 'GET',
            }),
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
        }),
        createSection: builder.mutation<void, IRegulation>({
            query: ({
                        id, title, content
                    }) => ({
                url: `${URI_REGULATION}/section`,
                method: 'POST',
                body: { id, title, content }
            }),
        }),
        getSection: builder.query<{sections: ISection[]}, void>({
            query: () => ({
                url: `${URI_REGULATION}/section`,
                method: 'GET',
            }),
        }),
        getById: builder.query<IRegulation, string>({
            query: (id) => ({
                url: `${URI_REGULATION}/${id}`,
                method: 'GET',
            }),
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
