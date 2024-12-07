import { SortingOptionsEnum } from '../../../../features/sorting-panel';
import { $api, Cities } from '../../../../shared/api';
import MockAdapter from 'axios-mock-adapter';
import thunk from 'redux-thunk';
import { Action } from 'redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { PlaceType } from '../../../../shared/types';
import { changeCity, changeFavoriteStatus, changeSort, fetchFavorites, fetchNearOffersById, fetchOfferById, fetchOffers, setFavorites, setNearOffer, setOfferOnPage, setOffers, setOffersDataLoadingStatus } from '../action';
import { offersReducer } from '../offer';
import { RootState } from '../../../../shared/lib/types';
import { AppThunkDispatch, extractActionsTypes } from '../../../../shared/lib';
import { API_ROUTES as OFFER_API_ROUTES } from '../config';
import { redirectToRoute } from '../../../user/model/action';

describe('Offer slice', ()=>{
  it('should return initial state with empty action',()=>{
    const expectedRes = {
      city: Cities.Paris,
      offers: [],
      nearOffers: [],
      sort: SortingOptionsEnum.Popular,
      isLoading: false,
      offerOnPage: null,
      favorites: [],
    };
    const action = {type:''};
    const calculatedRes = offersReducer(expectedRes, action);
    expect(calculatedRes).toEqual(expectedRes);
  });

  it('should return default initial state with empty action and undefined state',()=>{
    const expectedRes = {
      city: Cities.Paris,
      offers: [],
      nearOffers: [],
      sort: SortingOptionsEnum.Popular,
      isLoading: false,
      offerOnPage: null,
      favorites: [],
    };
    const action = {type:''};
    const calculatedRes = offersReducer(undefined, action);
    expect(calculatedRes).toEqual(expectedRes);
  });

  it('should return state city Amsterdam',()=>{
    const expectedRes = {
      city: Cities.Amsterdam,
      offers: [],
      nearOffers: [],
      sort: SortingOptionsEnum.Popular,
      isLoading: false,
      offerOnPage: null,
      favorites: [],
    };
    const calculatedRes = offersReducer(undefined, changeCity(Cities.Amsterdam));
    expect(calculatedRes).toEqual(expectedRes);
  });

  it('should return state with filled offers',()=>{
    const expectedRes = {
      city: Cities.Paris,
      offers: [
        {
          'id': 'a20a52b2-efc2-4b0f-9396-4bdfbe5e9543',
          'title': 'Wood and stone place',
          'type': 'apartment' as PlaceType,
          'price': 576,
          'previewImage': 'https://14.design.htmlacademy.pro/static/hotel/14.jpg',
          'city': {
            'name': Cities.Amsterdam,
            'location': {
              'latitude': 48.85661,
              'longitude': 2.351499,
              'zoom': 13
            }
          },
          'location': {
            'latitude': 48.868610000000004,
            'longitude': 2.342499,
            'zoom': 16
          },
          'isFavorite': false,
          'isPremium': false,
          'rating': 2.1,
          'description': 'TEst',
          'bedrooms': 1,
          'goods': [],
          maxAdults: 1,
          images: [''],
          host:{ 'name': 'Oliver Conner',
            'avatarUrl': 'https://url-to-image/image.png',
            'isPro': false
          }
        },
      ],
      nearOffers: [],
      sort: SortingOptionsEnum.Popular,
      isLoading: false,
      offerOnPage: null,
      favorites: [],
    };
    const calculatedRes = offersReducer(undefined, setOffers(expectedRes.offers));
    expect(calculatedRes).toEqual(expectedRes);
  });
  it('should return state with filled offerOnPage',()=>{
    const expectedRes = {
      city: Cities.Paris,
      offers: [],
      nearOffers: [],
      sort: SortingOptionsEnum.Popular,
      isLoading: false,
      offerOnPage: {
        'id': 'a20a52b2-efc2-4b0f-9396-4bdfbe5e9543',
        'title': 'Wood and stone place',
        'type': 'apartment' as PlaceType,
        'price': 576,
        'previewImage': 'https://14.design.htmlacademy.pro/static/hotel/14.jpg',
        'city': {
          'name': Cities.Amsterdam,
          'location': {
            'latitude': 48.85661,
            'longitude': 2.351499,
            'zoom': 13
          }
        },
        'location': {
          'latitude': 48.868610000000004,
          'longitude': 2.342499,
          'zoom': 16
        },
        'isFavorite': false,
        'isPremium': false,
        'rating': 2.1,
        'description': 'TEst',
        'bedrooms': 1,
        'goods': [],
        maxAdults: 1,
        images: [''],
        host:{ 'name': 'Oliver Conner',
          'avatarUrl': 'https://url-to-image/image.png',
          'isPro': false
        }
      },
      favorites: [],
    };
    const calculatedRes = offersReducer(undefined, setOfferOnPage(expectedRes.offerOnPage));
    expect(calculatedRes).toEqual(expectedRes);
  });
  it('should return state with filled offerOnPage',()=>{
    const expectedRes = {
      city: Cities.Paris,
      offers: [],
      nearOffers: [{
        'id': 'a20a52b2-efc2-4b0f-9396-4bdfbe5e9543',
        'title': 'Wood and stone place',
        'type': 'apartment' as PlaceType,
        'price': 576,
        'previewImage': 'https://14.design.htmlacademy.pro/static/hotel/14.jpg',
        'city': {
          'name': Cities.Amsterdam,
          'location': {
            'latitude': 48.85661,
            'longitude': 2.351499,
            'zoom': 13
          }
        },
        'location': {
          'latitude': 48.868610000000004,
          'longitude': 2.342499,
          'zoom': 16
        },
        'isFavorite': false,
        'isPremium': false,
        'rating': 2.1,
        'description': 'TEst',
        'bedrooms': 1,
        'goods': [],
        maxAdults: 1,
        images: [''],
        host:{ 'name': 'Oliver Conner',
          'avatarUrl': 'https://url-to-image/image.png',
          'isPro': false
        }
      }],
      sort: SortingOptionsEnum.Popular,
      isLoading: false,
      offerOnPage: null,
      favorites: [],
    };
    const calculatedRes = offersReducer(undefined, setNearOffer(expectedRes.nearOffers));
    expect(calculatedRes).toEqual(expectedRes);
  });

  it('should return state with PriceHighToLow sort',()=>{
    const expectedRes = {
      city: Cities.Paris,
      offers: [],
      nearOffers: [],
      sort: SortingOptionsEnum.PriceHighToLow,
      isLoading: false,
      offerOnPage: null,
      favorites: [],
    };
    const calculatedRes = offersReducer(undefined, changeSort(SortingOptionsEnum.PriceHighToLow));
    expect(calculatedRes).toEqual(expectedRes);
  });

  it('should return state with isLoading field true',()=>{
    const expectedRes = {
      city: Cities.Paris,
      offers: [],
      nearOffers: [],
      sort: SortingOptionsEnum.Popular,
      isLoading: true,
      offerOnPage: null,
      favorites: [],
    };
    const calculatedRes = offersReducer(undefined, setOffersDataLoadingStatus(true));
    expect(calculatedRes).toEqual(expectedRes);
  });

  it('should return state with isLoading field true',()=>{
    const expectedRes = {
      city: Cities.Paris,
      offers: [],
      nearOffers: [],
      sort: SortingOptionsEnum.Popular,
      isLoading: true,
      offerOnPage: null,
      favorites: [],
    };
    const calculatedRes = offersReducer(undefined, setOffersDataLoadingStatus(true));
    expect(calculatedRes).toEqual(expectedRes);
  });

  it('should return state with filled favorites',()=>{
    const expectedRes = {
      city: Cities.Paris,
      offers: [],
      nearOffers: [],
      sort: SortingOptionsEnum.Popular,
      isLoading: false,
      offerOnPage: null,
      favorites: [{
        'id': 'a20a52b2-efc2-4b0f-9396-4bdfbe5e9543',
        'title': 'Wood and stone place',
        'type': 'apartment' as PlaceType,
        'price': 576,
        'previewImage': 'https://14.design.htmlacademy.pro/static/hotel/14.jpg',
        'city': {
          'name': Cities.Amsterdam,
          'location': {
            'latitude': 48.85661,
            'longitude': 2.351499,
            'zoom': 13
          }
        },
        'location': {
          'latitude': 48.868610000000004,
          'longitude': 2.342499,
          'zoom': 16
        },
        'isFavorite': false,
        'isPremium': false,
        'rating': 2.1,
        'description': 'TEst',
        'bedrooms': 1,
        'goods': [],
        maxAdults: 1,
        images: [''],
        host:{ 'name': 'Oliver Conner',
          'avatarUrl': 'https://url-to-image/image.png',
          'isPro': false
        }
      }],
    };
    const calculatedRes = offersReducer(undefined, setFavorites(expectedRes.favorites));
    expect(calculatedRes).toEqual(expectedRes);
  });
});

