export interface ISignInRequest {
    email: string;
    password: string;
}

export interface IAccountResponse {
    accessToken: string;
    refreshToken: string;
}

export interface ISignUpRequest {
    organization: string;
    name: string;
    birthday: string;
    phone: string;
    email: string;
    onOffer: string | null;
}
