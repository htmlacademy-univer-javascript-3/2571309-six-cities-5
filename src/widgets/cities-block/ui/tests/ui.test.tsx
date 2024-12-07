import { render, screen } from '@testing-library/react';
import { withHistory } from '../../../../shared/providers';
import { withStore } from '../../../../shared/providers/with-store';
import CitiesBlock from '../ui';
import { makeFakeStore } from '../../../../shared/mocks';
import { Cities } from '../../../../shared/api';
import { PlaceType } from '../../../../shared/types';
import { SortingOptionsEnum } from '../../../../features/sorting-panel';

describe('Component: CitiesBlock', ()=>{
  it('should render empty component correctly', ()=>{
    const {withStoreComponent} = withStore(<CitiesBlock/>, makeFakeStore());
    const componentWithProviders = withHistory(withStoreComponent);
    render(componentWithProviders);

    expect(screen.getByText(`We could not find any property available at the moment in ${Cities.Paris}`)).toBeInTheDocument();
  });

  it('should render component correctly', ()=>{
    const fakeOfferState = {
      city: Cities.Amsterdam,
      offers: [{
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
    const {withStoreComponent} = withStore(<CitiesBlock/>, makeFakeStore({ offer:fakeOfferState}));
    const componentWithProviders = withHistory(withStoreComponent);
    render(componentWithProviders);

    expect(screen.getByText(`${fakeOfferState.offers.length} places to stay in ${fakeOfferState.city}`)).toBeInTheDocument();
  });
});
