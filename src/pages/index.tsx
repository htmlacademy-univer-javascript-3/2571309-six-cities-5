import { Navigate, Route, Routes } from 'react-router-dom';
import PrivateRoute from './private-route';
import { privateRoutes, publicRoutes } from './routes';
import { useAppSelector } from '../shared/lib';
import { routesEnum } from '../shared/config';
import { MainLayout } from './layouts/main-layout';
import { authSelector } from '../entities/user/model/selectors';

const AppRouter = () => {
  const authorizationStatus = useAppSelector(authSelector);
  return (
    <Routes>
      <Route path={routesEnum.MAIN} element={<MainLayout authorizationStatus={authorizationStatus}/>}>
        {publicRoutes.map((myRoute) => <Route key={myRoute.path} element={<myRoute.Component/>} path={myRoute.path} />)}
        {privateRoutes.map((myRoute) =>(
          <Route key={myRoute.path} path={myRoute.path}
            element={<PrivateRoute authState={authorizationStatus} key={myRoute.path}>{<myRoute.Component/>}</PrivateRoute>}
          />
        )
        )}
        <Route path="*" element={<Navigate to={routesEnum.NOT_FOUND} />} />
      </Route>
    </Routes>
  );
};

export default AppRouter;
