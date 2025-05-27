export interface IProcess {
    id: string,
    title: string,
    description: string,
    responsible: string,
}

export interface IGetProcessResponse {
    processes: IProcess[];
}

export interface IGetByIDProcessResponse {
    process: IProcess
}

export interface ICreateProcessResponse {
    id: string;
    title: string;
    description: string;
}

export interface ICreateProcessRequest {
    id: string;
    title: string;
    description: string;
}
