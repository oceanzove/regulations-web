import {BaseQueryFn, FetchArgs, fetchBaseQuery, FetchBaseQueryError} from '@reduxjs/toolkit/query';
import { v4 as uuid } from 'uuid';
import { SERVER_ENVIRONMENT_DEV } from '../../api/API.ts';


// const BASE_API_URL_PRODUCTION = 'https://wakadoo.ru/api/';
// const BASE_API_URL_TEST = 'https://test.wakadoo.ru/api/';
const BASE_API_URL_DEV = 'http://localhost:25504/api/';

export const providesList = <R extends { id: string | number }[], T extends string>(
    resultsWithIds: R | undefined,
    tagType: T,
) => (resultsWithIds
    ? [...resultsWithIds.map(({ id }) => ({
        type: tagType,
        id,
    }))]
    : [tagType]);

const setBaseUrl = () => {
    const serverEnvironment = import.meta.env.VITE_ENVIRONMENT_SERVER;

    switch (serverEnvironment) {
        case SERVER_ENVIRONMENT_DEV:
            return BASE_API_URL_DEV;
        default:
            return '';
    }
};
const paramsSerializer = (params: any) => {
    const searchParams = new URLSearchParams();
    Object.keys(params)
        .forEach((key) => {
            const value = params[key];
            if (Array.isArray(value)) {
                value.forEach((item) => {
                    searchParams.append(key, item);
                });
            } else if (value) {
                searchParams.append(key, value);
            }
        });
    return searchParams.toString();
};

export const baseQuery: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (
    args,
    api,
    extraOptions
) => {
    const accessToken = localStorage.getItem('token') || sessionStorage.getItem('token') || undefined;

    const prepareRequest = (args: string | FetchArgs, token?: string): FetchArgs => {
        if (typeof args === 'string') {
            return {
                url: args,
                method: 'GET',
                headers: {
                    'Authorization': token ? `Bearer ${token}` : '',
                    'Client-Request-Id': uuid(),
                },
            };
        } else {
            return {
                ...args,
                headers: {
                    ...(args.headers || {}),
                    'Authorization': token ? `Bearer ${token}` : '',
                    'Client-Request-Id': uuid(),
                },
            };
        }
    };

    const rawBaseQuery = fetchBaseQuery({
        baseUrl: setBaseUrl(),
        credentials: 'include',
        paramsSerializer,
    });

    let preparedArgs = prepareRequest(args, accessToken);
    let result = await rawBaseQuery(preparedArgs, api, extraOptions);

    if (result.error?.status === 401) {
        const refreshToken = localStorage.getItem('refresh_token');
        console.log('авторизация кончилась')
        if (refreshToken) {
            console.log('реавтораизация')
            const refreshResult = await rawBaseQuery(
                {
                    url: '/auth/refresh',
                    method: 'POST',
                    body: { refresh_token: refreshToken },
                },
                api,
                extraOptions
            );

            if (refreshResult.data && typeof refreshResult.data === 'object') {
                const { access_token } = refreshResult.data as { access_token: string };
                localStorage.setItem('token', access_token);

                // Повтор запроса с новым токеном
                preparedArgs = prepareRequest(args, access_token);
                result = await rawBaseQuery(preparedArgs, api, extraOptions);
            } else {
                // Сессия истекла — чистим и редиректим
                localStorage.removeItem('token');
                localStorage.removeItem('refresh_token');

                if (!localStorage.getItem('isSessionExpiredShown')) {
                    localStorage.setItem('isSessionExpiredShown', 'true');
                    localStorage.setItem('isSessionLocked', 'true');
                }

                setTimeout(() => {
                    localStorage.removeItem('isSessionExpiredShown');
                    localStorage.removeItem('isSessionLocked');
                    window.location.href = '/';
                }, 6000);
            }
        }
    }

    return result;
};
