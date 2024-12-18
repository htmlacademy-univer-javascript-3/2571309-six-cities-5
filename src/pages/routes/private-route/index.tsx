import {Navigate} from 'react-router-dom';
import { PropsWithChildren } from 'react';
import { AuthEnum } from '../../../entities/user';
import { RoutesEnum } from '../../../shared/config';

interface IPrivateRoute extends PropsWithChildren{
  authState: AuthEnum;
}
function PrivateRoute({children, authState}: IPrivateRoute) {
  return authState === AuthEnum.AUTHENTICATED ? children : <Navigate to={RoutesEnum.LOGIN} />;
}

export default PrivateRoute;
