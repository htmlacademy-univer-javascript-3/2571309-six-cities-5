import {Navigate} from 'react-router-dom';
import { AuthEnum, routesEnum } from './types';
import { PropsWithChildren } from 'react';

interface IPrivateRoute extends PropsWithChildren{
  authState: AuthEnum;
}
function PrivateRoute({children, authState}: IPrivateRoute) {
  return authState === AuthEnum.AUTHENTICATED ? children : <Navigate to={routesEnum.LOGIN} />;
}

export default PrivateRoute;
