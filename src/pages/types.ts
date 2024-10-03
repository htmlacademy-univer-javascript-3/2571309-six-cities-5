import { ElementType } from 'react';
import FavoritesPage from './FavoritesPage';
import LoginPage from './LoginPage';
import MainPage from './MainPage';
import NotFoundPage from './NotFoundPage';
import OfferPage from './OfferPage';


interface IRoute {
  path: routesEnum;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  Component: ElementType;
}
export enum routesEnum {
  LOGIN = '/login',
  MAIN = '/',
  FAVORITES = '/favorites',
  OFFER = '/offer/:id',
  NOT_FOUND = '/notFound'
}
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
  },
];

export const privateRoutes: IRoute[] = [
  {
    path: routesEnum.FAVORITES,
    Component: FavoritesPage,
  }
];

