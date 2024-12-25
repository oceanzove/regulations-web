
export interface IProcess {
    id: string,
    title: string,
    description: string,
}

export interface IGetProcessResponse {
    processes: IProcess[];
}

export interface ICreateProcessResponse {
    id: string;
    title: string;
    description: string;
}
