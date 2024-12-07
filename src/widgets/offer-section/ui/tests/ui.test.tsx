import { render, screen } from '@testing-library/react';
import OfferSection from '../ui';
import { Cities } from '../../../../shared/api';
import { PlaceType } from '../../../../shared/types';
import { withStore } from '../../../../shared/providers/with-store';
import { AuthEnum } from '../../../../entities/user';
describe('Component: OfferSection', ()=>{
  const fakeUser = {
    authorizationStatus: AuthEnum.AUTHENTICATED,
    user: {
      name: 'Oliver Conner',
      avatarUrl: 'https://url-to-image/image.png',
      isPro: false
    }
  };
  it('should render component correctly witn no pro host', ()=>{
    const mockOffer = {
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
    const {withStoreComponent} = withStore(<OfferSection offer={mockOffer}><div>Children</div></OfferSection>, {user: fakeUser});
    render(withStoreComponent);

    expect(screen.getByText('Not Pro')).toBeInTheDocument();
    expect(screen.getByText('Children')).toBeInTheDocument();
    expect(screen.getByText(mockOffer.title)).toBeInTheDocument();
  });
  it('should render component correctly witn pro host', ()=>{
    const mockOffer = {
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
        'isPro': true
      }
    };
    const {withStoreComponent} = withStore(<OfferSection offer={mockOffer}><div>Children</div></OfferSection>, {user: fakeUser});
    render(withStoreComponent);

    expect(screen.getByText('Pro')).toBeInTheDocument();
    expect(screen.getByText('Children')).toBeInTheDocument();
    expect(screen.getByText(mockOffer.title)).toBeInTheDocument();
  });
});
