import { UserType } from '../../../entities/user';

export interface IHeaderProps {
    isAuthentificated: boolean;
    user?: UserType;
}
