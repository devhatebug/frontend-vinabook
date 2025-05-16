import { api } from './api.ts';
import { IUser } from '../types/user';

export interface Credentials {
    email: string;
    username: string;
    password: string;
}

export interface CredentialsLogin {
    username: string;
    password: string;
}

export interface IUserWithRole extends IUser {
    role: string;
}

export interface LoginResponse {
    message: string;
    token?: string;
    user?: IUserWithRole;
}

export interface SignupResponse {
    message: string;
    user?: IUser;
}

export const loginApi = async (
    credentials: CredentialsLogin
): Promise<LoginResponse> => {
    const response = await api.post('/auth/login', credentials);
    return response.data;
};

export const signupApi = async (
    credentials: Credentials
): Promise<SignupResponse> => {
    const response = await api.post('/auth/register', credentials);
    return response.data;
};
