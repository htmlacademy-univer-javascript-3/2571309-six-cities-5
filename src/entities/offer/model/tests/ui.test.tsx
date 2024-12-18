import { render, screen } from '@testing-library/react';
import { CardOffer } from '../ui';
import { Cities } from '../../../../shared/api';
import { PlaceType } from '../../../../shared/types';
import { withHistory } from '../../../../shared/providers';
import { withStore } from '../../../../shared/providers/with-store';
import { AuthEnum } from '../../../user';
import userEvent from '@testing-library/user-event';
import { API_ROUTES } from '../config';
import { extractActionsTypes } from '../../../../shared/lib';
import { changeFavoriteStatus, fetchFavorites, fetchOffers, setFavorites, setOffers, setOffersDataLoadingStatus } from '../action';
import { redirectToRoute } from '../../../user/model/action';
describe('Component: CardOffer', ()=>{
  const fakeOffer = {
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
  };
  const fakeUser = {
    authorizationStatus: AuthEnum.AUTHENTICATED,
    user: {
      name: 'Oliver Conner',
      avatarUrl: 'https://url-to-image/image.png',
      isPro: false
    }
  };
  it('should render component correctly',()=>{
    const componentWithHistory = withHistory(<CardOffer block='cities' offer={fakeOffer} />);
    const {withStoreComponent} = withStore(componentWithHistory, {user:fakeUser});
    render(withStoreComponent);
    expect(screen.getByText(fakeOffer.title)).toBeInTheDocument();
    expect(screen.getByText(`€${fakeOffer.price}`)).toBeInTheDocument();
  });

  it('should changed offer favorite status by btn click',async ()=>{
    const componentWithHistory = withHistory(<CardOffer block='cities' offer={fakeOffer} />);
    const {withStoreComponent, mockStore, mockAxiosAdapter} = withStore(componentWithHistory, {user:fakeUser});
    render(withStoreComponent);
    const btnFavorite = screen.getByTestId('bth-favorite-offer');
    mockAxiosAdapter.onPost(`${API_ROUTES.GET_FAVORITES}/${fakeOffer.id}/1`).reply(201);
    mockAxiosAdapter.onGet(API_ROUTES.GET_FAVORITES).reply(200);
    mockAxiosAdapter.onGet(API_ROUTES.GET_OFFERS).reply(200);
    await userEvent.click(
      btnFavorite
    );

    const actions = extractActionsTypes(mockStore.getActions());
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
      changeFavoriteStatus.fulfilled.type,
    ]);
  });

  it('should redirect by btn click',async ()=>{
    const componentWithHistory = withHistory(<CardOffer block='cities' offer={fakeOffer} />);
    const {withStoreComponent, mockStore} = withStore(componentWithHistory, {user:{authorizationStatus:AuthEnum.NO_AUTHENTICATED,user:null}});
    render(withStoreComponent);
    const btnFavorite = screen.getByTestId('bth-favorite-offer');
    await userEvent.click(
      btnFavorite
    );

    const actions = extractActionsTypes(mockStore.getActions());
    expect(actions).toEqual([
      redirectToRoute.type
    ]);
  });
});
