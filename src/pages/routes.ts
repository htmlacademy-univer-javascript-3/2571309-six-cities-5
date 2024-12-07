import { RoutesEnum } from '../shared/config';
import FavoritesPage from './favorites-page';
import LoginPage from './login-page';
import MainPage from './main-page';
import NotFoundPage from './not-found-page';
import OfferPage from './offer-page';
import { IRoute } from './types';
export const publicRoutes: IRoute[] = [
  {
    path: RoutesEnum.LOGIN,
    Component: LoginPage,
  },
  {
    path: RoutesEnum.MAIN,
    Component: MainPage,
  },
  {
    path: RoutesEnum.OFFER,
    Component: OfferPage,
  },
  {
    path: RoutesEnum.NOT_FOUND,
    Component: NotFoundPage,
  }
];

export const privateRoutes: IRoute[] = [
  {
    path: RoutesEnum.FAVORITES,
    Component: FavoritesPage,
  }
];
