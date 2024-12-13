import { createApi } from '@reduxjs/toolkit/query/react';
import {URI_REGULATION} from "./consts.ts";
import {IGetRegulationsResponse} from "./types.ts";
import {baseQuery} from "../../../shared/api/api.ts";

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
