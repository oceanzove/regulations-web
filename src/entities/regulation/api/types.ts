
export interface IRegulation {
    id: string,
    title: string,
    content: string,
}

export interface IGetRegulationsResponse {
    regulations: IRegulation[];
}

export interface ICreateRegulationResponse {
    id: string;
    title: string;
    content: string;
}


