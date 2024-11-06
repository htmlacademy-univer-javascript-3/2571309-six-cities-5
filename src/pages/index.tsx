import { FC } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { AuthEnum, routesEnum } from './types';
import PrivateRoute from './private-route';
import { OfferType } from '../shared/types';
import { privateRoutes, publicRoutes } from './routes';

interface IAppRouterProps {
  offersMockData: OfferType[];
}
const AppRouter: FC<IAppRouterProps> = (props: IAppRouterProps) => (
  <Routes>
    {publicRoutes.map((myRoute) => <Route key={myRoute.path} element={<myRoute.Component {...props}/>} path={myRoute.path} />)}
    {privateRoutes.map((myRoute) =>(
      <Route key={myRoute.path} path={myRoute.path}
        element={<PrivateRoute authState={AuthEnum.AUTHENTICATED} key={myRoute.path}>{<myRoute.Component {...props}/>}</PrivateRoute>}
      />
    )
    )}
    <Route path="*" element={<Navigate to={routesEnum.NOT_FOUND} />} />
  </Routes>);

export default AppRouter;
