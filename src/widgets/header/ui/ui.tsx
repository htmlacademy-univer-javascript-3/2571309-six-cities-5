import { Link } from 'react-router-dom';
import { routesEnum } from '../../../shared/config';
import { IHeaderProps } from './types';
import { useAppDispatch } from '../../../shared/lib';
import { logout } from '../../../entities/user/model/action';

export default function Header(props: IHeaderProps) {
  const dispatch = useAppDispatch();
  return(
    <header className="header">
      <div className="container">
        <div className="header__wrapper">
          <div className="header__left">
            <Link className="header__logo-link"
              to={'..'}
            >
              <img
                className="header__logo"
                src="img/logo.svg"
                alt="6 cities logo"
                width={81}
                height={41}
              />
            </Link>
          </div>
          <nav className="header__nav">
            <ul className="header__nav-list">
              {props.isAuthentificated && (
                <li className="header__nav-item user">
                  <Link
                    className="header__nav-link header__nav-link--profile"
                    to={routesEnum.FAVORITES}
                  >
                    <div className="header__avatar-wrapper user__avatar-wrapper"></div>
                    <span className="header__user-name user__name">
                      {props.user?.email} Oliver.conner@gmail.com
                    </span>
                    <span className="header__favorite-count">3</span>
                  </Link>
                </li>
              )}
              <li className="header__nav-item">
                {
                  props.isAuthentificated ? (
                    <span className="header__nav-link" style={{cursor:'pointer'}} onClick={(event) => {
                      event.preventDefault();
                      dispatch(logout());
                    }}
                    >
                      <span className="header__signout">Log Out</span>
                    </span>) : (
                    <Link className="header__nav-link" to={routesEnum.LOGIN}>
                      <span className="header__signout">Sign in</span>
                    </Link>)
                }

              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}
