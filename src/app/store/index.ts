import { configureStore } from '@reduxjs/toolkit';
import { offersReducer } from '../../entities/offer';

export const store = configureStore({reducer:{offer: offersReducer}});
