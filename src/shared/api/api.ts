import { fetchBaseQuery } from '@reduxjs/toolkit/query';
import { v4 as uuid } from 'uuid';
import { SERVER_ENVIRONMENT_DEV } from '../../api/API';


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

export const baseQuery = fetchBaseQuery({
    baseUrl: setBaseUrl(),
    paramsSerializer,
    credentials: 'include',
    prepareHeaders: (headers) => {
        const authorization = localStorage.getItem('token')
            ? localStorage.getItem('token')
            : sessionStorage.getItem('token');

        const token = `Bearer ${authorization}`

        headers.set('Client-Request-Id', uuid());
        headers.set('Authorization', token || '');

        return headers;
    },
});

