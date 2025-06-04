
export interface IRegulation {
    id: string,
    title: string,
    content: string,
}

export interface IGetRegulationsResponse {
    regulations: IRegulation[];
}

export interface ISection {
    id: string,
    title: string,
    content: string,
}
