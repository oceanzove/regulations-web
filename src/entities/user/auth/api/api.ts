import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQuery } from '../../../../shared/api/api';
import {
    URI_SIGN_IN,
    URI_SIGN_UP,
} from './consts';
import {
    IAccountResponse,
    ISignInRequest,
    ISignUpRequest,

} from './types';

export const authAPI = createApi({
    reducerPath: 'authAPI',
    baseQuery,
    refetchOnReconnect: true,
    endpoints: builder => ({
        signIn: builder.mutation<IAccountResponse, ISignInRequest>({
            query: (data) => ({
                url: URI_SIGN_IN,
                method: 'POST',
                body: { ...data },
            }),
        }),
        signUp: builder.mutation<void, ISignUpRequest>({
            query: (data) => ({
                url: URI_SIGN_UP,
                method: 'POST',
                body: { ...data },
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