describe('Offer async actions', ()=>{
  const mockAxiosAdapter = new MockAdapter($api);
  const middleware = [thunk.withExtraArgument($api)];
  const mockStoreCreator = configureMockStore<RootState, Action<string>, AppThunkDispatch>(middleware);
  let store: ReturnType<typeof mockStoreCreator>;
  beforeEach(() => {
    store = mockStoreCreator({ offer: { offers: [], city: Cities.Paris, favorites: [], isLoading: false,
      nearOffers: [], offerOnPage: null, sort: SortingOptionsEnum.Popular }});
  });

  describe('fetchOffers', ()=>{
    it(`should dispatch "fetchOffers.pending", "setOffersDataLoadingStatus",
       "setOffers" and "fetchOffers.fulfilled" with thunk "fetchOffers"`, async ()=>{
      mockAxiosAdapter.onGet(OFFER_API_ROUTES.GET_OFFERS).reply(200);
      await store.dispatch(fetchOffers());
      const actions = extractActionsTypes(store.getActions());
      expect(actions).toEqual([
        fetchOffers.pending.type,
        setOffersDataLoadingStatus.type,
        setOffersDataLoadingStatus.type,
        setOffers.type,
        fetchOffers.fulfilled.type,
      ]);
    });
  });

  describe('fetchNearOffersById', ()=>{
    it(`should dispatch "fetchNearOffersById.pending", "setNearOffer" 
        and "fetchNearOffersById.fulfilled" with thunk "fetchNearOffersById"`, async ()=>{
      mockAxiosAdapter.onGet(`${OFFER_API_ROUTES.GET_OFFERS}/123321/nearby`).reply(200);
      await store.dispatch(fetchNearOffersById('123321'));
      const actions = extractActionsTypes(store.getActions());
      expect(actions).toEqual([
        fetchNearOffersById.pending.type,
        setNearOffer.type,
        fetchNearOffersById.fulfilled.type,
      ]);
    });
  });

  describe('fetchOfferById', ()=>{
    it(`should dispatch "fetchOfferById.pending", "setOfferOnPage", "setOffersDataLoadingStatus", 
        and "fetchOfferById.fulfilled" with thunk "fetchOfferById"`, async ()=>{
      mockAxiosAdapter.onGet(`${OFFER_API_ROUTES.GET_OFFERS}/a20a52b2-efc2-4b0f-9396-4bdfbe5e9543`).reply(200);
      await store.dispatch(fetchOfferById('a20a52b2-efc2-4b0f-9396-4bdfbe5e9543'));
      const actions = extractActionsTypes(store.getActions());
      expect(actions).toEqual([
        fetchOfferById.pending.type,
        setOffersDataLoadingStatus.type,
        setOfferOnPage.type,
        setOffersDataLoadingStatus.type,
        fetchOfferById.fulfilled.type,
      ]);
    });

    it(`should dispatch "fetchOfferById.pending", "redirectToRoute", "setOffersDataLoadingStatus", 
      and "fetchOfferById.fulfilled" with thunk "fetchOfferById"`, async ()=>{
      mockAxiosAdapter.onGet(`${OFFER_API_ROUTES.GET_OFFERS}/a20a52b2-efc2-4b0f-9396-4bdfbe5e9543`).reply(400);
      await store.dispatch(fetchOfferById('a20a52b2-efc2-4b0f-9396-4bdfbe5e9543'));
      const actions = extractActionsTypes(store.getActions());
      expect(actions).toEqual([
        fetchOfferById.pending.type,
        setOffersDataLoadingStatus.type,
        redirectToRoute.type,
        setOffersDataLoadingStatus.type,
        fetchOfferById.fulfilled.type,
      ]);
    });
  });

  describe('fetchFavorites', ()=>{
    it(`should dispatch "fetchFavorites.pending", "setFavorites"
        and "fetchFavorites.fulfilled" with thunk "fetchFavorites"`, async ()=>{
      mockAxiosAdapter.onGet(OFFER_API_ROUTES.GET_FAVORITES).reply(200);
      await store.dispatch(fetchFavorites());
      const actions = extractActionsTypes(store.getActions());
      expect(actions).toEqual([
        fetchFavorites.pending.type,
        setFavorites.type,
        fetchFavorites.fulfilled.type,
      ]);
    });
  });

  describe('changeFavoriteStatus', ()=>{
    it(`should dispatch "changeFavoriteStatus.pending", "fetchFavorites.pending", "setFavorites",
        "fetchFavorites.fulfilled", "fetchFavorites.fulfilled", "fetchOffers.pending", "setOffersDataLoadingStatus",
        "setOffers", "fetchOffers.fulfilled", "changeFavoriteStatus.fulfilled" 
        with thunk "changeFavoriteStatus"`, async ()=>{
      mockAxiosAdapter.onPost(`${OFFER_API_ROUTES.GET_FAVORITES}/123321/1`).reply(201);
      mockAxiosAdapter.onGet(`${OFFER_API_ROUTES.GET_OFFERS}/123321`).reply(200);
      const storeTest = mockStoreCreator({ offer: { offers: [], city: Cities.Paris, favorites: [], isLoading: false,
        nearOffers: [], offerOnPage: {
          'id': '123321',
          'title': 'Wood and stone place',
          'type': 'apartment' as PlaceType,
          'price': 576,
          'previewImage': 'https://14.design.htmlacademy.pro/static/hotel/14.jpg',
          'city': {
            'name': Cities.Amsterdam,
            'location': {
              'latitude': 48.85661,
              'longitude': 2.351499,
              'zoom': 13
            }
          },
          'location': {
            'latitude': 48.868610000000004,
            'longitude': 2.342499,
            'zoom': 16
          },
          'isFavorite': false,
          'isPremium': false,
          'rating': 2.1,
          'description': 'TEst',
          'bedrooms': 1,
          'goods': [],
          maxAdults: 1,
          images: [''],
          host:{ 'name': 'Oliver Conner',
            'avatarUrl': 'https://url-to-image/image.png',
            'isPro': false
          }
        }, sort: SortingOptionsEnum.Popular }});
      await storeTest.dispatch(changeFavoriteStatus({offerId:'123321',status: 1}));
      const actions = extractActionsTypes(storeTest.getActions());
      expect(actions).toEqual([
        changeFavoriteStatus.pending.type,
        fetchFavorites.pending.type,
        setFavorites.type,
        fetchFavorites.fulfilled.type,
        fetchOffers.pending.type,
        setOffersDataLoadingStatus.type,
        setOffersDataLoadingStatus.type,
        setOffers.type,
        fetchOffers.fulfilled.type,
        fetchOfferById.pending.type,
        setOffersDataLoadingStatus.type,
        setOfferOnPage.type,
        setOffersDataLoadingStatus.type,
        fetchOfferById.fulfilled.type,
        changeFavoriteStatus.fulfilled.type,
      ]);
    });
  });
}
);
