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

export interface IEmployeePositionUpdate {
    employeeId: string;
    positionId: string;
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