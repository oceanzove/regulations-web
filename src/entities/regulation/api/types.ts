
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

export interface ILinkSectionToRegulationRequest {
    id: string,
    sectionId: string,
    regulationId: string,
    order: number,
}

export interface IUnlinkSectionToRegulationRequest {
    sectionId: string,
    regulationId: string,
}
