import { Navigate } from 'react-router-dom';
import { LoginForm } from '../../features/login-form';
import { RoutesEnum } from '../../shared/config';
import { useAppSelector } from '../../shared/lib';
import { AuthEnum } from '../../entities/user';
import { authSelector } from '../../entities/user/model/selectors';
import { RandomCityBtn } from '../../features/random-city-btn';

export default function LoginPage() {
  const authorizationStatus = useAppSelector(authSelector);
  return (
    authorizationStatus === AuthEnum.AUTHENTICATED ?
      (
        <Navigate to={RoutesEnum.MAIN}/>
      )
      :
      (
        <div className="page page--gray page--login">
          <main className="page__main page__main--login">
            <div className="page__login-container container">
              <section className="login">
                <h1 className="login__title">Sign in</h1>
                <LoginForm/>
              </section>
              <section className="locations locations--login locations--current">
                <div className="locations__item">
                  <RandomCityBtn/>
                </div>
              </section>
            </div>
          </main>
        </div>
      )
  );
}
