export type UserType = {
    name: string;
    avatarUrl: string;
    isPro: boolean;
    email?: string;
    token?: string;
}

export type AuthData = {
    email: string;
    password: string;
}

export enum AuthEnum {
    AUTHENTICATED,
    NO_AUTHENTICATED,
    UNKNOWN
}

export interface IInitialStateUserState {
    authorizationStatus: AuthEnum;
    user: UserType | null;
}
