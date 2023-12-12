export interface IAuth {
    email: string;
    password: string;
    rememberMe: boolean;
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