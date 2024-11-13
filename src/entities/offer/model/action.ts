import { createAction } from '@reduxjs/toolkit';
import { SortingOptionsEnum } from '../../../features/sorting-panel';

export const changeCity = createAction<string>('offer/changeCity');
export const fillOffers = createAction('offer/fillOffers');
export const changeSort = createAction<SortingOptionsEnum>('offer/changeSort');
