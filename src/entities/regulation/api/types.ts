import {IRegulation} from "../model/slices/regulationSlice.ts";

export interface IGetRegulationsResponse {
    regulations: IRegulation[];
}

export interface IGetRegulationRequest {
    email: string | null;
}

