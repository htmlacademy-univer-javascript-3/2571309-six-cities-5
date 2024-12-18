import { render, screen } from '@testing-library/react';
import { OffersList } from '../ui';
import { PlaceType } from '../../../../shared/types';
import { Cities } from '../../../../shared/api';
import { withStore } from '../../../../shared/providers/with-store';
import { AuthEnum } from '../../../../entities/user';
import { withHistory } from '../../../../shared/providers';
import userEvent from '@testing-library/user-event';
const fakeFunctions = {
  fakeOnMouseEnter: vi.fn()
};
describe('Component: OffersList', ()=>{
  it('should render component correctly', () => {
    const offersMockData = [{
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
    },{
      'id': 'a20a5112b2-efc2-4b0f-9396-4bdfbe5e9543',
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
    }];
    const {withStoreComponent} = withStore(<OffersList block='cities' offersData={offersMockData}/>, {user: {authorizationStatus: AuthEnum.NO_AUTHENTICATED, user: null}});
    const componentWithProviders = withHistory(withStoreComponent);
    render(componentWithProviders);
    expect(screen.getAllByTestId('card-offer-item')).toHaveLength(offersMockData.length);
  });
  it('should call onActiveOfferChangeCallback one time', async ()=>{
    const offersMockData = [{
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
    }];
    const mockFun = vi.spyOn(fakeFunctions, 'fakeOnMouseEnter');
    const {withStoreComponent} = withStore(<OffersList onActiveOfferChangeCallback={fakeFunctions.fakeOnMouseEnter} block='cities' offersData={offersMockData}/>, {user: {authorizationStatus: AuthEnum.NO_AUTHENTICATED, user: null}});
    const componentWithProviders = withHistory(withStoreComponent);
    render(componentWithProviders);
    await userEvent.hover(
      screen.getByTestId('card-offer-item')
    );
    expect(mockFun).toBeCalledTimes(1);
  });
});
