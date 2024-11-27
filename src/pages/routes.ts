import { routesEnum } from '../shared/config';
import FavoritesPage from './favorites-page';
import LoginPage from './login-page';
import MainPage from './main-page';
import NotFoundPage from './not-found-page';
import OfferPage from './offer-page';
import { IRoute } from './types';
export const publicRoutes: IRoute[] = [
  {
    path: routesEnum.LOGIN,
    Component: LoginPage,
  },
  {
    path: routesEnum.MAIN,
    Component: MainPage,
  },
  {
    path: routesEnum.OFFER,
    Component: OfferPage,
  },
  {
    path: routesEnum.NOT_FOUND,
    Component: NotFoundPage,
  }
];

export const privateRoutes: IRoute[] = [
  {
    path: routesEnum.FAVORITES,
    Component: FavoritesPage,
  }
];
