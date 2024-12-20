import { Navigate, Route, Routes } from 'react-router-dom';
import { privateRoutes, publicRoutes } from './routes';
import { useAppSelector } from '../shared/lib';
import { RoutesEnum } from '../shared/config';
import { MainLayout } from './layouts/main-layout';
import { authSelector } from '../entities/user/model/selectors';
import PrivateRoute from './routes/private-route';
import { AuthEnum } from '../entities/user';
import { Spinner } from '../shared/ui/spinner';

const AppRouter = () => {
  const authorizationStatus = useAppSelector(authSelector);
  if(authorizationStatus === AuthEnum.UNKNOWN) {
    return (<Spinner/>);
  }
  return (
    <Routes>
      <Route path={RoutesEnum.MAIN} element={<MainLayout authorizationStatus={authorizationStatus}/>}>
        {publicRoutes.map((myRoute) => <Route key={myRoute.path} element={<myRoute.Component/>} path={myRoute.path} />)}
        {privateRoutes.map((myRoute) =>(
          <Route key={myRoute.path} path={myRoute.path}
            element={<PrivateRoute authState={authorizationStatus} key={myRoute.path}>{<myRoute.Component/>}</PrivateRoute>}
          />
        )
        )}
        <Route path="*" element={<Navigate to={RoutesEnum.NOT_FOUND} />} />
      </Route>
    </Routes>
  );
};

export default AppRouter;
