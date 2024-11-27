import { ElementType } from 'react';
import { routesEnum } from '../shared/config';

export interface IRoute {
  path: routesEnum;
  Component: ElementType;
}


