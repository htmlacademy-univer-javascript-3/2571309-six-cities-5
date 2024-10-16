import { FC } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { privateRoutes, publicRoutes, routesEnum } from './types';
import PrivateRoute from './PrivateRoute';

const AppRouter: FC = () => (
  <Routes>
    {publicRoutes.map((myRoute) => <Route key={myRoute.path} element={<myRoute.Component/>} path={myRoute.path} />)}
    {privateRoutes.map((myRoute) =>(
      <Route key={myRoute.path} path={myRoute.path}
        element={<PrivateRoute key={myRoute.path}>{<myRoute.Component/>}</PrivateRoute>}
      />
    )
    )}
    <Route path="*" element={<Navigate to={routesEnum.NOT_FOUND} />} />
  </Routes>);

export default AppRouter;
