import { ElementType } from 'react';
import { RoutesEnum } from '../shared/config';

export interface IRoute {
  path: RoutesEnum;
  Component: ElementType;
}


