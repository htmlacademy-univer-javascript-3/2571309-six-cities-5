import { ElementType } from 'react';

export interface IRoute {
  path: routesEnum;
  Component: ElementType;
}
export enum routesEnum {
  LOGIN = '/login',
  MAIN = '/',
  FAVORITES = '/favorites',
  OFFER = '/offer/:id',
  NOT_FOUND = '/notFound'
}

export enum AuthEnum {
  AUTHENTICATED,
  NO_AUTHENTICATED,
  UNKNOWN
}

