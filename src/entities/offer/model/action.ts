import { createAction, createAsyncThunk } from '@reduxjs/toolkit';
import { SortingOptionsEnum } from '../../../features/sorting-panel';
import { AppDispatch, RootState } from '../../../shared/lib/types';
import { AxiosInstance } from 'axios';
import { OfferType } from '../../../shared/types';
import { API_ROUTE } from '../../../shared/config';

export const changeCity = createAction<string>('offer/changeCity');
export const fillOffers = createAction<OfferType[]>('offer/fillOffers');
export const changeSort = createAction<SortingOptionsEnum>('offer/changeSort');
export const setOffersDataLoadingStatus = createAction<boolean>('offer/setOffersDataLoadingStatus');
export const fetchOffers = createAsyncThunk<void, undefined,
{
    dispatch: AppDispatch;
    state: RootState;
    extra: AxiosInstance;
}>
(
  'offer/fetchOffers',
  async (_arg, {dispatch, extra: api}) => {
    dispatch(setOffersDataLoadingStatus(true));
    const {data} = await api.get<OfferType[]>(API_ROUTE.GET_OFFERS);
    dispatch(setOffersDataLoadingStatus(false));
    dispatch(fillOffers(data));
  },
);

