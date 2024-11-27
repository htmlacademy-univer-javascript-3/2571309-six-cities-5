import { Outlet } from 'react-router-dom';
import { AuthEnum } from '../../../entities/user';
import { Header } from '../../../widgets/header';

interface MainLayoutProps {
    authorizationStatus: AuthEnum;
}
export function MainLayout(props: MainLayoutProps) {
  return (
    <>
      <Header isAuthentificated={props.authorizationStatus === AuthEnum.AUTHENTICATED}/>
      <Outlet/>
    </>

  );
}
