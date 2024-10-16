import {Navigate} from 'react-router-dom';
import { routesEnum } from './types';
import { PropsWithChildren } from 'react';

function PrivateRoute({children}: PropsWithChildren) {
  const isAuth = false;
  return isAuth ? children : <Navigate to={routesEnum.LOGIN} />;
}

export default PrivateRoute;
