export interface IAuth {
    email: string;
    password: string;
    endpoint: string;
    roleKey?: string;
}

export interface IDecodedToken {
    id: number;
    email: string;
    role: string;
    exp: number;
    iat: number;
}