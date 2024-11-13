import { Navigate, Route, Routes } from 'react-router-dom';
import PrivateRoute from './private-route';
import { privateRoutes, publicRoutes } from './routes';
import { useAppSelector } from '../shared/lib';
import { routesEnum } from '../shared/config';
import { Header } from '../widgets/header';
import { AuthEnum } from '../entities/user';

const AppRouter = () => {
  const {authorizationStatus} = useAppSelector((state)=>state.user);
  return (
    <>
      <Header isAuthentificated={authorizationStatus === AuthEnum.AUTHENTICATED}/>
      <Routes>
        {publicRoutes.map((myRoute) => <Route key={myRoute.path} element={<myRoute.Component/>} path={myRoute.path} />)}
        {privateRoutes.map((myRoute) =>(
          <Route key={myRoute.path} path={myRoute.path}
            element={<PrivateRoute authState={authorizationStatus} key={myRoute.path}>{<myRoute.Component/>}</PrivateRoute>}
          />
        )
        )}
        <Route path="*" element={<Navigate to={routesEnum.NOT_FOUND} />} />
      </Routes>
    </>

  );
};

export default AppRouter;