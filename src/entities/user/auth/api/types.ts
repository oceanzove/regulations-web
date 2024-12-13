export interface ISignInRequest {
    email: string;
    password: string;
}

export interface IAccountResponse {
    access_token: string;
    refresh_token: string;
}

export interface ISignUpRequest {
    organization: string;
    name: string;
    birthday: string;
    phone: string;
    email: string;
    onOffer: string | null;
}
