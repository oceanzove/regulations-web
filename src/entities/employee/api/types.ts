export interface IAccount {
    id: string;
    login: string;
    password: string;
    role: string;
}

export interface IDepartment {
    id: string;
    name: string;
}

export interface IGetDepartmentsResponse {
    departments: IDepartment[]
}

export interface IPosition {
    id: string;
    name: string;
}

export interface IGetPositionsResponse {
    positions: IPosition[]
}

export interface IEmployee {
    id: string;
    fullName: string;
    phoneNumber: string;
    birthDate: Date;
    employmentDate: Date;
    residentialAddress: string;
    maritalStatus: string;
    email: string;
}

export interface IEmployeeCreateRequest {
    account: IAccount;
    employee: IEmployee;
    departmentId: string;
    positionId: string;
}

export interface IPositionCreateRequest {
    id: string;
    name: string;
    departmentId: string;
}

export interface IDepartmentCreateRequest {
    id: string;
    name: string;
}

export interface IEmployeePosition {
    employeeId: string;
    positionId: string;
}

export interface IEmployeePositionResponse {
    employeePosition: IEmployeePosition[];
}

export interface IDepartmentPosition {
    departmentId: string;
    positionId: string;
}

export interface IGetDepartmentPositionResponse {
    departmentPosition: IDepartmentPosition[];
}

export interface IEmployeeDepartment {
    employeeId: string;
    departmentId: string;
}

export interface IEmployeeDepartmentResponse {
    employeeDepartment: IEmployeeDepartment[];
}

export interface IEmployeePositionUpdate {
    employeeId: string;
    positionId: string;
}

export interface IPositionUpdate {
    id: string;
    name: string;
    departmentId: string;
}

export interface IEmployeeDepartmentUpdate {
    employeeId: string;
    departmentId: string;
}

export interface IGetEmployeesResponse {
    employees: IEmployee[]
}

export enum AccountRoleEnum {
    ADMIN = "administrator",
    EMPLOYEE = "employee"
}

export enum EmployeeMaritalStatusEnum {
    SINGLE = "single",
    MARRIED = "married",
    WINDOWED = "widowed",
    DIVORCED = "divorced",
}