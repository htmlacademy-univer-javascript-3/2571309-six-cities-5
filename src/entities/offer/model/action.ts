import { createAction, createAsyncThunk } from '@reduxjs/toolkit';
import { SortingOptionsEnum } from '../../../features/sorting-panel';
import { AppDispatch, RootState } from '../../../shared/lib/types';
import { AxiosInstance } from 'axios';
import { OfferType } from '../../../shared/types';
import { API_ROUTES } from './config';
import { redirectToRoute } from '../../user/model/action';
import { routesEnum } from '../../../shared/config';
import { fetchReviews } from '../../review/model/action';
import { Cities } from '../../../shared/api';
import { ChangeFavoriteStatus } from './types';

export const changeCity = createAction<Cities>('offer/changeCity');
export const fillOffers = createAction<OfferType[]>('offer/fillOffers');
export const setOfferOnPage = createAction<OfferType|null>('offer/setOfferOnPage');
export const setNearOffer = createAction<OfferType[]>('offer/setNearOffer');
export const changeSort = createAction<SortingOptionsEnum>('offer/changeSort');
export const setOffersDataLoadingStatus = createAction<boolean>('offer/setOffersDataLoadingStatus');
export const setFavorites = createAction<OfferType[]>('favorite/setFavorites');


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
    const {data} = await api.get<OfferType[]>(API_ROUTES.GET_OFFERS);
    dispatch(setOffersDataLoadingStatus(false));
    dispatch(fillOffers(data));
  },
);

export const fetchNearOffersById = createAsyncThunk<void, string,
{
    dispatch: AppDispatch;
    state: RootState;
    extra: AxiosInstance;
}>
(
  'offer/fetchNearOffersById',
  async (offerId, {dispatch, extra: api}) => {
    const {data} = await api.get<OfferType[]>(`${API_ROUTES.GET_OFFERS}/${offerId}/nearby`);
    dispatch(setNearOffer(data?.slice(0,3)));
  },
);

export const fetchOfferById = createAsyncThunk<void, string,
{
    dispatch: AppDispatch;
    state: RootState;
    extra: AxiosInstance;
}>
(
  'offer/fetchOfferById',
  async (offerId, {dispatch, extra: api}) => {
    try {
      dispatch(setOffersDataLoadingStatus(true));
      const {data} = await api.get<OfferType>(`${API_ROUTES.GET_OFFERS}/${offerId}`);
      dispatch(setOfferOnPage(data));
      dispatch(fetchNearOffersById(offerId));
      dispatch(fetchReviews(offerId));
    } catch(e) {
      dispatch(redirectToRoute(routesEnum.NOT_FOUND));
    } finally {
      dispatch(setOffersDataLoadingStatus(false));
    }
  },
);

export const fetchFavorites = createAsyncThunk<void, undefined,
{
    dispatch: AppDispatch;
    state: RootState;
    extra: AxiosInstance;
}>
(
  '/fetchFavorites',
  async (_arg, {dispatch, extra: api}) => {
    const {data} = await api.get<OfferType[]>(API_ROUTES.GET_FAVORITES);
    dispatch(setFavorites(data));
  },
);

export const changeFavoriteStatus = createAsyncThunk<
    void, ChangeFavoriteStatus, {
    dispatch: AppDispatch;
    state: RootState;
    extra: AxiosInstance;
  }
  >(
    'favorite/changeFavoriteStatus',
    async ({status,offerId}, {dispatch, extra: api}) => {
      await api.post(`${API_ROUTES.GET_FAVORITES}/${offerId}/${status}`);
      dispatch(fetchFavorites());
      dispatch(fetchOffers());
    },
  );

