import {IRegulation} from "../model/slices/regulationSlice.ts";

export interface IGetRegulationsResponse {
    regulations: IRegulation[];
}

export interface ICreateRegulationResponse {
    id: string;
    title: string;
    content: string;
}


