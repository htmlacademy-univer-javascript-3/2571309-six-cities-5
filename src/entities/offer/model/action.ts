import { createAction } from '@reduxjs/toolkit';

export const changeCity = createAction<string>('offer/changeCity');
export const fillOffers = createAction('offer/fillOffers');
