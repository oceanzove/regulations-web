import {createApi} from '@reduxjs/toolkit/query/react';
import {baseQuery} from '../../api/api.ts';
import {
    IAccount,
    IDepartment, IDepartmentCreateRequest,
    IEmployee,
    IEmployeeCreateRequest,
    IEmployeeDepartmentResponse,
    IEmployeeDepartmentUpdate,
    IEmployeePositionResponse,
    IEmployeePositionUpdate, IGetDepartmentPositionResponse,
    IGetDepartmentsResponse,
    IGetEmployeesResponse,
    IGetPositionsResponse,
    IPosition, IPositionCreateRequest, IPositionUpdate,
} from "./types.ts";
import {URI_DEPARTMENT, URI_EMPLOYEE, URI_ORGANIZATION, URI_POSITION} from "./consts.ts";

export const organizationApi = createApi({
    reducerPath: 'organizationApi',
    baseQuery,
    refetchOnReconnect: true,
    tagTypes: ['Employee'],
    endpoints: builder => ({
        getAccount: builder.query<IAccount, void>({
            query: () => ({
                url: `${URI_ORGANIZATION}/${URI_EMPLOYEE}/account`,
                method: 'GET',
            }),
            providesTags: ['Employee'],
        }),
        getAccountById: builder.query<IAccount, string>({
            query: (id) => ({
                url: `${URI_ORGANIZATION}/${URI_EMPLOYEE}/account/${id}`,
                method: 'GET',
            }),
            providesTags: ['Employee'],
        }),
        getDepartments: builder.query<IGetDepartmentsResponse, void>({
            query: () => ({
                url: `${URI_ORGANIZATION}/${URI_DEPARTMENT}`,
                method: 'GET',
            }),
            providesTags: ['Employee'],
        }),
        getDepartmentById: builder.query<IDepartment, string>({
            query: (id) => ({
                url: `${URI_ORGANIZATION}/${URI_DEPARTMENT}/${id}`,
                method: 'GET',
            }),
            providesTags: ['Employee'],
        }),
        getEmployeeDepartment: builder.query<IEmployeeDepartmentResponse, void>({
            query: () => ({
                url: `${URI_ORGANIZATION}/${URI_EMPLOYEE}/${URI_DEPARTMENT}`,
                method: 'GET',
            }),
            providesTags: ['Employee'],
        }),
        getEmployeePosition: builder.query<IEmployeePositionResponse, void>({
            query: () => ({
                url: `${URI_ORGANIZATION}/${URI_EMPLOYEE}/${URI_POSITION}`,
                method: 'GET',
            }),
            providesTags: ['Employee'],
        }),
        getDepartmentByEmployeeId: builder.query<IDepartment, string>({
            query: (id) => ({
                url: `${URI_ORGANIZATION}/${URI_EMPLOYEE}/${URI_DEPARTMENT}/${id}`,
                method: 'GET',
            }),
            providesTags: ['Employee'],
        }),
        getPositions: builder.query<IGetPositionsResponse, void>({
            query: () => ({
                url: `${URI_ORGANIZATION}/${URI_POSITION}`,
                method: 'GET',
            }),
            providesTags: ['Employee'],
        }),
        getPositionByEmployeeId: builder.query<IPosition, string>({
            query: (id) => ({
                url: `${URI_ORGANIZATION}/${URI_EMPLOYEE}/${URI_POSITION}/${id}`,
                method: 'GET',
            }),
        }),
        getPositionsByDepartment: builder.query<IGetPositionsResponse, string>({
            query: (id) => ({
                url: `${URI_ORGANIZATION}/${URI_POSITION}/${id}`,
                method: 'GET',
            }),
        }),
        getPositionDepartment: builder.query<IGetDepartmentPositionResponse, void>({
            query: () => ({
                url: `${URI_ORGANIZATION}/${URI_DEPARTMENT}/${URI_POSITION}`,
                method: 'GET',
            }),
        }),
        createEmployee: builder.mutation<void, IEmployeeCreateRequest>({
            query: ({employee, account, departmentId, positionId}) => ({
                url: `${URI_ORGANIZATION}/${URI_EMPLOYEE}`,
                method: 'POST',
                body: {
                    employee,
                    account,
                    departmentId,
                    positionId,
                },
            }),
            invalidatesTags: ['Employee'],
        }),
        createPosition: builder.mutation<void, IPositionCreateRequest>({
            query: ({id, name, departmentId}) => ({
                url: `${URI_ORGANIZATION}/${URI_POSITION}`,
                method: 'POST',
                body: {
                    id,
                    name,
                    departmentId,
                },
            }),
            invalidatesTags: ['Employee'],
        }),
        createDepartment: builder.mutation<void, IDepartmentCreateRequest>({
            query: ({id, name}) => ({
                url: `${URI_ORGANIZATION}/${URI_DEPARTMENT}`,
                method: 'POST',
                body: {
                    id,
                    name,
                },
            }),
            invalidatesTags: ['Employee'],
        }),
        updateEmployee: builder.mutation<void, IEmployee>({
            query: ({
                        id,
                        fullName,
                        phoneNumber,
                        birthDate,
                        employmentDate,
                        residentialAddress,
                        maritalStatus,
                        email
                    }) => ({
                url: `${URI_ORGANIZATION}/${URI_EMPLOYEE}/${id}`,
                method: 'PUT',
                body: {
                    fullName,
                    phoneNumber,
                    birthDate,
                    employmentDate,
                    residentialAddress,
                    maritalStatus,
                    email,
                },
            }),
            invalidatesTags: ['Employee'],
        }),
        updatePositionById: builder.mutation<void, IPositionUpdate>({
            query: ({
                        id,
                        name,
                        departmentId,
                    }) => ({
                url: `${URI_ORGANIZATION}/${URI_POSITION}/${id}`,
                method: 'PUT',
                body: {
                    name, departmentId,
                },
            }),
            invalidatesTags: ['Employee'],
        }),
        updateDepartmentById: builder.mutation<void, IDepartment>({
            query: ({
                        id,
                        name,
                    }) => ({
                url: `${URI_ORGANIZATION}/${URI_DEPARTMENT}/${id}`,
                method: 'PUT',
                body: {
                    name,
                },
            }),
            invalidatesTags: ['Employee'],
        }),
        updateEmployeePosition: builder.mutation<void, IEmployeePositionUpdate>({
            query: ({
                        employeeId,
                        positionId,
                    }) => ({
                url: `${URI_ORGANIZATION}/${URI_EMPLOYEE}/${URI_POSITION}/${employeeId}`,
                method: 'PUT',
                body: {
                    positionId,
                },
            }),
            invalidatesTags: ['Employee'],
        }),
        updateEmployeeDepartment: builder.mutation<void, IEmployeeDepartmentUpdate>({
            query: ({
                        employeeId,
                        departmentId,
                    }) => ({
                url: `${URI_ORGANIZATION}/${URI_EMPLOYEE}/${URI_DEPARTMENT}/${employeeId}`,
                method: 'PUT',
                body: {
                    departmentId,
                },
            }),
            invalidatesTags: ['Employee'],
        }),
        getEmployeeById: builder.query<IEmployee, string>({
            query: (id) => ({
                url: `${URI_ORGANIZATION}/${URI_EMPLOYEE}/${id}`,
                method: 'GET',
            }),
            providesTags: ['Employee'],
        }),
        getEmployees: builder.query<IGetEmployeesResponse, void>({
            query: () => ({
                url: `${URI_ORGANIZATION}/${URI_EMPLOYEE}`,
                method: 'GET',
            }),
            providesTags: ['Employee'],
        }),
        deleteEmployeeById: builder.mutation<void, string>({
            query: (id) => ({
                url: `${URI_ORGANIZATION}/${URI_EMPLOYEE}/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Employee'],
        }),
    }),
});