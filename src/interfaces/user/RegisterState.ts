export interface RegisterState {
    email: string;
    username: string;
    password: string;
    name: string;
    birthdate: string;
    country: string;
    region: string;
    enterprise: string;
    enterpriseRole: string;
    website?: string;
    aboutme: string;
    photo?: File | string;
}