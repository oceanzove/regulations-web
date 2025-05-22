import {IStep} from "../../step/api/types.ts";

export interface IProcess {
    id: string,
    title: string,
    description: string,
    steps: IStep[],
}

export interface IGetProcessResponse {
    processes: IProcess[];
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
