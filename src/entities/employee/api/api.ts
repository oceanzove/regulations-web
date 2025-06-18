import {createApi} from '@reduxjs/toolkit/query/react';
import {baseQuery} from '../../api/api.ts';
import {
    IAccount,
    IDepartment,
    IEmployee,
    IEmployeeCreateRequest,
    IEmployeeDepartmentResponse,
    IEmployeeDepartmentUpdate,
    IEmployeePositionResponse,
    IEmployeePositionUpdate,
    IGetDepartmentsResponse,
    IGetEmployeesResponse,
    IGetPositionsResponse,
    IPosition,
} from "./types.ts";
import {URI_DEPARTMENT, URI_EMPLOYEE, URI_ORGANIZATION, URI_POSITION} from "./consts.ts";

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
        getAccountById: builder.query<IAccount, string>({
            query: (id) => ({
                url: `${URI_ORGANIZATION}/${URI_EMPLOYEE}/account/${id}`,
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
        }),
        getEmployeeDepartment: builder.query<IEmployeeDepartmentResponse, void>({
            query: () => ({
                url: `${URI_ORGANIZATION}/${URI_EMPLOYEE}/${URI_DEPARTMENT}`,
                method: 'GET',
            }),
        }),
        getEmployeePosition: builder.query<IEmployeePositionResponse, void>({
            query: () => ({
                url: `${URI_ORGANIZATION}/${URI_EMPLOYEE}/${URI_POSITION}`,
                method: 'GET',
            }),
        }),
        getDepartmentByEmployeeId: builder.query<IDepartment, string>({
            query: (id) => ({
                url: `${URI_ORGANIZATION}/${URI_EMPLOYEE}/${URI_DEPARTMENT}/${id}`,
                method: 'GET',
            }),
        }),
        getPositions: builder.query<IGetPositionsResponse, void>({
            query: () => ({
                url: `${URI_ORGANIZATION}/${URI_POSITION}`,
                method: 'GET',
            }),
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
        }),
        getEmployeeById: builder.query<IEmployee, string>({
            query: (id) => ({
                url: `${URI_ORGANIZATION}/${URI_EMPLOYEE}/${id}`,
                method: 'GET',
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