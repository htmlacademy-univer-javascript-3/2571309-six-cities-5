import { Navigate, Route, Routes } from 'react-router-dom';
import { AuthEnum, routesEnum } from './types';
import PrivateRoute from './private-route';
import { privateRoutes, publicRoutes } from './routes';

const AppRouter = () => (
  <Routes>
    {publicRoutes.map((myRoute) => <Route key={myRoute.path} element={<myRoute.Component/>} path={myRoute.path} />)}
    {privateRoutes.map((myRoute) =>(
      <Route key={myRoute.path} path={myRoute.path}
        element={<PrivateRoute authState={AuthEnum.AUTHENTICATED} key={myRoute.path}>{<myRoute.Component/>}</PrivateRoute>}
      />
    )
    )}
    <Route path="*" element={<Navigate to={routesEnum.NOT_FOUND} />} />
  </Routes>);

export default AppRouter;
