
export interface IProcess {
    id: string,
    title: string,
    description: string,
}

export interface IGetProcessResponse {
    processes: IProcess[];
}