import { Navigate } from 'react-router-dom';
import { LoginForm } from '../features/login-form';
import { routesEnum } from '../shared/config';
import { useAppSelector } from '../shared/lib';
import { AuthEnum } from '../entities/user';

export default function LoginPage() {
  const {authorizationStatus} = useAppSelector((state)=>state.user);
  return (
    authorizationStatus === AuthEnum.AUTHENTICATED ?
      (
        <Navigate to={routesEnum.MAIN}/>
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
                  <a className="locations__item-link" href="#">
                    <span>Amsterdam</span>
                  </a>
                </div>
              </section>
            </div>
          </main>
        </div>
      )
  );
}
