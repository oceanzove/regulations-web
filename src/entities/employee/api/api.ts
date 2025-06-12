import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQuery } from '../../api/api.ts';
import {
    IAccount, IDepartment,
    IEmployeeCreateRequest,
    IGetDepartmentsResponse,
    IGetEmployeesResponse,
    IGetPositionsResponse,
} from "./types.ts";
import {URI_DEPARTMENT, URI_EMPLOYEE, URI_ORGANIZATION, URI_POSITION} from "./consts.ts";
import {IProcess} from "../../process/api/types.ts";
import {URI_PROCESS} from "../../process/api/consts.ts";

export const organizationApi = createApi({
    reducerPath: 'organizationApi',
    baseQuery,
    refetchOnReconnect: true,
    endpoints: builder => ({
        getAccount: builder.query<IAccount, void>({
            query: () => ({
                url: `${URI_ORGANIZATION}/${URI_EMPLOYEE}/account`,
                method: 'GET',
            }),
        }),
        getDepartments: builder.query<IGetDepartmentsResponse, void>({
            query: () => ({
                url: `${URI_ORGANIZATION}/${URI_DEPARTMENT}`,
                method: 'GET',
            }),
        }),
        getDepartmentById: builder.query<IDepartment, string>({
            query: (id) => ({
                url: `${URI_ORGANIZATION}/${URI_DEPARTMENT}/${id}`,
                method: 'GET',
            }),
        }),        getPositions: builder.query<IGetPositionsResponse, void>({
            query: () => ({
                url: `${URI_ORGANIZATION}/${URI_POSITION}`,
                method: 'GET',
            }),
        }),
        getPositionsByDepartment: builder.query<IGetPositionsResponse, string>({
            query: (id) => ({
                url: `${URI_ORGANIZATION}/${URI_POSITION}/${id}`,
                method: 'GET',
            }),
        }),
        createEmployee: builder.mutation<void, IEmployeeCreateRequest>({
            query: ({ employee, account, departmentId, positionId }) => ({
                url: `${URI_ORGANIZATION}/${URI_EMPLOYEE}`,
                method: 'POST',
                body: {
                    employee,
                    account,
                    departmentId,
                    positionId,
                },
            }),
        }),
        getEmployees: builder.query<IGetEmployeesResponse, void>({
            query: () => ({
                url: `${URI_ORGANIZATION}/${URI_EMPLOYEE}`,
                method: 'GET',
            }),
        }),
    }),
});